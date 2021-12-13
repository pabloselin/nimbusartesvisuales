import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";

export default function getArtists() {
	//fetch artists
	const [content, setContent] = useState([{ artists: null }]);

	const fetchroute = "/nimbus/v1/artists";

	function getContent() {
		apiFetch({ path: fetchroute }).then((result) => {
			setContent({
				artists: result,
			});
		});
	}
	console.log("fetching");
	getContent();

	return content;
}
