import { Link, Outlet } from "react-router-dom";

const Home = (props) => {
	//Home functionality

	return (
		<>
			<header>
				<Link to="/artistas">Artistas</Link>
				<Link to="/serie">Series</Link>
				<Link to="/buscador">Buscador</Link>
			</header>
			<Outlet />
		</>
	);
};

export default Home;
