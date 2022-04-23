import React from "react";
import { firestore } from "../firebase";

const FormVaccine = (props) => {
  const [registers, setRegisters] = React.useState([]);
  const [id, setId] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [status, setStatus] = React.useState(true);
  const [vaccine, setVaccine] = React.useState("Sputnik");
  const [vaccineDate, setVaccineDate] = React.useState("09-09-2022");
  const [doses, setDoses] = React.useState(3);

  React.useEffect(() => {
    const loggedIn = firestore.collection("users").doc(props.user.uid);
    loggedIn
      .get()
      .then((doc) => {
        if (doc.exists) {
          const arrayData = doc.data();
          console.log(arrayData);
          setRegisters(Object.values(arrayData));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    // const data = await firestore.collection(props.user.uid).get();
    // const arrayData = data.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    // console.log(arrayData);
    // setRegisters(arrayData);
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
      await firestore.collection(props.user.uid).doc(id).update({
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
      const arr = registers.map((item) =>
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
      setRegisters(arr);
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
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {registers.map((d) => [
                <tr key={d.id}>
                  <td>{d.birthDate}</td>
                  <td>{d.phone}</td>
                  
                  <td>{d.address}</td>
                  <td>{d.status}</td>
                  <td>{d.vaccine}</td>
                  <td>{d.vaccineDate}</td>
                  <td>{d.doses}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm float-right mr-2"
                      onClick={() => activateEdition(d)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>,
              ])}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h3>Formulario de Actualizacion</h3>
          <form onSubmit={editInfo}>
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

export default FormVaccine;
