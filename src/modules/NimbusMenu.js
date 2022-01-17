import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import { useState, useEffect } from "@wordpress/element";
import nimbusLogo from "../imgs/nimbusLogo";
import nimbusLogoDesktop from "../imgs/nimbusLogoDesktop";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

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

const StyledMenu = styled(Menu)(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 0,
	},
}));

const NimbusMenu = (props) => {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		console.log(event.currentTarget);
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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
						location.pathname === "/serie-documental-nimbus"
							? theme.palette.primary.main
							: theme.palette.secondary.main,
				}}
				to="/serie-documental-nimbus"
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
			{!isMobile ? (
				<StyledLink
					sx={{
						color:
							location.pathname === "/sobre-nimbus"
								? theme.palette.primary.main
								: theme.palette.secondary.main,
					}}
					to="/sobre-nimbus"
				>
					Sobre Nimbus
				</StyledLink>
			) : (
				<>
					<IconButton
						component="span"
						aria-controls={open ? "nimbusMenu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
					>
						<FontAwesomeIcon
							id="nimbusToggleMenu"
							icon={["fas", "chevron-down"]}
						/>
					</IconButton>
					<StyledMenu
						id="nimbusMenu"
						aria-labelledby="nimbusToggleMenu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						anchorOrigin={{}}
					>
						<MenuItem onClick={handleClose}>
							<StyledLink
								sx={{
									color:
										location.pathname === "/sobre-nimbus"
											? theme.palette.primary.main
											: theme.palette.secondary.main,
								}}
								to="/sobre-nimbus"
							>
								Sobre Nimbus
							</StyledLink>
						</MenuItem>
					</StyledMenu>
				</>
			)}
		</NimbusNav>
	);
};

export default NimbusMenu;
