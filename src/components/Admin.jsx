import React from "react";
import { firestore, auth } from "../firebase";

const Admin = () => {
  const [employees, setEmployees] = React.useState([]);
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [CI, setCI] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("Password2022");
  const [birthDate, setBirthDate] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [status, setStatus] = React.useState(false)
  const [vaccine, setVaccine] = React.useState("")
  const [vaccineDate, setVaccineDate] = React.useState("")
  const [doses, setDoses] = React.useState(0)
  const [role, setRole] = React.useState("Emp");

  const [updateMode, setUpdateMode] = React.useState(false);

  React.useEffect(() => {
    const retrieveData = async () => {
      try {
        const data = await firestore.collection("empleados").get();
        const arrData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEmployees(arrData);
      } catch (e) {
        console.log(e);
      }
    };
    retrieveData();
  }, []);

  const addEmp = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (!name.trim) {
        console.log("Data no availible");
      }
      try {
        registerEmp();
      } catch (error) {
        console.log(error);
      }
      console.log(name);
    },
    [email, password]
  );
  const registerEmp = React.useCallback(async () => {
    try {
      const resp = await auth.createUserWithEmailAndPassword(email, password);
      const newEmp = {
        id: resp.user.uid,
        name: name,
        lastName: lastName,
        CI: CI,
        email: resp.user.email,
        password: password,
        role: role,
        birthDate: birthDate,
        address: address,
        phone: phone,
        status: status,
        vaccine: vaccine,
        vaccineDate: vaccineDate,
        doses: doses,
      };
      await firestore.collection("empleados").doc(resp.user.uid).set(newEmp);
      await firestore.collection(resp.user.uid).doc(resp.user.uid).set(newEmp);

      // updating data in time with new documents added to db
      setEmployees([...employees, { ...newEmp, id: resp.user.uid }]);

      // clearing data
      setName("");
      setLastName("");
      setCI("");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const deleteEmp = async (id) => {
    try {
      await firestore.collection("empleados").doc(id).delete();
      const arr = employees.filter((item) => item.id !== id);
      setEmployees(arr);
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmp = (employee) => {
    setUpdateMode(true);
    setId(employee.id);
    setName(employee.name);
    setLastName(employee.lastName);
    setCI(employee.CI);
    setEmail(employee.email);
  };

  const editEmp = async (e) => {
    e.preventDefault();
    if (!name.trim || !lastName.trim || !email.trim || !CI.trim) {
      console.log("No data!");
      return;
    }
    try {
      await firestore.collection("empleados").doc(id).update({
        name: name,
        lastName: lastName,
        CI: CI,
        email: email,
      });
      const arr = employees.map((e) =>
        e.id === id
          ? {
              id: e.id,
              name: name,
              lastName: lastName,
              email: email,
              CI: CI,
            }
          : e
      );
      setEmployees(arr);
      setUpdateMode(false);
      // clearing data
      setName("");
      setLastName("");
      setCI("");
      setEmail("");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h4>
            {!updateMode ? "Registro de Usuarios" : "Actualizar Información"}
          </h4>
          <form onSubmit={!updateMode ? addEmp : editEmp}>
            <div className="mb-3">
              <label className="form-label">Nombres Completos</label>
              <input
                type="text"
                className="form-control"
                id="names"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellidos Completos</label>
              <input
                type="text"
                className="form-control"
                id="lastNames"
                required
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"># CI</label>
              <input
                type="number"
                className="form-control"
                id="ci"
                required
                onChange={(e) => setCI(e.target.value)}
                value={CI}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <button
              type="submit"
              className={!updateMode ? "btn btn-dark" : "btn btn-warning"}
            >
              {!updateMode ? "Registrar" : "Actualizar"}
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <h3 className="text-center">Listado de Empleados</h3>
          <table className="table shadow rounded mt-3">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Mail</th>
                <th scope="col">CI</th>
                <th scope="col">Eliminar</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => [
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.CI}</td>
                  <td>
                    <button
                      className="btn btn-danger shadow"
                      onClick={() => deleteEmp(employee.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => updateEmp(employee)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>,
              ])}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
