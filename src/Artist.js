import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import WorksSlider from "./modules/WorksSlider";
import NimbusVideo from "./modules/NimbusVideo";
import FullWidthTitle from "./components/FullWidthTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Loading from "./components/Loading";

const StyledArtist = styled("div")`
	font-family: "Inconsolata";
`;

const StyledIcon = styled(FontAwesomeIcon)`
	margin-right: 6px;
`;

const Artist = (props) => {
	//fetch single artist
	const theme = useTheme();
	const [artist, setArtist] = useState([{ data: null }]);
	const { artistSlug } = useParams();

	const isMobile = useMediaQuery("(max-width: 768px)");

	useEffect(() => {
		async function getArtist(artistSlug) {
			let fetchroute = "/nimbus/v1/artistsingle?slug=" + artistSlug;
			apiFetch({ path: fetchroute }).then((result) => {
				setArtist({ data: result });
			});
		}
		console.log("fetching single artist");
		if (artistSlug !== undefined) {
			getArtist(artistSlug);
		}
	}, [artistSlug]);

	return (
		<>
			{artist.data !== undefined ? (
				<StyledArtist>
					<Helmet>
						<title>
							{`${artist.data.name} ${artist.data.lastname} ${artist.data.secondlastname}`}{" "}
							- {nimbus_app_data.site_name}
						</title>
					</Helmet>
					<h2>Ficha de Artista</h2>
					<FullWidthTitle variant="h1">
						{`${artist.data.name} ${artist.data.lastname} ${artist.data.secondlastname}`}
					</FullWidthTitle>
					<Grid container columns={{ xs: 1, sm: 6, md: 12 }}>
						<Grid
							sx={{ order: isMobile ? 1 : 2 }}
							item
							xs={12}
							sm={4}
							md={4}
						>
							{artist.data.disciplines && (
								<>
									<FullWidthTitle variant="h3">
										Disciplinas
									</FullWidthTitle>
									<Box
										sx={{
											backgroundColor:
												theme.palette.background
													.default,
											padding: "12px 24px 12px 24px",
										}}
									>
										{artist.data.disciplines.map(
											(discipline) => (
												<p>
													<strong>
														{discipline.top}
													</strong>
													{discipline.subterms
														.length > 0 &&
														discipline.subterms.map(
															(subterm) => (
																<span>
																	{" "}
																	{subterm}
																</span>
															)
														)}
												</p>
											)
										)}
									</Box>
								</>
							)}

							{artist.data.territories && (
								<>
									<FullWidthTitle variant="h3">
										Territorio
									</FullWidthTitle>
									<Box
										sx={{
											backgroundColor:
												theme.palette.background
													.default,
											padding: "12px 24px 12px 24px",
										}}
									>
										{artist.data.territories.map(
											(territory) => (
												<p>{territory}</p>
											)
										)}
									</Box>
								</>
							)}
						</Grid>

						{artist.data.works.length > 0 && (
							<Grid
								sx={{ order: isMobile ? 2 : 1 }}
								item
								xs={12}
								md={8}
								sm={8}
							>
								<WorksSlider
									title="Muestra de Obras"
									works={artist.data.works}
								/>
							</Grid>
						)}
					</Grid>

					{artist.data.videos && (
						<>
							<FullWidthTitle variant="h3">
								Entrevista a la autora
							</FullWidthTitle>
							{artist.data.videos.map((video) => (
								<NimbusVideo video={video} />
							))}
						</>
					)}

					{artist.data.additionalinfo &&
						artist.data.additionalinfo[0].descinfo.length > 0 && (
							<>
								<FullWidthTitle variant="h3">
									Información Adicional
								</FullWidthTitle>
								<Box
									sx={{
										padding: "12px 24px 12px 24px",
										backgroundColor:
											theme.palette.background.default,
									}}
								>
									{artist.data.additionalinfo.map((info) => (
										<div>
											<a
												target="_blank"
												href={info.linkinfo}
											>
												{info.descinfo}
											</a>
										</div>
									))}
								</Box>
							</>
						)}

					<Grid
						container
						columns={{ xs: 1, sm: 12, md: 12 }}
						sx={{
							backgroundColor: theme.palette.background.dark,
							typography: {
								color: "white",
							},
						}}
					>
						<Grid item xs={1} md={6}>
							<Box
								sx={{
									padding: "12px 24px 12px 24px",
								}}
							>
								<Typography
									variant="h2"
									sx={{ fontSize: "24px" }}
								>
									Contacta al artista
								</Typography>
								{artist.data.email && (
									<Typography variant="body1" my={2}>
										<StyledIcon icon="envelope" />
										<Link
											href={`mailto:${artist.data.email}`}
											underline="always"
											color="#ffffff"
										>
											{artist.data.email}
										</Link>
									</Typography>
								)}
								{artist.data.phone && (
									<Typography variant="body1" my={2}>
										<StyledIcon icon="phone" />
										<Link
											href={`tel:${artist.data.phone}`}
											underline="always"
											color="#ffffff"
										>
											{artist.data.phone}
										</Link>
									</Typography>
								)}
								{artist.data.webs[0].linkinfo.length > 0 && (
									<Typography variant="body1" my={2}>
										{artist.data.webs.map((url) => (
											<>
												<StyledIcon icon="globe" />
												<Link
													href={url.linkinfo}
													underline="always"
													color="#ffffff"
												>
													{url.linkinfo}
												</Link>
											</>
										))}
									</Typography>
								)}
							</Box>
						</Grid>
						<Grid item xs={1} md={6}>
							<Box
								sx={{
									padding: "12px 24px 12px 24px",
								}}
							>
								{(artist.data.instagram ||
									artist.data.facebook) && (
									<>
										<Typography
											variant="h2"
											sx={{ fontSize: "24px" }}
										>
											Redes sociales del artista
										</Typography>
										<Box
											sx={{
												display: "flex",
												fontSize: "30px",
											}}
										>
											{artist.data.instagram && (
												<Link
													underline="always"
													title={
														artist.data.instagram
													}
													href={artist.data.instagram}
													sx={{
														color: "white",
														padding: "6px",
													}}
												>
													<FontAwesomeIcon
														icon={[
															"fab",
															"instagram",
														]}
													/>
												</Link>
											)}
											{artist.data.instagram_b && (
												<Link
													title={
														artist.data.instagram_b
													}
													underline="always"
													href={
														artist.data.instagram_b
													}
													sx={{
														color: "white",
														padding: "6px",
													}}
												>
													<FontAwesomeIcon
														icon={[
															"fab",
															"instagram",
														]}
													/>
												</Link>
											)}
											{artist.data.facebook && (
												<Link
													title="Página o perfil de Facebook"
													underline="always"
													href={artist.data.facebook}
													sx={{
														color: "white",
														padding: "6px",
													}}
												>
													<FontAwesomeIcon
														icon={[
															"fab",
															"facebook-square",
														]}
													/>
												</Link>
											)}
										</Box>
									</>
								)}
							</Box>
						</Grid>
					</Grid>
				</StyledArtist>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Artist;
