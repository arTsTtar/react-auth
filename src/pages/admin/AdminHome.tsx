import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Button, Modal, Table} from "react-bootstrap";

const AdminHome = () => {
    const {t} = useTranslation("home");
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userNewPassword, setUserNewPassword] = useState('');
    const [error, setError] = useState(false);
    const handleClose = () => setShow(false);
    const reload=() => window.location.reload();
    const handleShow = async (id: any) => {
        const response = await fetch('http://localhost:8000/api/user/' + id + '/resetPassword', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        const userData = await response.json();
        if (response.status >= 400) {
            setError(true);
            setShow(true);
        }
        else {
            setUserEmail(userData.email);
            setUserName(userData.name);
            setUserNewPassword(userData.generatedPassword);
            setError(false);
            setShow(true);
        }
    }

    useEffect( () => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/admin/users', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                const content = await response.json();
                if (response.status === 200) {
                    setUsers(content);
                    setError(false)
                } else {
                    setError(true);
                }
            }
        )();
    },  []);

    let content;
    if (error) {
        content = (
            <>
                <h1 className="form-signin">{t("no-access")}</h1>
            </>
        )
    } else {
        content =
            (
                <>
                    <h1 className="form-signin">{t("user.list")}</h1>
                    <Table bordered>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-center">{t("user.name")}</th>
                            <th className="text-center">{t("user.email")}</th>
                            <th className="text-center">{t("user.2fa.status")}</th>
                            <th className="text-center">{t("user.date.updated")}</th>
                            <th className="text-center">{t("user.credentials.reset.header")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map(({updatedAt, email, twoFaEnabled, name, id}, index) =>
                                <tr key={id}>
                                    <td className="text-center">{++index}</td>
                                    <td className="text-center">{name}</td>
                                    <td className="text-center">{email}</td>
                                    <td className="text-center">{t(twoFaEnabled ? "twoFa.yes" : "twoFa.no")}</td>
                                    <td className="text-center">{updatedAt}</td>
                                    <td className="text-center">{<Button className=" btn btn-lg btn-primary mb-1" type="submit" onClick={() => handleShow(id)}>{t("user.credentials.reset")}</Button>}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                    <>
                        <Modal centered={true} size="lg" show={show} onHide={handleClose} onExit={reload}>
                            <Modal.Header>
                                <Modal.Title>{t("password.changed.modal.heading")}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <>
                                    <p>{t("password.changed.for.user")} <strong>{userName}</strong></p>
                                    <p>{t("password.changed.for.user.email")} <strong>{userEmail}</strong></p>
                                    <p>{t("password.changed.for.user.password")} <strong>{userNewPassword}</strong></p>
                                </>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    {t("password.change.modal.close")}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                </>
            )
    }


    return (content);
};

export default AdminHome;