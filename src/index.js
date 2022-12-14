import { render, Component, useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	useLocation,
} from "react-router-dom";
import Webfont from "webfontloader";

import { Helmet } from "react-helmet";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RouteChangeTracker from "./RouteChangeTracker";

import {
	faEnvelope,
	faPhone,
	faGlobe,
	faChevronCircleRight,
	faChevronCircleLeft,
	faPlayCircle,
	faCircle,
	faSearch,
	faWind,
	faChevronDown,
	faChevronUp,
	faChevronLeft,
	faChevronRight,
	faTimes,
	faTimesCircle,
	faEye,
} from "@fortawesome/free-solid-svg-icons";

library.add(
	fab,
	faEnvelope,
	faPhone,
	faGlobe,
	faChevronCircleRight,
	faChevronCircleLeft,
	faPlayCircle,
	faCircle,
	faSearch,
	faWind,
	faChevronDown,
	faChevronUp,
	faChevronLeft,
	faChevronRight,
	faTimes,
	faTimesCircle,
	faEye
);

import nimbusTheme from "./theming/nimbusTheme";
import NimbusMenu from "./modules/NimbusMenu";
import Home from "./Home";
import Artists from "./Artists";
import Artist from "./Artist";
import Search from "./Search";
import Series from "./Series";
import Serie from "./Serie";
import SobreNimbus from "./SobreNimbus";
import NimbusFooter from "./modules/NimbusFooter";

const Version = styled("span")`
	position: fixed;
	font-size: 10px;
	bottom: 0;
	right: 0;
	background-color: white;
	display: inline-block;
	padding: 3px;
`;

Webfont.load({
	google: {
		families: ["Bebas Neue", "Inconsolata:400,700"],
	},
});

const NimbusApp = (props) => {
	const topScroll = () => {
		window.scrollTo(0, 0);
	};

	const [pos, setPos] = useState("top");

	//const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

	useEffect(() => {
		document.addEventListener("scroll", (e) => {
			let scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 20) {
				setPos("moved");
			} else {
				setPos("top");
			}
		});
	}, []);

	return (
		<>
			<CssBaseline />
			<Container maxWidth="lg" disableGutters>
				<Router>
					<ThemeProvider theme={nimbusTheme}>
						<NimbusMenu />
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
							<Route
								path="/serie-documental-nimbus"
								element={<Series />}
							/>

							<Route
								path="/serie-documental-nimbus/:videoSlug"
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
								path="/sobre-nimbus"
								element={<SobreNimbus />}
							/>
							<Route
								path="*"
								element={
									<main>
										<Helmet>
											<title>No encontrado</title>
										</Helmet>
										<p>No encontrado</p>
									</main>
								}
							/>
						</Routes>
						<NimbusFooter path={location.pathname} />
						<Fade in={pos === "moved" ? true : false}>
							<Fab
								color="primary"
								onClick={topScroll}
								sx={{
									position: "fixed",
									bottom: "24px",
									right: "24px",
								}}
							>
								<FontAwesomeIcon icon={["fas", "chevron-up"]} />
							</Fab>
						</Fade>
						<Version>{nimbus_app_data.version}</Version>
					</ThemeProvider>
					<RouteChangeTracker />
				</Router>
			</Container>
		</>
	);
};

const nimbusRoot = document.getElementById("nimbusRoot");

if (nimbusRoot) {
	render(<NimbusApp localData={nimbus_app_data} />, nimbusRoot);
}
