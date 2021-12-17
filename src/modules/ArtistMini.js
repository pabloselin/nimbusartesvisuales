import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
	display: block;
	position: relative;
	overflow: hidden;
	margin: 8px 4px;
	width: 150px;
	height: 150px;

	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		bottom: 70%;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(
			180deg,
			#6c6c6c 0%,
			rgba(108, 108, 108, 0) 100%
		);
	}
`;

const ArtistTitle = styled.h1`
	position: absolute;
	font-family: "Bebas Neue", sans-serif;
	font-weight: 400;
	font-style: normal;
	top: 24px;
	left: 12px;
	color: white;
	line-height: 22px;
	font-size: 22px;
	text-decoration: underline;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ArtistMini = (props) => (
	<StyledLink to={props.artistlink}>
		<img src={props.artistimg} />
		<ArtistTitle>{props.artistname}</ArtistTitle>
	</StyledLink>
);

export default ArtistMini;
