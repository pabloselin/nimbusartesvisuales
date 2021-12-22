import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import nimbusLogo from "../imgs/nimbusLogo";
import { useTheme } from "@mui/material/styles";

const Menu = (props) => {
	const theme = useTheme();

	const NimbusNav = styled("nav")(({ theme }) => ({
		display: "flex",
		padding: "6px",
		borderBottom: `2px solid ${theme.palette.secondary.main}`,
	}));

	const StyledLink = styled(Link)(({ theme }) => ({
		fontFamily: theme.typography.headingsFont,
		color: theme.palette.secondary.main,
		textDecoration: "none",
		fontSize: "20px",
		display: "inline-block",
		padding: "4px",
	}));

	return (
		<NimbusNav>
			<Link to="/">
				<img src={nimbusLogo} />
			</Link>
			<StyledLink to="/artistas">Artistas</StyledLink>
			<StyledLink to="/serie">Serie Documental</StyledLink>
			<StyledLink to="/buscador">Buscador</StyledLink>
		</NimbusNav>
	);
};

export default Menu;
