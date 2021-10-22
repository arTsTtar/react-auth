import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from "react-router-dom";
import {Button, Spinner, Toast} from "react-bootstrap";

const Login = (props: {setName: (name: string) => void}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify( {
                email: email,
                password: password
            })
        })
        const content = await response.json();
        if (response.status >= 400) {
            setRedirect(false);
            setError(content.message);
        } else {
            setRedirect(true);
            setError('');
            props.setName(content.name);
        }
        setLoading(false);
    }

    if (redirect)
        return <Redirect to="/"/>

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal h1-text-center">Prisijungimas</h1>
            <div className="form-floating">
                <input type="email" className="form-control" placeholder="name@example.com"
                       onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">El. paštas</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="slaptazodis123"
                       onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Slaptažodis</label>
            </div>
            <Button className="w-100 btn btn-lg btn-primary" type="submit">
                {loading ?
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    :
                    ''
                }
                Prisijungti
            </Button>
            <Toast bg='danger' onClose={() => setError('')} show={error !== ''} delay={3000} autohide >
                <Toast.Body className="">
                    Klaidingi prisijungimo duomenys
                </Toast.Body>
            </Toast>
        </form>
    );
};

export default Login;