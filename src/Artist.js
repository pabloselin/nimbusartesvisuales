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
import SectionTitle from "./components/SectionTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Loading from "./components/Loading";

const StyledArtist = styled("div")`
	font-family: "Inconsolata";
`;

const StyledIcon = styled(FontAwesomeIcon)`
	margin-right: 6px;
`;

const StyledDiscipline = styled("p")`
	margin: 0;
`;

const ContactTypography = styled(Typography)`
	text-transform: none;
	border: 1px solid white;
	border-radius: 20px;
	padding: 6px 12px;
	display: inline-block;
	font-size: 16px;
	text-decoration: none;
	margin: 0;
	a {
		text-decoration: none;
	}
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

	const artistName =
		artist.data !== undefined
			? `${artist.data.name} ${artist.data.lastname} ${artist.data.secondlastname}`
			: "";

	return (
		<>
			{artist.data !== undefined ? (
				<StyledArtist>
					<Helmet>
						<title>
							{artistName} - {nimbus_app_data.site_name}
						</title>
					</Helmet>
					<SectionTitle>Ficha de Artista</SectionTitle>
					<FullWidthTitle variant="h1">{artistName}</FullWidthTitle>
					<Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
						<Grid
							sx={{
								order: isMobile ? 1 : 2,
								backgroundColor:
									theme.palette.background.default,
							}}
							item
							xs={12}
							sm={4}
							md={4}
						>
							{artist.data.disciplines && (
								<>
									<FullWidthTitle variant="h3" dhb>
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
												<StyledDiscipline>
													<strong>
														{discipline.top}
													</strong>
													{discipline.subterms
														.length > 0 && (
														<>
															<span>:</span>
															{discipline.subterms.map(
																(subterm) => (
																	<span>
																		{" "}
																		{
																			subterm
																		}
																	</span>
																)
															)}
														</>
													)}
												</StyledDiscipline>
											)
										)}
									</Box>
								</>
							)}

							{artist.data.territories && (
								<>
									<FullWidthTitle variant="h3" dhb>
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
							{artist.data.additionalinfo &&
								artist.data.additionalinfo[0].descinfo.length >
									0 &&
								!isMobile && (
									<>
										<FullWidthTitle variant="h3" dhb>
											Información Adicional
										</FullWidthTitle>
										<Box
											sx={{
												padding: "12px 24px 12px 24px",
												backgroundColor:
													theme.palette.background
														.default,
											}}
										>
											{artist.data.additionalinfo.map(
												(info) => (
													<Typography sx={{ pb: 2 }}>
														<a
															target="_blank"
															href={info.linkinfo}
														>
															{info.descinfo}
														</a>
													</Typography>
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
									square
									artist={artistName}
									artistSlug={artist.data.slug}
									title="Muestra de Obras"
									works={artist.data.works}
								/>
								{isMobile &&
									artist.data.additionalinfo &&
									artist.data.additionalinfo[0].descinfo
										.length > 0 && (
										<>
											<FullWidthTitle variant="h3" dhb>
												Información Adicional
											</FullWidthTitle>
											<Box
												sx={{
													padding:
														"12px 24px 12px 24px",
													backgroundColor:
														theme.palette.background
															.default,
												}}
											>
												{artist.data.additionalinfo.map(
													(info) => (
														<Typography
															sx={{ pb: 2 }}
														>
															<a
																target="_blank"
																href={
																	info.linkinfo
																}
															>
																{info.descinfo}
															</a>
														</Typography>
													)
												)}
											</Box>
										</>
									)}
							</Grid>
						)}
					</Grid>

					{artist.data.videos && (
						<>
							<FullWidthTitle variant="h3">
								Entrevista al artista
							</FullWidthTitle>
							{artist.data.videos.map((video) => (
								<NimbusVideo video={video} />
							))}
						</>
					)}

					<Grid
						container
						columns={{ xs: 12, sm: 12, md: 12 }}
						sx={{
							backgroundColor: "#737373",
							typography: {
								color: "white",
							},
						}}
					>
						<Grid item xs={12} md={6}>
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
									<p>
										<ContactTypography
											variant="button"
											my={2}
										>
											<StyledIcon icon="envelope" />
											<Link
												href={`mailto:${artist.data.email}`}
												underline="always"
												color="#ffffff"
											>
												Enviar un email
											</Link>
										</ContactTypography>
									</p>
								)}
								{artist.data.phone && (
									<p>
										<ContactTypography
											variant="button"
											my={2}
										>
											<StyledIcon icon="phone" />
											<Link
												href={`tel:${artist.data.phone}`}
												underline="always"
												color="#ffffff"
											>
												Llamar por teléfono
											</Link>
										</ContactTypography>
									</p>
								)}
								{artist.data.webs[0].linkinfo.length > 0 && (
									<p>
										<ContactTypography
											variant="button"
											my={2}
										>
											{artist.data.webs.map((url) => (
												<>
													<StyledIcon icon="globe" />
													<Link
														href={url.linkinfo}
														underline="always"
														color="#ffffff"
													>
														Visitar su sitio web
													</Link>
												</>
											))}
										</ContactTypography>
									</p>
								)}
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
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
