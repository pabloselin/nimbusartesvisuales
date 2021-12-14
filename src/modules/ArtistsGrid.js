import styled from "styled-components";

const StyledGrid = styled.div`
	display: flex;
`;

const ArtistsGrid = (props) => {
	return <StyledGrid>{props.children}</StyledGrid>;
};

export default ArtistsGrid;
