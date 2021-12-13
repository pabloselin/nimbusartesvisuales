import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
import { Link, Outlet } from "react-router-dom";

const Artists = (props) => {
	//fetch artists
	const [content, setContent] = useState([{ artists: null }]);

	const fetchroute = props.artistfetchurl;

	useEffect(() => {
		async function getContent() {
			apiFetch({ path: fetchroute }).then((result) => {
				setContent({
					artists: result,
				});
			});
		}
		console.log("fetching");
		getContent();
	}, []);

	return (
		<>
			<h1>Artistas</h1>
			<div>
				<Outlet />
				{content.artists !== undefined &&
					content.artists.map((artist) => (
						<Link to={`/artistas/${artist.slug}`} key={artist.id}>
							<div className="artist">
								<img
									src={artist.works[0].url}
									title={artist.works[0].title}
								/>
								{`${artist.name} ${artist.lastname} ${artist.secondlastname}`}
							</div>
						</Link>
					))}
			</div>
		</>
	);
};

export default Artists;
