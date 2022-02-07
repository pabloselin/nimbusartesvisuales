import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
import { Link, Outlet, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import getTermData from "./getTermData";
import ArtistMini from "./modules/ArtistMini";
import ArtistsGrid from "./modules/ArtistsGrid";
import Loading from "./components/Loading";
import FullWidthTitle from "./components/FullWidthTitle";
import alphabet from "./components/alphabet";
import { styled } from "@mui/system";
import TaxView from "./TaxView";
import LetterSlider from "./modules/LetterSlider";
import SectionTitle from "./components/SectionTitle";
import checkEmptyLetters from "./components/checkEmptyLetters";

const LetterHeading = styled(Typography)`
	text-align: center;
	font-size: 20px;
	padding: 6px;
	border-radius: 20px;
	background-color: white;
	margin: 0 0 12px 0;
`;

const Artists = (props) => {
	//fetch artists
	const [content, setContent] = useState([{ artists: null }]);
	const [empties, setEmpties] = useState([{ empties: null }]);
	const [letter, setLetter] = useState("all");
	const { termSlug } = useParams();

	const theme = useTheme();

	const fetchroute = props.taxonomy
		? `${props.artistfetchurl}?${props.taxonomy}=${termSlug}`
		: props.artistfetchurl;

	useEffect(() => {
		async function getContent() {
			console.log(fetchroute);
			apiFetch({ path: fetchroute }).then((result) => {
				setContent({
					artists: result,
					termData: getTermData(termSlug, props.taxonomy),
				});
			});
		}
		console.log(termSlug);
		getContent();
		//setEmpties({ empties: checkEmptyLetters(content.artists) });
	}, [termSlug]);

	useEffect(() => {
		if (content) {
			setEmpties({ empties: checkEmptyLetters(content.artists) });
		}
	}, [content]);

	return (
		<>
			{!props.front && <SectionTitle>Artistas</SectionTitle>}
			{termSlug && content.artists && content.artists.length && (
				<FullWidthTitle variant="h1" padded>
					{content.termData.name}
				</FullWidthTitle>
			)}
			<Box
				sx={{
					backgroundColor: theme.palette.background.default,
					pt: 2,
				}}
			>
				{content.artists && content.artists.length ? (
					<div>
						<div>
							{!termSlug && (
								<>
									<LetterSlider
										setLetter={setLetter}
										activeLetter={letter}
										artists={content.artists}
									/>
								</>
							)}
						</div>

						<Box
							sx={{
								backgroundColor:
									theme.palette.background.default,
							}}
						>
							<Outlet />
							<Box sx={{ padding: "12px" }}>
								<ArtistsGrid>
									{content.artists !== undefined && (
										<>
											{!termSlug ? (
												alphabet.map((idxletter) => (
													<>
														{((letter.length > 0 &&
															letter ===
																idxletter) ||
															letter ===
																"all") && (
															<>
																{content.artists
																	.filter(
																		(
																			artist
																		) =>
																			artist.lastname
																				.toUpperCase()
																				.startsWith(
																					idxletter
																				)
																	)
																	.map(
																		(
																			artist
																		) => (
																			<ArtistMini
																				artistname={`${artist.name} ${artist.lastname} ${artist.secondlastname}`}
																				artistlink={`/artistas/${artist.slug}`}
																				artistimg={
																					artist.works
																						? artist
																								.works[0]
																								.images
																								.sizes
																								.thumbnail
																								.url
																						: null
																				}
																				key={
																					artist.id
																				}
																			></ArtistMini>
																		)
																	)}
															</>
														)}
													</>
												))
											) : (
												<>
													{content.artists.map(
														(artist) => (
															<ArtistMini
																artistname={`${artist.name} ${artist.lastname} ${artist.secondlastname}`}
																artistlink={`/artistas/${artist.slug}`}
																artistimg={
																	artist.works
																		.length >
																	0
																		? artist
																				.works[0]
																				.images
																				.url
																		: null
																}
																key={artist.id}
															/>
														)
													)}
												</>
											)}

											{props.taxonomy && (
												<TaxView
													taxonomy={props.taxonomy}
													localData={nimbus_app_data}
													curterm={content.termData}
												/>
											)}
										</>
									)}
								</ArtistsGrid>
							</Box>
						</Box>
					</div>
				) : (
					<Loading />
				)}
			</Box>
		</>
	);
};

export default Artists;
