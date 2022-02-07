import apiFetch from "@wordpress/api-fetch";
import { Helmet } from "react-helmet";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState, useEffect } from "@wordpress/element";
import useMediaQuery from "@mui/material/useMediaQuery";

import FullWidthTitle from "./components/FullWidthTitle";
import SectionTitle from "./components/SectionTitle";
import nimbusInstagramIcon from "./imgs/instagram.svg";
import nimbusMailIcon from "./imgs/mail.svg";
import nimbusWebIcon from "./imgs/web.svg";
import nimbusYoutubeIcon from "./imgs/youtube.svg";

const StyledBox = styled(Box)`
	h2 {
		fontsize: 20px;
		padding: 12px 24px 12px 24px;
		margin: 24px -16px;
		background-color: white;
		color: #e6005c;
		border-bottom: 1px solid #e6005c;
		@media screen and (min-width: 768px) {
			border-top: 1px solid #e6005c;
			border-left: 1px solid #e6005c;
			border-right: 1px solid #e6005c;
		}
	}

	.wp-block-columns {
		margin-bottom: 0;
		margin-left: -18px;
		margin-right: -18px;
	}

	.wp-block-column {
		border-right: 2px solid white;
		border-top: 2px solid white;
		padding: 12px;
		figure {
			margin-bottom: 0;
		}
	}

	.wp-block-columns:not(.is-not-stacked-on-mobile)
		> .wp-block-column:not(:first-child) {
		margin-left: 0;
	}

	.wp-block-column.withimg {
		figure {
			margin: -10px;
		}
	}

	h2 {
		font-family: "Bebas Neue", sans-serif;
		text-transform: uppercase;
		font-weight: 400;
		margin-top: 0;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	p.nimbus-phone,
	p.nimbus-mail,
	p.nimbus-instagram,
	p.nimbus-web {
		padding-left: 36px;
		background-position: center left;
		background-repeat: no-repeat;
	}

	p.nimbus-mail {
		background-image: url(${nimbusMailIcon});
	}

	p.nimbus-phone {
		background-image: url(${nimbusMailIcon});
	}

	p.nimbus-instagram {
		background-image: url(${nimbusInstagramIcon});
	}

	p.nimbus-web {
		background-image: url(${nimbusMailIcon});
	}
`;

const SobreNimbus = (props) => {
	//const [content, setContent] = useState({});

	const isMobile = useMediaQuery("(max-width: 768px)");
	const content = {
		data: {
			title: nimbus_app_data.pages.sobre_nimbus.title,
			content: nimbus_app_data.pages.sobre_nimbus.content,
			fields: nimbus_app_data.pages.sobre_nimbus.fields,
		},
	};

	// useEffect(() => {
	// 	async function getContent(artistSlug) {
	// 		let fetchroute = "/wp/v2/pages?slug=sobre-nimbus";

	// 		apiFetch({ path: fetchroute }).then((result) => {
	// 			setContent({ data: result[0] });
	// 		});
	// 	}

	// 	console.log("fetching page content");

	// 	getContent();
	// }, []);

	return (
		<Grid container columns={{ xs: 12, sm: 12 }}>
			{content.data && (
				<Grid xs="12">
					{isMobile ? (
						<FullWidthTitle variant="h1">
							{content.data.title}
						</FullWidthTitle>
					) : (
						<SectionTitle variant="h1">
							{content.data.title}
						</SectionTitle>
					)}
					<FullWidthTitle noMargin variant="h1" borderedTop>
						Somos
					</FullWidthTitle>
					<StyledBox
						dangerouslySetInnerHTML={{
							__html: content.data.content,
						}}
						sx={{
							backgroundColor: "#f0f0f0",
							p: 2,
							fontFamily: "Inconsolata, sans-serif",
						}}
					/>
					<FullWidthTitle
						noMargin
						variant="h1"
						id="equipo"
						borderedTop
					>
						Equipo
					</FullWidthTitle>
					<StyledBox
						dangerouslySetInnerHTML={{
							__html: content.data.fields.seccion_equipo,
						}}
						sx={{
							backgroundColor: "#f0f0f0",
							pt: 0,
							pl: 2,
							pb: 2,
							pr: 2,
							fontFamily: "Inconsolata, sans-serif",
						}}
					/>
					<FullWidthTitle
						noMargin
						variant="h1"
						id="colaboran"
						borderedTop
					>
						Colaboran
					</FullWidthTitle>
					<StyledBox
						dangerouslySetInnerHTML={{
							__html: content.data.fields.seccion_colaboran,
						}}
						sx={{
							backgroundColor: "#f0f0f0",
							p: 2,
							fontFamily: "Inconsolata, sans-serif",
						}}
					/>
					<FullWidthTitle
						noMargin
						variant="h1"
						id="contacto"
						borderedTop
					>
						Contacto
					</FullWidthTitle>
				</Grid>
			)}
		</Grid>
	);
};

export default SobreNimbus;
