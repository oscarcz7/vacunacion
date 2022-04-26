import React from "react";
import { firestore } from "../firebase";

const FormVaccine = (props) => {
  const [registers, setRegisters] = React.useState({});
  const [id, setId] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [status, setStatus] = React.useState(null);
  const [vaccine, setVaccine] = React.useState("");
  const [vaccineDate, setVaccineDate] = React.useState("");
  const [doses, setDoses] = React.useState("0");
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const loggedIn = firestore.collection("users").doc(props.user.uid);
    loggedIn
      .get()
      .then((doc) => {
        if (doc.exists) {
          const arrayData = doc.data();
          setRegisters(arrayData);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const activateEdition = (info) => {
    setId(info.id);
    setBirthDate(info.birthDate);
    setAddress(info.address);
    setPhone(info.phone);
    setStatus(info.status);
    setVaccine(info.vaccine);
    setVaccineDate(info.vaccineDate);
    setDoses(info.doses);
  };

  const editInfo = async (e) => {
    e.preventDefault();
    if (!birthDate.trim()) {
      console.log("vacio");
      return;
    }
    try {
      await firestore.collection(props.user.email).doc(id).update({
        birthDate: birthDate,
        address: address,
        phone: phone,
        status: status,
        vaccine: vaccine,
        vaccineDate: vaccineDate,
        doses: doses,
      });
      await firestore.collection("users").doc(props.user.uid).update({
        birthDate: birthDate,
        address: address,
        phone: phone,
        status: status,
        vaccine: vaccine,
        vaccineDate: vaccineDate,
        doses: doses,
      });

      setRegisters();
      setId("");
      setBirthDate("");
      setAddress("");
      setPhone("");
      setStatus("");
      setVaccine("");
      setVaccineDate();
      setDoses("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center">Información</h3>
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Nombre:{registers["name"]}</li>
              <li className="list-group-item">
                Apellido: {registers["lastName"]}
              </li>
              <li className="list-group-item">CI: {registers["CI"]}</li>
              <li className="list-group-item">Celular: {registers["phone"]}</li>
              <li className="list-group-item">
                Fecha de Nacimiento: {registers["birthDate"]}
              </li>
              <li className="list-group-item">
                Direccion: {registers["address"]}
              </li>
              <li className="list-group-item">
                Estado Vacunacion: {registers["status"]}
              </li>
              <li className="list-group-item">
                Vacuna: {registers["vaccine"]}
              </li>
              <li className="list-group-item">
                Fecha Vacunacion: {registers["vaccineDate"]}
              </li>
              <li className="list-group-item">Dosis: {registers["dosses"]}</li>
            </ul>
            <div className="p-3">
              <button
                className="btn btn-warning"
                onClick={() => activateEdition(registers)}
              >
                Editar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 card shadow p-3">
          <h3 className="text-center">Formulario de Actualizacion</h3>
          <form onSubmit={editInfo}>
            <label className="form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              className="form-control mb-2"
              onChange={(e) => setBirthDate(e.target.value)}
              value={birthDate}
            />
            <label className="form-label">Direccion</label>
            <input
              type="text"
              className="form-control mb-2"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <label className="form-label">Celular</label>
            <input
              type="phone"
              placeholder="Telefono"
              className="form-control mb-2"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            {/* Vaccine register update */}
            <label>Si se ha vacunado indiquelo? </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="true"
                checked={status === true}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setShow(true);
                }}
                id="true"
              />
              <label className="form-check-label">Si</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="false"
                checked={status === false}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setShow(false);
                }}
                id="false"
              />
              <label className="form-check-label">No</label>
            </div>

            {/* form  */}
            {show === true ? (
              <div className="my-3">
                <h5 className="text-center">Datos Vacunacion</h5>
                <label
                  className="form-label"
                  onChange={(e) => setVaccine(e.target.value)}
                >
                  Selecciona la vacuna:
                </label>
                <select
                  className="form-select mb-2"
                  value={vaccine}
                  onChange={(e) => setVaccine(e.target.value)}
                >
                  <option value="Sputnik">Sputnik</option>
                  <option value="AstraZeneca"> AstraZeneca</option>
                  <option value="Pfizer">Pfizer</option>
                  <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
                </select>

                <label className="form-label">Fecha Vacunacion</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  onChange={(e) => setVaccineDate(e.target.value)}
                  value={vaccineDate}
                />
                <label className="form-label"># Dosis</label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  className="form-control mb-2"
                  onChange={(e) => setDoses(e.target.value)}
                  value={doses}
                />
              </div>
            ) : (
              "Gracias por la informacion"
            )}

            <div className="d-grid gap-2 col-6 mx-auto my-3">
              <button className="btn btn-primary btn-block" type="submit">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormVaccine;
