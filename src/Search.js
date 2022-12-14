import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect, forwardRef } from "@wordpress/element";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import TextField from "@mui/material/TextField";
import InputUnstyled from "@mui/base/InputUnstyled";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import ArtistsGrid from "./modules/ArtistsGrid";
import ArtistMini from "./modules/ArtistMini";
import TaxView from "./TaxView";
import Artists from "./Artists";
import AccordionContent from "./modules/AccordionContent";
import FullWidthTitle from "./components/FullWidthTitle";
import SectionTitle from "./components/SectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Helmet from "react-helmet";

const CustomInput = forwardRef(function CustomInput(props, ref) {
	return (
		<InputUnstyled
			components={{ Input: StyledInputTextField }}
			{...props}
			ref={ref}
		/>
	);
});

const StyledInputTextField = styled("input")`
	padding: 12px 12px 12px 36px;
	min-width: 200px;
	border-radius: 24px;
	border: 0;
	position: relative;
	background-repeat: no-repeat;
	background-position: 8px 8px;
	background-size: 24px 24px;
	background-opacity: 0.5s;
	background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='search' class='svg-inline--fa fa-search fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='currentColor' d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'%3E%3C/path%3E%3C/svg%3E");
	&:before {
		content: " ";
		display: block;
		width: 24px;
		height: 24px;
		background-size: 24px 24px;
	}
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
	background-color: #ccc;
	border-radius: 50%;
	color: #6c6c6c;
	padding: 12px;
`;

const Search = (props) => {
	//Search functionality
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [artists, setArtists] = useState([{ data: null }]);
	const theme = useTheme();
	const location = useLocation();

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
			"disciplines.top",
			"disciplines.subterms",
			"territories",
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
		<div theme={theme}>
			{props.expanded && (
				<>
					<SectionTitle>Buscador de Artistas</SectionTitle>
					<Helmet>
						<title>
							Buscador de Artistas - {nimbus_app_data.site_name}
						</title>
					</Helmet>
					<AccordionContent
						elements={[
							{
								title: "Artistas",
								component: (
									<Artists
										front
										artistfetchurl="/nimbus/v1/artists"
									/>
								),
								id: "panel-artistas",
								expanded: location.hash === "#artistas",
							},
							{
								title: "Disciplinas",
								component: (
									<TaxView
										taxonomy="disciplina"
										localData={props.localData}
									/>
								),
								id: "panel-disciplinas",
							},
							{
								title: "Territorios",
								component: (
									<TaxView
										taxonomy="territorio"
										localData={props.localData}
									/>
								),
								id: "panel-territorios",
							},
						]}
					/>
				</>
			)}

			<Box
				sx={{
					p: 6,
					textAlign: "center",
					bgcolor: "rgba(51, 51, 153, 0.8)",
				}}
			>
				<TextField
					fullWidth
					aria-label="??Qu?? est??s buscando?"
					placeholder="??Qu?? est??s buscando?"
					InputProps={{ disableUnderline: true }}
					value={searchTerm}
					onChange={handleChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<FontAwesomeIcon icon="search" />
							</InputAdornment>
						),
					}}
					sx={{
						backgroundColor: "white",
						borderRadius: "30px",
					}}
				/>
			</Box>

			{searchResults.length > 0 ? (
				<>
					<FullWidthTitle variant="h1">
						Resultados de b??squeda
					</FullWidthTitle>
					<FullWidthTitle variant="h3">
						{searchResults.length} Resultado
						{searchResults.length > 1 && "s"} para: {searchTerm}
					</FullWidthTitle>

					<ArtistsGrid>
						{searchResults.map((artist) => (
							<ArtistMini
								artistname={`${artist.item.name} ${artist.item.lastname} ${artist.item.secondlastname}`}
								artistlink={`/artistas/${artist.item.slug}`}
								artistimg={
									artist.item.works.length > 0
										? artist.item.works[0].images.url
										: null
								}
								key={artist.item.id}
							/>
						))}
					</ArtistsGrid>
				</>
			) : (
				<>
					{searchTerm.length > 0 && (
						<Box
							sx={{
								textAlign: "center",
								padding: "24px",
								backgroundColor:
									theme.palette.background.default,
							}}
						>
							<StyledFontAwesomeIcon icon="search" size="4x" />
							<Typography variant="body1">
								<p>
									??Lo sentimos! No hay resultados asociados a
									tu busqueda.
								</p>
								<p>
									Int??ntalo de nuevo o usa los siguentes
									filtros: ???Artistas???, ???Disciplinas???,
									???Territorios???.
								</p>
							</Typography>
						</Box>
					)}
				</>
			)}
		</div>
	);
};

export default Search;
