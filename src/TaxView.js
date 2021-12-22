import { Outlet, Link } from "react-router-dom";
import TermLink from "./modules/TermLink";

const TaxView = (props) => {
	return (
		<div>
			{props.localData[props.taxonomy].map((term) => (
				<TermLink
					to={`/${props.taxonomy}/${term.slug}`}
					text={term.name}
				/>
			))}
		</div>
	);
};

export default TaxView;
