import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import Register from "./Register";
const Admin = (props) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (auth.currentUser) {
      console.log("logged in");
      setUser(auth.currentUser);
    } else {
      console.log("Non user");
      props.history.push("/login");
    }
  }, []);

  return (
    <div className="container">
      <Register />
    </div>
  );
};

export default withRouter(Admin);
