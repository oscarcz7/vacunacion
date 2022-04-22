import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const dataProcess = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Datos vacíos email!");
      return;
    }
    if (!password.trim()) {
      setError("Datos vacíos password!");
      return;
    }
    if (password.length < 6) {
      setError("6 o más carácteres en password");
      return;
    }
    console.log("correcto...");
    setError(null);
    login();
  };

  const login = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setError(null);
      props.history.push("/employee");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Usuario o contraseña incorrecta");
      }
      if (error.code === "auth/wrong-password") {
        setError("Usuario o contraseña incorrecta");
      }
    }
  }, [email, password, props.history]);

  return (
    <div className="mt-5">
      <h3 className="text-center">Ingreso de Usuarios</h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={dataProcess}>
            <div className="mb-3">
              <label className="form-label">Correo Electronico</label>
              <input
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg ">
                Submit
              </button>
            </div>
            {error ? <div className="alert alert-danger">{error}</div> : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
