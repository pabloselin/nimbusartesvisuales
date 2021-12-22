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
import TaxView from "./TaxView";

const Artists = (props) => {
	//fetch artists
	const [content, setContent] = useState([{ artists: null }]);

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
		console.log("fetching");
		getContent();
	}, [termSlug]);

	return (
		<>
			{content.artists && content.artists.length ? (
				<>
					<FullWidthTitle variant="h1">
						{content.artists && content.artists.length} Artista
						{content.artists &&
							content.artists.length > 1 &&
							"s"}{" "}
						{content.termData && content.termData.name}
					</FullWidthTitle>
					<Box
						sx={{
							backgroundColor: theme.palette.background.default,
						}}
					>
						<Outlet />

						<ArtistsGrid>
							{content.artists !== undefined &&
								content.artists.map((artist) => (
									<ArtistMini
										artistname={`${artist.name} ${artist.lastname} ${artist.secondlastname}`}
										artistlink={`/artistas/${artist.slug}`}
										artistimg={
											artist.works.length > 0
												? artist.works[0].images.url
												: null
										}
										key={artist.id}
									/>
								))}
						</ArtistsGrid>
						{props.taxonomy && (
							<TaxView
								taxonomy={props.taxonomy}
								localData={nimbus_app_data}
								curterm={content.termData}
							/>
						)}
					</Box>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Artists;
