import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
import { Link, Outlet, useParams } from "react-router-dom";

import getTermData from "./getTermData";
import ArtistMini from "./modules/ArtistMini";
import ArtistsGrid from "./modules/ArtistsGrid";

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
			<h1>
				{content.artists && content.artists.length} Artista
				{content.artists && content.artists.length > 1 && "s"}{" "}
				{content.termData && content.termData.name}
			</h1>
			<Outlet />
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
	);
};

export default Artists;
