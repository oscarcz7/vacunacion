import React from "react";
import {auth} from "../firebase";
import { withRouter } from "react-router-dom";
const Employee = (props) => {
    const [user, setUser] = React.useState(null)
    React.useEffect(() => {
        if(auth.currentUser){
            console.log('logged in')
            setUser(auth.currentUser)
        }else{
            console.log('Non user')
            props.history.push('/login')
        }
    }, [])


    return <div className="container">Here</div>
}

export default withRouter(Employee)