import React, {SyntheticEvent, useState} from 'react';
import {Button, Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const Register = () => {
    const {t} = useTranslation("register");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [qrCode, setQrcode] = useState('');
    const [secret, setSecret] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        setLoading(true);
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        let content = await response.json();
        setQrcode(content.qrCode);
        setSecret(content.secret);
        setLoading(false);
    }

    return (
        <form onSubmit={submit}>
            {qrCode
                ?
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal text-center">{t("successful.registration")}</h1>
                    <p className="mb-3 fw-normal text-center">{t("totp.information")}</p>
                    <img src={`data:image/png;base64 , ${qrCode}`} alt="qr code"/>
                    <label className="mb-3 font-bold">{t("recovery.code")} : {secret}</label>
                    <Link to="/login" className="w-100 btn btn-lg btn-primary mb-3">{t("login")}</Link>
                </div>
                :
                <>
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
                        <input type="password" minLength={8} className="form-control" placeholder={t("password.example")}
                               required={true}
                               onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">{t("password")}</label>
                    </div>
                    <Button className="w-100 btn btn-lg btn-primary mb-3" type="submit">
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
                </>
            }
        </form>
    );
};

export default Register;