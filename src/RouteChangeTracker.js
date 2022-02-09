import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

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
	console.log(pageView);
	ReactGA.pageview(pageView);

	return <></>;
};

export default RouteChangeTracker;
