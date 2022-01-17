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
							<SectionTitle>
								{
									nimbus_app_data.pages
										.serie_documental_nimbus.title
								}
							</SectionTitle>
							<Box
								dangerouslySetInnerHTML={{
									__html: nimbus_app_data.pages
										.serie_documental_nimbus.content,
								}}
							/>
						</>
					)}

					{content.videos.map((video) => (
						<>
							<FullWidthTitle variant="h2">
								<StyledRouterLink to={`/serie/${video.slug}`}>
									Capítulo {video.chapter_number}:{" "}
									{video.name}
								</StyledRouterLink>
							</FullWidthTitle>
							<Grid container columns={{ md: 12 }}>
								<Grid item md={6}>
									<NimbusVideo video={video} />
								</Grid>
								<Grid
									item
									md={6}
									sx={{ backgroundColor: "#f0f0f0" }}
								>
									<Box>
										<p>{video.duracion}</p>
										<p>{video.subtitulos}</p>
									</Box>
									<Box
										sx={{
											p: 2,
										}}
										dangerouslySetInnerHTML={{
											__html: video.chapter_content,
										}}
									/>
								</Grid>
							</Grid>
						</>
					))}
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Series;
