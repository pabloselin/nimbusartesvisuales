import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
import { Link, Outlet, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/typography";

import getTermData from "./getTermData";
import ArtistMini from "./modules/ArtistMini";
import ArtistsGrid from "./modules/ArtistsGrid";
import TaxView from "./TaxView";

const Artists = (props) => {
	//fetch artists
	const [content, setContent] = useState([{ artists: null }]);

	const { termSlug } = useParams();

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
					<Typography
						variant="h3"
						sx={{ fontFamily: "Bebas Neue", color: "#E6005C" }}
					>
						{content.artists && content.artists.length} Artista
						{content.artists &&
							content.artists.length > 1 &&
							"s"}{" "}
						{content.termData && content.termData.name}
					</Typography>
					<Outlet />
					{props.taxonomy && (
						<TaxView
							taxonomy={props.taxonomy}
							localData={nimbus_app_data}
							curterm={content.termData}
						/>
					)}
					<ArtistsGrid>
						{content.artists !== undefined &&
							content.artists.map((artist) => (
								<ArtistMini
									artistname={`${artist.name} ${artist.lastname} ${artist.secondlastname}`}
									artistlink={`/artistas/${artist.slug}`}
									artistimg={artist.works[0].images.url}
									key={artist.id}
								/>
							))}
					</ArtistsGrid>
				</>
			) : (
				<p>
					<FontAwesomeIcon icon="wind" />
					<br />
					Cargando ...
				</p>
			)}
		</>
	);
};

export default Artists;
