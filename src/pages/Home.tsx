
const Home = (props: {name: string}) => {
    return (
        <div>
            {props.name ? 'Sveiki ' + props.name : 'Jūs nesate prisijungęs!'}
        </div>
    );
};

export default Home;