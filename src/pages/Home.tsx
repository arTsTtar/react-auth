import {useTranslation} from "react-i18next";

const Home = (props: {name: string}) => {
    const {t} = useTranslation("home");
    return (
        <div>
            {props.name ? t("greeting") + ' ' + props.name : t("error.not.logged.in")}
        </div>
    );
};

export default Home;