import { render, Component, useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
	Link,
} from "react-router-dom";

import styled from "styled-components";
import { Helmet } from "react-helmet";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
	faEnvelope,
	faPhone,
	faGlobe,
	faChevronCircleRight,
	faChevronCircleLeft,
	faPlayCircle,
	faSearch,
	faWind,
	faChevronDown,
	faChevronUp,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(
	fab,
	faEnvelope,
	faPhone,
	faGlobe,
	faChevronCircleRight,
	faChevronCircleLeft,
	faPlayCircle,
	faSearch,
	faWind,
	faChevronDown,
	faChevronUp,
	faTimes
);

import Home from "./Home.js";
import Artists from "./Artists.js";
import Artist from "./Artist.js";
import Search from "./Search.js";
import Series from "./Series.js";

const nimbusTheme = createTheme({
	typography: {
		fontFamily: ["Inconsolata", "Bebas Neue", "sans-serif"].join(","),
	},
});

const NimbusApp = (props) => {
	//let navigate = useNavigate();

	return (
		<>
			<Router>
				<Helmet>
					<title>
						{nimbus_app_data.site_name} -{" "}
						{nimbus_app_data.site_description}
					</title>
				</Helmet>
				<ThemeProvider theme={nimbusTheme}>
					<header>
						<Link to="/">Inicio</Link>
						<Link to="/artistas">Artistas</Link>
						<Link to="/serie">Series</Link>
						<Link to="/buscador">Buscador</Link>
					</header>
					<Routes>
						<Route
							path="/"
							element={<Home localData={props.localData} />}
						></Route>
						<Route
							path="/artistas"
							element={
								<Artists artistfetchurl="/nimbus/v1/artists" />
							}
						></Route>
						<Route
							path="/artistas/:artistSlug"
							element={<Artist />}
						/>
						<Route path="/serie" element={<Series />} />

						<Route path="/disciplina">
							<Route
								path=":termSlug"
								element={
									<Artists
										taxonomy="disciplina"
										artistfetchurl="nimbus/v1/artiststax"
									/>
								}
							/>
						</Route>
						<Route path="/territorio">
							<Route
								path=":termSlug"
								element={
									<Artists
										artistfetchurl="nimbus/v1/artiststax"
										taxonomy="territorio"
									/>
								}
							/>
						</Route>
						<Route path="/buscador" element={<Search />} />
						<Route
							path="*"
							element={
								<main>
									<p>No encontrado</p>
								</main>
							}
						/>
					</Routes>
				</ThemeProvider>
			</Router>
		</>
	);
};

const nimbusRoot = document.getElementById("nimbusRoot");

if (nimbusRoot) {
	render(<NimbusApp localData={nimbus_app_data} />, nimbusRoot);
}
