import React, { useState } from 'react';
import './Login.module.css';
import Auth from '../../api/Auth';
const LoginPage = props => {

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
            await Auth.authenticate(credentials)
            setError("");

        }catch(error){
            setError("Tets");
        }
    }

    return (  
        <div className="login-form">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" onChange={handleChange}
                    value={credentials.username} id="username" name="username"/>
                    {error && <small id="emailHelp" className="form-text text-muted">
                        {error}</small>
                }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={handleChange}
                    value={credentials.password} name="password" id="password"/>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
 
export default LoginPage;