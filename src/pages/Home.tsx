import {useTranslation} from "react-i18next";

const Home = (props: {name: string}) => {
    const {t} = useTranslation("home");
    return (
        <div>
            <h1>{props.name ? t("greeting") + ' ' + props.name : t("error.not.logged.in")}</h1>
        </div>
    );
};

export default Home;