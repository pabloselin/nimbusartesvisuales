import { styled } from "@mui/system";

const StyledGrid = styled("div")`
	display: flex;
	flex-wrap: wrap;
	justify-content: start;
	margin-left: 12px;
`;

const ArtistsGrid = (props) => {
	return <StyledGrid>{props.children}</StyledGrid>;
};

export default ArtistsGrid;
