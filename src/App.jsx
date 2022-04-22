import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login.jsx";
import Admin from "./components/Admin.jsx";
import Employee from "./components/Employee.jsx";

import { auth } from "./firebase";

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false);
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/employee">
            <Employee />
          </Route>
          <Route path="/admin" exact>
            <Admin/>
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <div>Cargando...</div>
  );
}

export default App;
