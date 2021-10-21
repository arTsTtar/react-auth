import React, {SyntheticEvent,  useState} from 'react';
import {Redirect} from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify( {
                name: name,
                email: email,
                password: password
            })
        })
        setRedirect(true);
    }

    if (redirect)
        return <Redirect to="/login"/>

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="Steven"
                       onChange={e => setName(e.target.value)}
                />
                <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control" placeholder="name@example.com"
                       onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password"
                       onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default Register;