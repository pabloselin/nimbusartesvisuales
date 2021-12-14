import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
import Fuse from "fuse.js";

import ArtistsGrid from "./modules/ArtistsGrid";
import ArtistMini from "./modules/ArtistMini";

const Search = (props) => {
	//Search functionality
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [artists, setArtists] = useState([{ data: null }]);

	const options = {
		keys: [
			"name",
			"lastname",
			"secondlastname",
			"email",
			"instagram",
			"phone",
			"facebook",
			"works.title",
			"works.description",
			"works.caption",
			"additionalinfo.descinfo",
		],
		threshold: 0.2,
	};

	const fuse = new Fuse(artists.data, options);
	const handleChange = (event) => {
		setSearchTerm(event.target.value);
		setSearchResults(fuse.search(event.target.value));
	};

	const fetchroute = "/nimbus/v1/artists/";

	useEffect(() => {
		async function getArtists() {
			apiFetch({ path: fetchroute }).then((result) => {
				setArtists({ data: result });
			});
		}
		console.log("fetching all artists");
		getArtists();
	}, []);

	return (
		<>
			<input
				type="text"
				placeholder="Buscar Artista"
				value={searchTerm}
				onChange={handleChange}
			/>
			<h1>Resultados de búsqueda</h1>
			{searchTerm && (
				<h2>
					{searchResults.length} Resultado para: {searchTerm}
				</h2>
			)}

			<ArtistsGrid>
				{searchResults.map((artist) => (
					<ArtistMini
						artistname={`${artist.item.name} ${artist.item.lastname} ${artist.item.secondlastname}`}
						artistlink={`/artistas/${artist.item.slug}`}
						artistimg={artist.item.works[0].url}
						key={artist.item.id}
					/>
				))}
			</ArtistsGrid>
		</>
	);
};

export default Search;
