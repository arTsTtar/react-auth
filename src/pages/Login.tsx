import React, {SyntheticEvent, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Button, Spinner, Toast} from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const Login = (props: {setName: (name: string) => void}) => {
    const {t} = useTranslation("login");
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
            <h1 className="h3 mb-3 fw-normal text-center">{t("heading")}</h1>
            <div className="form-floating">
                <input type="email" className="form-control" placeholder="name@example.com" required={true}
                       onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">{t("email")}</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="slaptazodis123" required={true}
                       onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">{t("password")}</label>
            </div>
            <Button className="w-100 btn btn-lg btn-primary mb-1" type="submit">
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
                {t("login.submit")}
            </Button>
            <Link to="/alt-login" className="mb-3">{t("forgot.password")}</Link>
            <Toast bg='danger' onClose={() => setError('')} show={error !== ''} delay={3000} autohide >
                <Toast.Body className="text-center">
                    {t("login.error")}
                </Toast.Body>
            </Toast>
        </form>
    );
};

export default Login;