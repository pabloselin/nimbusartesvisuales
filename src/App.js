import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import TaxView from "./TaxView";

const StyledApp = styled.div`
	font-family: "Inconsolata", sans-serif;
	font-weight: 400;
	font-style: normal;
	color: #282828;

	h1,
	h2,
	h3 {
		font-weight: 700;
		font-style: bold;
		text-transform: uppercase;
	}

	h4 {
		text-transform: none;
	}
`;

const Home = (props) => {
	//Home functionality

	return (
		<StyledApp>
			<Helmet>
				<title>
					{nimbus_app_data.site_name} -{" "}
					{nimbus_app_data.site_description}
				</title>
			</Helmet>
			<header>
				<Link to="/">Inicio</Link>
				<Link to="/artistas">Artistas</Link>
				<Link to="/serie">Series</Link>
				<Link to="/buscador">Buscador</Link>
			</header>

			<TaxView taxonomy="disciplina" localData={props.localData} />
			<TaxView taxonomy="territorio" localData={props.localData} />

			<Outlet />
		</StyledApp>
	);
};

export default Home;
