import React from "react";
import { db } from "../firebase";

const Firestore = (props) => {
  const [data, setData] = React.useState([]);
  const [info, setInfo] = React.useState("");
  const [id, setId] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [status, setStatus] = React.useState(true);
  const [vaccine, setVaccine] = React.useState("Sputnik");
  const [vaccineDate, setVaccineDate] = React.useState("09-09-2022");
  const [doses, setDoses] = React.useState(3);
  const [modoEdicion, setModoEdicion] = React.useState(false);

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await db.collection(props.user.uid).get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(arrayData);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatos();
  }, []);

  const activarEdicion = (item) => {
    setModoEdicion(true);
    setTarea(item.name);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();
    if (!info.trim()) {
      console.log("vacio");
      return;
    }
    try {
      await db.collection(props.user.uid).doc(id).update({
        birthDate: birthDate,
        address: address,
        phone: phone,
        status: status,
        vaccine: vaccine,
        vaccineDate: vaccineDate,
        doses: doses,
      });
      const arrayEditado = data.map((item) =>
        item.id === id
          ? {
              id: item.id,
              birthDate: birthDate,
              address: address,
              phone: phone,
              status: status,
              vaccine: vaccine,
              vaccineDate: vaccineDate,
              doses: doses,
            }
          : item
      );
      setData(arrayEditado);
      setModoEdicion(false);
      setInfo("");
      setId("");
      setBirthDate("");
      setAddress("");
      setPhone("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <h3 className="text-center">Información</h3>
          <table className="table shadow rounded mt-3">
            <thead>
              <tr>
                <th scope="col">Fecha Nacimiento</th>
                <th scope="col">Celular</th>
                <th scope="col">Direccion</th>
                <th scope="col">Estado</th>
                <th scope="col">Tipo</th>
                <th scope="col">Fecha Vacunacion</th>
                <th scope="col"># Dosis</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => [
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.CI}</td>
                </tr>,
              ])}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h3>Formulario de Actualizacion</h3>
          <form onSubmit="editar">
            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              className="form-control mb-2"
              onChange={(e) => setBirthDate(e.target.value)}
              value={birthDate}
            />
            <input
              type="text"
              placeholder="Direccion"
              className="form-control mb-2"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <input
              type="phone"
              placeholder="Telefono"
              className="form-control mb-2"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <button className="btn btn-warning btn-block" type="submit">
              Editar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Firestore;
