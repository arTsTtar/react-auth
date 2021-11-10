import React, {SyntheticEvent, useState} from 'react';
import {Button, Form, Spinner, Toast} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Redirect} from "react-router-dom";

const ResetPassword = () => {
    const {t} = useTranslation("reset");
    const [password, setPassword] = useState('');
    const [passwordRepeated, setPasswordRepeated] = useState('');
    const [disable2Fa, setDisable2Fa] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        if (passwordRepeated !== password) {
            setError("passwords.do.not.match");
            setLoading(false);
            return;
        }
        const response = await fetch('http://localhost:8000/api/user/changePassword', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify( {
                password: password,
                disable2fa: disable2Fa
            })
        })
        const content = await response.json();
        if (response.status >= 400) {
            setRedirect(false);
            setError(content.message);
        } else {
            setRedirect(true);
            setError('');
        }
        setLoading(false);
    }

    if (redirect)
        return <Redirect to="/login"/>

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal text-center">{t("heading")}</h1>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="slaptazodis123" required={true}
                       onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">{t("password")}</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="slaptazodis123" required={true}
                       onChange={e => setPasswordRepeated(e.target.value)}
                />
                <label htmlFor="floatingPassword">{t("repeat.password")}</label>
            </div>
            <div className="form-floating mb-2">
                <Form.Check type="checkbox" label={t("disable.2fa")}
                            onChange={ e => setDisable2Fa(e.target.checked)}/>
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
                {t("reset.data")}
            </Button>
            <Toast bg='danger' onClose={() => setError('')} show={error !== ''} delay={3000} autohide >
                <Toast.Body className="text-center">
                    {t(error)}
                </Toast.Body>
            </Toast>
        </form>
    );
};

export default ResetPassword;