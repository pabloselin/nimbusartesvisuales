import apiFetch from "@wordpress/api-fetch";
import { Helmet } from "react-helmet";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState, useEffect } from "@wordpress/element";

import FullWidthTitle from "./components/FullWidthTitle";

const SobreNimbus = (props) => {
	const [content, setContent] = useState({});

	useEffect(() => {
		async function getContent(artistSlug) {
			let fetchroute = "/wp/v2/pages?slug=sobre-nimbus";

			apiFetch({ path: fetchroute }).then((result) => {
				setContent({ data: result[0] });
			});
		}

		console.log("fetching page content");

		getContent();
	}, []);

	return (
		<Grid container columns={{ xs: 12, sm: 12 }}>
			{content.data && (
				<Grid xs="12">
					<FullWidthTitle>
						{content.data.title.rendered}
					</FullWidthTitle>
					<Box
						dangerouslySetInnerHTML={{
							__html: content.data.content.rendered,
						}}
						sx={{ backgroundColor: "#f0f0f0", p: 2 }}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default SobreNimbus;
