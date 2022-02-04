import { Link, Outlet } from "react-router-dom";

import TaxView from "./TaxView";
import Artists from "./Artists";
import Search from "./Search";
import AccordionContent from "./modules/AccordionContent";
import HTMLContent from "./modules/HTMLContent";
import FullWidthTitle from "./components/FullWidthTitle";
import SectionTitle from "./components/SectionTitle";
import WorksSlider from "./modules/WorksSlider";

const Home = (props) => {
	//Home functionality

	return (
		<>
			<SectionTitle>{nimbus_app_data.site_description}</SectionTitle>

			<FullWidthTitle variant="h1">Muestra de Obras</FullWidthTitle>
			<p></p>
			<WorksSlider square front works={nimbus_app_data.artistslider} />
			<p></p>
			<FullWidthTitle variant="h1">Buscador</FullWidthTitle>
			<HTMLContent html={nimbus_app_data.frontpage.content} />

			<AccordionContent
				elements={[
					{
						title: "Artistas",
						component: (
							<Artists
								front
								artistfetchurl="/nimbus/v1/artists"
							/>
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
