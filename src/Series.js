import apiFetch from "@wordpress/api-fetch";
import FullWidthTitle from "./components/FullWidthTitle";
import SectionTitle from "./components/SectionTitle";
import { useState, useEffect } from "@wordpress/element";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import Loading from "./components/Loading";
import NimbusVideo from "./modules/NimbusVideo";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Helmet from "react-helmet";

const Series = (props) => {
	//fetch series
	const [content, setContent] = useState([{ artists: null }]);
	const theme = useTheme();
	const { videoSlug } = useParams();
	console.log(videoSlug);
	const fetchroute =
		videoSlug !== undefined
			? "nimbus/v1/videosingle/?slug=" + videoSlug
			: "nimbus/v1/videos";

	const StyledRouterLink = styled(RouterLink)(({ theme }) => ({
		textDecoration: "none",
		color: theme.palette.primary.main,
	}));

	useEffect(() => {
		async function getContent() {
			apiFetch({ path: fetchroute }).then((result) => {
				setContent({
					videos: result,
				});
			});
		}
		getContent();
	}, [videoSlug]);

	return (
		<>
			{content.videos && content.videos.length ? (
				<>
					{nimbus_app_data.pages.serie_documental_nimbus && (
						<>
							<Helmet>
								<title>
									{
										nimbus_app_data.pages
											.serie_documental_nimbus.title
									}{" "}
									- {nimbus_app_data.site_name}
								</title>
							</Helmet>
							<SectionTitle sx={{ p: 0 }}>
								{
									nimbus_app_data.pages
										.serie_documental_nimbus.title
								}
							</SectionTitle>
							<FullWidthTitle variant="h2">Avance</FullWidthTitle>
							<Box sx={{ backgroundColor: "#f0f0f0" }}>
								<Grid container columns={{ md: 12 }}>
									<Grid item md={6}>
										<NimbusVideo
											togglable
											video={{
												slug: "none",
												video_id:
													nimbus_app_data.pages
														.serie_documental_nimbus
														.video_id,
											}}
										/>
									</Grid>
									<Grid item md={6}>
										<Typography
											variant="body1"
											sx={{ p: 2, fontWeight: "bold" }}
										>
											Duración:{" "}
											{
												nimbus_app_data.pages
													.serie_documental_nimbus
													.fields.nimbusduracion
											}
											<br />
											Subtítulos:{" "}
											{
												nimbus_app_data.pages
													.serie_documental_nimbus
													.fields.nimbussubtitulos
											}
										</Typography>
										<Typography
											sx={{ p: 2 }}
											variant="body1"
											dangerouslySetInnerHTML={{
												__html: nimbus_app_data.pages
													.serie_documental_nimbus
													.content,
											}}
										/>
									</Grid>
								</Grid>
							</Box>
						</>
					)}

					<FullWidthTitle variant="h2">Capítulos</FullWidthTitle>

					{content.videos.map((video) => (
						<Box>
							<FullWidthTitle variant="h2">
								<StyledRouterLink
									to={`/serie-documental-nimbus/${video.slug}`}
								>
									Capítulo {video.chapter_number}:{" "}
									{video.name}
								</StyledRouterLink>
							</FullWidthTitle>
							<Grid theme={theme} container columns={{ md: 12 }}>
								<Grid item md={6}>
									<NimbusVideo video={video} />
								</Grid>
								<Grid
									item
									md={6}
									sx={{ backgroundColor: "#f0f0f0" }}
								>
									<Box theme={theme} sx={{ p: 2 }}>
										<Typography sx={{ fontWeight: "bold" }}>
											Duración: {video.duracion}
										</Typography>
										<Typography sx={{ fontWeight: "bold" }}>
											Subtítulos: {video.subtitulos}
										</Typography>
										<Typography sx={{ fontWeight: "bold" }}>
											Audio: {video.audio}
										</Typography>
									</Box>
									<Box
										sx={{
											pt: 0,
											pb: 2,
											pl: 2,
											pr: 2,
										}}
									>
										<Typography
											variant="body1"
											dangerouslySetInnerHTML={{
												__html: video.chapter_content,
											}}
										/>
									</Box>
								</Grid>
							</Grid>
						</Box>
					))}
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Series;
