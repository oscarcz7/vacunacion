import React from "react";
import { firebase } from "./firebase";
function App() {
  const [employees, setEmployees] = React.useState([]);
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [CI, setCI] = React.useState("");
  const [mail, setMail] = React.useState("");

  const [updateMode, setUpdateMode] = React.useState(false);

  React.useEffect(() => {
    const retrieveData = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("empleados").get();
        const arrData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEmployees(arrData);
      } catch (e) {
        console.log(e);
      }
    };

    retrieveData();
  }, []);

  const addEmp = async (e) => {
    e.preventDefault();
    if (!name.trim) {
      console.log("Data no availible");
    }
    try {
      const db = firebase.firestore();
      const newEmp = {
        name: name,
        lastName: lastName,
        CI: CI,
        mail: mail,
      };
      const data = await db.collection("empleados").add(newEmp);

      // updating data in time with new documents added to db
      setEmployees([...employees, { ...newEmp, id: data.id }]);

      // clearing data
      setName("");
      setLastName("");
      setCI("");
      setMail("");
    } catch (error) {
      console.log(error);
    }
    console.log(name);
  };

  const deleteEmp = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("empleados").doc(id).delete();
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
    setMail(employee.mail);
  };

  const editEmp = async (e) => {
    e.preventDefault();
    if (!name.trim || !lastName.trim || !mail.trim || !CI.trim) {
      console.log("No data!");
      return;
    }
    try {
      const db = firebase.firestore();
      await db.collection("empleados").doc(id).update({
        name: name,
        lastName: lastName,
        CI: CI,
        mail: mail,
      });
      const arr = employees.map((e) =>
        e.id === id
          ? {
              id: e.id,
              name: name,
              lastName: lastName,
              mail: mail,
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
      setMail("");
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
            <div class="mb-3">
              <label for="names" class="form-label">
                Nombres Completos
              </label>
              <input
                type="text"
                class="form-control"
                id="names"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div class="mb-3">
              <label for="lastNames" class="form-label">
                Apellidos Completos
              </label>
              <input
                type="text"
                class="form-control"
                id="lastNames"
                required
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div class="mb-3">
              <label for="ci" class="form-label">
                # CI
              </label>
              <input
                type="number"
                class="form-control"
                id="ci"
                required
                onChange={(e) => setCI(e.target.value)}
                value={CI}
              />
            </div>
            <div class="mb-3">
              <label for="mail" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="mail"
                required
                onChange={(e) => setMail(e.target.value)}
                value={mail}
              />
            </div>

            <button
              type="submit"
              class={!updateMode ? "btn btn-dark" : "btn btn-warning"}
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
                  <td>{employee.mail}</td>
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
}

export default App;
