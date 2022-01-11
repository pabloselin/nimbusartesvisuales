import { render, Component, useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { Helmet } from "react-helmet";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

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
	faChevronLeft,
	faChevronRight,
	faTimes,
	faTimesCircle,
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
	faChevronLeft,
	faChevronRight,
	faTimes,
	faTimesCircle
);

import nimbusTheme from "./theming/nimbusTheme";
import Menu from "./modules/Menu.js";
import Home from "./Home.js";
import Artists from "./Artists.js";
import Artist from "./Artist.js";
import Search from "./Search.js";
import Series from "./Series.js";
import Serie from "./Serie.js";

const NimbusApp = (props) => {
	return (
		<>
			<CssBaseline />
			<Container maxWidth="lg" disableGutters>
				<Router>
					<Helmet>
						<title>
							{nimbus_app_data.site_name} -{" "}
							{nimbus_app_data.site_description}
						</title>
					</Helmet>
					<ThemeProvider theme={nimbusTheme}>
						<Menu />
						<Routes>
							<Route
								path="/"
								element={
									<Home
										showIntro="true"
										localData={props.localData}
									/>
								}
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

							<Route
								path="/serie/:videoSlug"
								element={<Serie />}
							/>
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
							<Route
								path="/buscador"
								element={
									<Search
										expanded={true}
										localData={props.localData}
									/>
								}
							/>
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
			</Container>
		</>
	);
};

const nimbusRoot = document.getElementById("nimbusRoot");

if (nimbusRoot) {
	render(<NimbusApp localData={nimbus_app_data} />, nimbusRoot);
}
