import { Outlet, Link, useLocation } from "react-router-dom";
import TermLink from "./modules/TermLink";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const TaxView = (props) => {
	const location = useLocation();

	return (
		<Grid container>
			<Grid item>
				<Box sx={{ p: 2 }}>
					{props.localData[props.taxonomy].map((term) => (
						<TermLink
							active={
								location.pathname ===
								`/${props.taxonomy}/${term.slug}`
									? true
									: false
							}
							to={`/${props.taxonomy}/${term.slug}`}
							text={term.name}
						/>
					))}
				</Box>
			</Grid>
		</Grid>
	);
};

export default TaxView;
