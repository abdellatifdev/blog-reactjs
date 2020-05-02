import React, { useState, useContext } from 'react';
import './Login.module.css';
import Auth from '../../api/Auth';
import AuthContext from '../../contexts/AuthContext';
import Field from '../../components/form/Field';
const LoginPage = ({history}) => {

    const {setIsAuthenticated} = useContext(AuthContext);
    
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
            setIsAuthenticated(true);
            history.replace('/posts');
        }catch(error){
            setError("invalid authentication !");
        }
    }

    return (  
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <Field label="Username" value={credentials.username} name="username" 
                       onChange={handleChange} error={error}/>

                <Field type="password" label="Password" value={credentials.password} name="password" 
                       onChange={handleChange}/>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
 
export default LoginPage;