import { styled } from "@mui/system";

const StyledGrid = styled("div")`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const ArtistsGrid = (props) => {
	return <StyledGrid>{props.children}</StyledGrid>;
};

export default ArtistsGrid;
