import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import { useState, useEffect, useRef } from "@wordpress/element";
import nimbusLogo from "../imgs/nimbusLogo";
import nimbusLogoDesktop from "../imgs/nimbusLogoDesktop";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import { HashLink } from "react-router-hash-link";

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
	["@media screen and (max-width: 768px)"]: {
		fontSize: "16px",
	},
}));

const StyledHashLink = styled(HashLink)(({ theme }) => ({
	fontFamily: theme.typography.headingsFont,
	textDecoration: "none",
	fontSize: "20px",
	display: "inline-block",
	padding: "4px",
	["@media screen and (max-width: 768px)"]: {
		fontSize: "16px",
	},
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 0,
	},
}));

const NimbusMenu = (props) => {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState(null);
	const [openDrawer, setOpenDrawer] = useState(false);
	const open = Boolean(anchorEl);
	const [hash, setHash] = useState(null);

	const handleClick = (event) => {
		console.log(event.currentTarget);
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setOpenDrawer(false);
	};

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setOpenDrawer(open);
	};

	let location = useLocation();
	const isMobile = useMediaQuery("(max-width: 768px)");

	const ExtraMenu = () => {
		return (
			<Drawer
				anchor={"top"}
				open={openDrawer}
				onClose={toggleDrawer(false)}
			>
				<MenuItem sx={{ borderBottom: "1px solid #0A0A1F" }}>
					MENU
				</MenuItem>
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
				<MenuItem onClick={handleClose}>
					<StyledHashLink
						smooth
						sx={{
							color:
								location.pathname === "/sobre-nimbus"
									? theme.palette.primary.main
									: theme.palette.secondary.main,
						}}
						to="/sobre-nimbus/#equipo"
					>
						Equipo
					</StyledHashLink>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<StyledHashLink
						smooth
						sx={{
							color:
								location.pathname === "/sobre-nimbus"
									? theme.palette.primary.main
									: theme.palette.secondary.main,
						}}
						to="/sobre-nimbus/#colaboran"
					>
						Colaboran
					</StyledHashLink>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<StyledHashLink
						smooth
						sx={{
							color:
								location.pathname === "/sobre-nimbus"
									? theme.palette.primary.main
									: theme.palette.secondary.main,
						}}
						to="/sobre-nimbus/#contacto"
					>
						Contacto
					</StyledHashLink>
				</MenuItem>
			</Drawer>
		);
	};

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
						onClick={toggleDrawer(!openDrawer)}
					>
						<FontAwesomeIcon
							id="nimbusToggleMenu"
							icon={["fas", "chevron-down"]}
						/>
					</IconButton>
					<ExtraMenu />
				</>
			)}
		</NimbusNav>
	);
};

export default NimbusMenu;
