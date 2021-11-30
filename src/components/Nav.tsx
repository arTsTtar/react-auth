import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {Button, Dropdown, DropdownButton, Modal} from 'react-bootstrap';

const Nav = (props: {name: string,  id: string, setName: (name: string) => void}) => {
    const {t, i18n} = useTranslation(['nav','home']);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const reload=() => window.location.reload();
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userNewPassword, setUserNewPassword] = useState('');

    const resetCredentials = async (id: any) => {
        const response = await fetch('http://localhost:8000/api/user/' + id + '/resetPassword', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        const userData = await response.json();
        if (response.status >= 400) {
            setShow(true);
        }
        else {
            setUserEmail(userData.email);
            setUserName(userData.name);
            setUserNewPassword(userData.generatedPassword);
            setShow(true);
        }
    }

    const logout = async () => {
         await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        props.setName('');
    }

    const changeLang = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    let menu;

    if(props.name === '') {
        menu = (
            <>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" aria-current="page">{t("login", {ns: 'nav'})}</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link" aria-current="page">{t("register", {ns: 'nav'})}</Link>
                </li>
            </>
        )
    } else {
        menu = (
            <>
                <li className="nav-item">
                    <Button variant="warning" className=" btn btn-lg btn-primary mb-1" type="submit" onClick={() => resetCredentials(props.id)}>{t("user.credentials.reset", {ns: 'home'})}</Button>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="btn btn-lg btn-primary mb-1" aria-current="page" onClick={logout} >{t("logout", {ns: 'nav'})}</Link>
                </li>
            </>
        )
    }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" >{t("home")}</Link>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <DropdownButton id="dropdown-basic-button" title={i18n.language} className="btn btn-lg btn-primary mb-1">
                            <Dropdown.Item onClick={() => changeLang("en")}>EN</Dropdown.Item>
                            <Dropdown.Item onClick={() => changeLang("lt")}>LT</Dropdown.Item>
                        </DropdownButton>
                        {menu}
                        <>
                            <Modal centered={true} size="lg" show={show} onHide={handleClose} onExit={reload}>
                                <Modal.Header>
                                    <Modal.Title>{t("password.changed.modal.heading", {ns: 'home'})}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <>
                                        <p>{t("password.changed.for.user", {ns: 'home'})} <strong>{userName}</strong></p>
                                        <p>{t("password.changed.for.user.email", {ns: 'home'})} <strong>{userEmail}</strong></p>
                                        <p>{t("password.changed.for.user.password", {ns: 'home'})} <strong>{userNewPassword}</strong></p>
                                    </>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        {t("password.change.modal.close", {ns: 'home'})}
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;