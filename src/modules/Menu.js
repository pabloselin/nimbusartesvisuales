import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import nimbusLogo from "../imgs/nimbusLogo";
import nimbusLogoDesktop from "../imgs/nimbusLogoDesktop";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Menu = (props) => {
	const theme = useTheme();

	const NimbusNav = styled("nav")(({ theme }) => ({
		display: "flex",
		padding: "6px",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottom: `1px solid ${theme.palette.secondary.main}`,
	}));

	const StyledLink = styled(Link)(({ theme }) => ({
		fontFamily: theme.typography.headingsFont,
		textDecoration: "none",
		fontSize: "20px",
		display: "inline-block",
		padding: "4px",
	}));

	let location = useLocation();
	const isMobile = useMediaQuery("(max-width: 768px)");

	return (
		<NimbusNav>
			<Link to="/">
				<img src={isMobile ? nimbusLogo : nimbusLogoDesktop} />
			</Link>
			<StyledLink
				active={location.pathname === "/artistas"}
				to="/artistas"
				sx={{
					color:
						location.pathname === "/artistas"
							? theme.palette.primary.main
							: theme.palette.secondary.main,
				}}
			>
				Artistas
			</StyledLink>
			<StyledLink
				sx={{
					color:
						location.pathname === "/serie"
							? theme.palette.primary.main
							: theme.palette.secondary.main,
				}}
				to="/serie"
			>
				Serie Documental
			</StyledLink>
			<StyledLink
				sx={{
					color:
						location.pathname === "/buscador"
							? theme.palette.primary.main
							: theme.palette.secondary.main,
				}}
				to="/buscador"
			>
				Buscador
			</StyledLink>
		</NimbusNav>
	);
};

export default Menu;
