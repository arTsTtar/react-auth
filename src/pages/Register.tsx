import React, {SyntheticEvent,  useState} from 'react';
import {Redirect} from "react-router-dom";
import {Button, Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const Register = () => {
    const {t} = useTranslation("register");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        setLoading(true);
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
        setLoading(false);
        setRedirect(true);
    }

    if (redirect)
        return <Redirect to="/login"/>

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal text-center">{t("heading")}</h1>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder={t("name")} required={true}
                       onChange={e => setName(e.target.value)}
                />
                <label htmlFor="floatingInput">{t("name")}</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control" placeholder={t("email.example")} required={true}
                       onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">{t("email")}</label>
            </div>
            <div className="form-floating">
                <input type="password" minLength={8} className="form-control" placeholder={t("password.example")} required={true}
                       onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">{t("password")}</label>
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
                {t("register.submit")}
            </Button>
        </form>
    );
};

export default Register;