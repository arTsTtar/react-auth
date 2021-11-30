import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Table} from "react-bootstrap";

const AdminHome = () => {
    const {t} = useTranslation("home");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);

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
                            <th>{t("user.name")}</th>
                            <th>{t("user.email")}</th>
                            <th>{t("user.date.updated")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map(({updatedAt, email, name, id}, index) =>
                                <tr key={id}>
                                    <td>{++index}</td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{updatedAt}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </>
            )
    }


    return (content);
};

export default AdminHome;