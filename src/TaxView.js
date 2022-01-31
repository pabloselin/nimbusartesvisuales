import { Outlet, Link } from "react-router-dom";
import TermLink from "./modules/TermLink";
import Box from "@mui/material/Box";

const TaxView = (props) => {
	return (
		<Box sx={{ pt: 3, pb: 3 }}>
			{props.localData[props.taxonomy].map((term) => (
				<TermLink
					to={`/${props.taxonomy}/${term.slug}`}
					text={term.name}
				/>
			))}
		</Box>
	);
};

export default TaxView;
