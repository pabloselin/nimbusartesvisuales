import { Link, Outlet } from "react-router-dom";

import TaxView from "./TaxView";
import Artists from "./Artists";
import Search from "./Search";
import AccordionContent from "./modules/AccordionContent";
import HTMLContent from "./modules/HTMLContent";

const Home = (props) => {
	//Home functionality

	return (
		<>
			<HTMLContent html={nimbus_app_data.frontpage.content} />

			<AccordionContent
				elements={[
					{
						title: "Artistas",
						component: (
							<Artists artistfetchurl="/nimbus/v1/artists" />
						),
						id: "panel-artistas",
					},
					{
						title: "Disciplinas",
						component: (
							<TaxView
								taxonomy="disciplina"
								localData={props.localData}
							/>
						),
						id: "panel-disciplinas",
					},
					{
						title: "Territorios",
						component: (
							<TaxView
								taxonomy="territorio"
								localData={props.localData}
							/>
						),
						id: "panel-territorios",
					},
				]}
			/>
			<Search />
			<Outlet />
		</>
	);
};

export default Home;
