import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import WorksSlider from "./modules/WorksSlider";

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
					<Helmet>
						<title>
							{`${artist.data.name} ${artist.data.lastname} ${artist.data.secondlastname}`}{" "}
							- {nimbus_app_data.site_name}
						</title>
					</Helmet>
					<h1>{`${artist.data.name} ${artist.data.lastname} ${artist.data.secondlastname}`}</h1>

					{artist.data.disciplines && (
						<>
							<h2>Disciplinas</h2>
							{artist.data.disciplines.map((discipline) => (
								<span>{discipline.name} </span>
							))}
						</>
					)}

					{artist.data.works && (
						<div>
							<WorksSlider works={artist.data.works} />
						</div>
					)}

					<h2>Entrevista a la autora</h2>

					{artist.data.additionalinfo &&
						artist.data.additionalinfo[0].descinfo.length > 0 && (
							<>
								<h2>Información Adicional</h2>
								{artist.data.additionalinfo.map((info) => (
									<div>
										<a target="_blank" href={info.linkinfo}>
											{info.descinfo}
										</a>
									</div>
								))}
							</>
						)}

					<div>
						<h2>Contacta al artista</h2>
						{artist.data.email && <p>{artist.data.email}</p>}
						{artist.data.phone && <p>{artist.data.phone}</p>}
						{artist.data.web && <p>{artist.data.web}</p>}
						<h3>Redes sociales del artista</h3>
						{artist.data.instagram && (
							<p>
								<a href={artist.data.instagram}>Instagram</a>
							</p>
						)}
						{artist.data.facebook && (
							<p>
								<a href={artist.data.facebook}></a>
							</p>
						)}
					</div>
				</>
			) : (
				<p>Cargando ...</p>
			)}
		</>
	);
};

export default Artist;
