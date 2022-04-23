import React from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";

const Navbar = (props) => {
  const logOut = () => {
    auth.signOut().then(() => {
      props.history.push("/login");
    });
  };

  return (
    <nav className="navbar navbar-dark bg-dark container-fluid ">
      <Link className="navbar-brand" to="/">
        Vacunacion
      </Link>
      <div>
        <div className="d-flex ">
          {props.firebaseUser !== null ? (
            <NavLink className="btn btn-dark mr-2" to="/dashboard">
              Inicio
            </NavLink>
          ) : null}
          {props.firebaseUser !== null ? (
            <button className="btn btn-dark" onClick={() => logOut()}>
              Cerrar Sesión
            </button>
          ) : (
            <NavLink className="btn btn-dark" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
