import React, { useState } from 'react';
import Field from '../../components/form/Field';
import UserApi from '../../api/Auth';
const Register = ({history}) => {
    const [user,setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        username:"",
        password:"",
        birthday:""
    });
    const [error,setError] = useState({
        firstName:"",
        lastName:"",
        email:"",
        username:"",
        password:"",
        birthday:""
    });

    const handleChange = ({currentTarget}) => {
        const {name,value} = currentTarget;
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await UserApi.newUser(user);
            history.replace('/login');
        } catch ({ response }) {
            const { violations } = response.data;
            if (violations) {
              const apiErrors = {};
              violations.map(({ propertyPath, message }) => {
                apiErrors[propertyPath] = message;
              });
              setError(apiErrors);
        }
    }
}

    return ( 
        <div className="login-form">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <Field label="First name" error={error.firstName} name="firstName" 
                       onChange={handleChange} value={user.firstName}/>

                <Field label="Last name" value={user.lastName} error={error.lastName}
                    name="lastName" 
                       onChange={handleChange}/>

                <Field label="Email" type="email" error={error.email} value={user.email} name="email" 
                       onChange={handleChange}/>   

                <Field label="Username" error={error.username} value={user.username} name="username" 
                       onChange={handleChange}/>          

                <Field label="Password" type="password" error={error.password} value={user.password} name="password" 
                       onChange={handleChange}/> 
                
                <Field label="Birthday" type="date"  value={user.birthday} name="birthday" 
                       onChange={handleChange}/> 

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
     );
}
 
export default Register;