import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
import { Link, useParams } from "react-router-dom";

const Artist = (props) => {
	//fetch single artist
	const [artist, setArtist] = useState([{ data: null }]);
	const { artistSlug } = useParams();

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
				<>
					<h1>{`${artist.data.name} ${artist.data.lastname} ${artist.data.secondlastname}`}</h1>
					<div>{artist.data.email}</div>
				</>
			) : (
				<p>Cargando ...</p>
			)}
		</>
	);
};

export default Artist;
