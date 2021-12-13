import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
import { Link, useParams } from "react-router-dom";

const Artist = (props) => {
	//fetch single artist
	const [artist, setArtist] = useState([{ data: null }]);
	let params = useParams();
	let slug = params.artistSlug;

	useEffect(() => {
		let fetchroute = "/nimbus/v1/artistsingle?slug=" + slug;

		async function getArtist() {
			apiFetch({ path: fetchroute }).then((result) => {
				setArtist({ data: result });
			});
		}
		console.log("fetching single artist");
		getArtist();
	}, [artist]);

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
