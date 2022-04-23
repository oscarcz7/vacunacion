import React from "react";
import { auth, firestore } from "../firebase";
import { withRouter } from "react-router-dom";
import FormVaccine from "./FormVaccine"
import Admin from "./Admin"

const Dashboard = (props) => {
  const [user, setUser] = React.useState(null);
  const [userRole, setUserRole] = React.useState(true);
  React.useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
      const loggedIn = firestore.collection("users").doc(auth.currentUser.uid);
      loggedIn
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (doc.data().role === "Emp") {
              console.log("Empleado");
              setUserRole(false);
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      console.log("Non user logged");
      props.history.push("/login");
    }
  }, []);

  return userRole ? (
    <div className="container">
        <h3 className="text-center">Bienvenido Administrador</h3>
        <Admin/>
    </div>
  ) : (
    <div className="container">
      <h3 className="text-center">Bienvenido Empleado</h3>

      {user && <FormVaccine user={user} />}
    </div>
  );
};

export default withRouter(Dashboard);
