import { render, Component, useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
	Link,
} from "react-router-dom";
import { Helmet } from "react-helmet";

import App from "./App.js";
import Artists from "./Artists.js";
import Artist from "./Artist.js";
import Search from "./Search.js";
import Series from "./Series.js";

const NimbusApp = (props) => {
	//let navigate = useNavigate();

	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/"
						element={<App localData={props.localData} />}
					>
						<Route
							path="/artistas"
							element={
								<Artists artistfetchurl="/nimbus/v1/artists" />
							}
						>
							<Route path=":artistSlug" element={<Artist />} />
						</Route>
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
					</Route>
				</Routes>
			</Router>
		</>
	);
};

const nimbusRoot = document.getElementById("nimbusRoot");

if (nimbusRoot) {
	render(<NimbusApp localData={nimbus_app_data} />, nimbusRoot);
}
