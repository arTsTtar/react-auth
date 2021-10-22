import React from 'react';
import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {Dropdown, DropdownButton } from 'react-bootstrap';

const Nav = (props: {name: string, setName: (name: string) => void}) => {
    const {t, i18n} = useTranslation("nav");
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
                    <Link to="/login" className="nav-link" aria-current="page">{t("login")}</Link>
                </li>
                <li className="nav-item">
                    <Link to="register" className="nav-link" aria-current="page">{t("register")}</Link>
                </li>
            </>
        )
    } else {
        menu = (
            <>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" aria-current="page" onClick={logout} >{t("logout")}</Link>
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
                        <DropdownButton id="dropdown-basic-button" title={i18n.language}>
                            <Dropdown.Item onClick={() => changeLang("en")}>EN</Dropdown.Item>
                            <Dropdown.Item onClick={() => changeLang("lt")}>LT</Dropdown.Item>
                        </DropdownButton>
                        {menu}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;