import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import BackupCodes from "../../components/BackupCodes";

const SuccessfulRegistration = ({location}: any) => {
    const {t} = useTranslation("register")
    const totpData = location.state.data;

    if (!totpData.enable2fa)
        return (
            <>
                <h1 className="h3 mb-3 fw-normal text-center">{t("successful.registration")}</h1>
                <BackupCodes backupCodes={totpData.backupCodes} />
                <Link to="/login" className="w-100 btn btn-lg btn-primary mb-3">{t("login")}</Link>
            </>
        );

    return (
            <div className="text-center">
                <h1 className="h3 mb-3 fw-normal text-center">{t("successful.registration")}</h1>
                <p className="mb-3 fw-normal text-center">{t("totp.information")}</p>
                <img src={`data:image/png;base64 , ${totpData.qrCode}`} alt="qr code"/>
                <label className="mb-3 text-center font-bold font-size-13">{t("secret.code")} : {totpData.secret}</label>
                <BackupCodes backupCodes={totpData.backupCodes} />
                <Link to="/login" className="w-100 btn btn-lg btn-primary mb-3">{t("login")}</Link>
            </div>
    );
};

export default SuccessfulRegistration;