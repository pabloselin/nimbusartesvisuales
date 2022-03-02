import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "@wordpress/element";

ReactGA.initialize("G-BR72TJ7F1P", []);

const RouteChangeTracker = () => {
	const location = useLocation();
	const pathname = location.pathname;

	let pageView;
	if (pathname === "*") {
		pageView = "/not-found";
	} else {
		pageView = pathname;
	}

	useEffect(() => {
		console.log(location);
		ReactGA.pageview(pageView);
	}, [location]);

	return <></>;
};

export default RouteChangeTracker;
