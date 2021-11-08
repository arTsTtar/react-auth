import React from 'react';
import {useTranslation} from "react-i18next";

const BackupCodes = (props: {backupCodes: string[]}) => {
    const {t} = useTranslation("register");
    const test = props.backupCodes.map((code, index) => {
        return (
            <p className="mb-3 fw-normal text-center">{index+1}. {code}</p>
        );
    })
    return (
        <>
            <p className="mb-3 fw-normal text-center">{t("backup.codes.information")}</p>
            <div>{test}</div>
        </>)
};

export default BackupCodes;