import React, { useState } from 'react';
import './Login.module.css';
import Auth from '../../api/Auth';
const LoginPage = ({onLogin}) => {

    const [credentials,setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error,setError] = useState("");

    const handleChange = ({currentTarget}) => {
        const {name,value} = currentTarget
        setCredentials({...credentials,[name]: value})
    }

    const handleSubmit = async event =>{
        event.preventDefault();
        try{
            await Auth.authenticate(credentials);
            setError("");
            onLogin(true);
        }catch(error){
            setError("invalid authentication !");
        }
    }

    return (  
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className={"form-control" + (error && " is-invalid")} onChange={handleChange}
                    value={credentials.username} id="username" name="username"/>
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={handleChange}
                    value={credentials.password} name="password" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
 
export default LoginPage;