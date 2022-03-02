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
import nimbusInstagramIconWhite from "./imgs/instagram_white.svg";
import nimbusMailIconWhite from "./imgs/mail_white.svg";
import nimbusWebIconWhite from "./imgs/web_white.svg";

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
		@media screen and (max-width: 768px) {
			margin-left: 0;
			margin-right: 0;
		}
	}

	.wp-block-column {
		border-right: 2px solid white;
		border-top: 2px solid white;
		padding: 12px 12px 12px 24px;
		figure {
			margin-bottom: 0;
		}

		h3 {
			margin-top: 12px;
		}
	}

	.wp-block-columns:not(.is-not-stacked-on-mobile)
		> .wp-block-column:not(:first-child) {
		margin-left: 0;
	}

	.wp-block-column.withimg {
		@media screen and (max-width: 768px) {
			padding: 0;
		}
		figure {
			margin: -10px -10px -10px -22px;
			@media screen and (max-width: 768px) {
				margin: 0 0 0 -18px;
			}
		}
	}

	.gallery {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		figure {
			max-width: 150px;
		}
	}

	h2 {
		font-family: "Bebas Neue", sans-serif;
		text-transform: uppercase;
		font-weight: 400;
		margin-top: 0;
	}

	h3 {
		margin-bottom: 0;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	p.nimbus-phone,
	p.nimbus-mail,
	p.nimbus-instagram,
	p.nimbus-web,
	a.nimbusMail,
	a.nimbusPhone,
	a.nimbusInstagram,
	a.nimbusWeb {
		display: block;
		max-width: 220px;
		padding: 6px 12px 6px 42px;
		margin: 12px 0;
		background-position: 12px center;
		background-repeat: no-repeat;
		border: 1px solid #333399;
		border-radius: 30px;
		text-decoration: none;
		color: #333399;
		font-size: 14px;
		&:hover {
			background-color: #333399;
			color: white;
		}
	}

	p.nimbus-mail,
	a.nimbusMail {
		background-image: url(${nimbusMailIcon});
		&:hover {
			background-image: url(${nimbusMailIconWhite});
		}
	}

	p.nimbus-instagram,
	a.nimbusInstagram {
		background-image: url(${nimbusInstagramIcon});
		&:hover {
			background-image: url(${nimbusInstagramIconWhite});
		}
	}

	p.nimbus-web,
	a.nimbusWeb {
		background-image: url(${nimbusWebIcon});
		&:hover {
			background-image: url(${nimbusWebIconWhite});
		}
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
					<Helmet>
						<title>
							{content.data.title} - {nimbus_app_data.site_name}
						</title>
					</Helmet>
					<FullWidthTitle noMargin variant="h1" borderedTop>
						Somos
					</FullWidthTitle>
					<StyledBox
						dangerouslySetInnerHTML={{
							__html: content.data.content,
						}}
						sx={{
							backgroundColor: "#f0f0f0",
							p: 3,
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
							pb: 0,
							pr: 0,
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
							backgroundColor: "white",
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
