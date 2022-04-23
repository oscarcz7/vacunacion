import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login.jsx";
import Admin from "./components/Admin.jsx";
import Dashboard from "./components/Dashboard.jsx";

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
      <div >
        <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
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
