import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import logoFondart from "../imgs/logofondart.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const StyledLink = styled(Link)({
	color: "white",
	display: "inline-block",
	margin: "5px",
});

const StyledButton = styled(Button)({
	color: "white",
	border: "1px solid white",
	textTransform: "none",
	padding: "6px 24px",
	"& svg": {
		marginRight: "12px",
	},
});

const NimbusFooter = (props) => {
	const theme = useTheme();
	const location = useLocation();
	return (
		<Grid
			sx={{
				backgroundColor: theme.palette.background.dark,
				mt:
					props.path === "/sobre-nimbus" ||
					props.path === "/sobre-nimbus/"
						? 0
						: 1,
				typography: {
					color: "white",
					fontFamily: theme.typography.fontFamily,
				},
			}}
			container
			columns={{ xs: 12, sm: 12, md: 12 }}
		>
			{props.path === "/sobre-nimbus/" ||
				(props.path === "/sobre-nimbus" ? (
					<></>
				) : (
					<Grid item md={4} sx={{ p: 3 }}>
						<p>
							Proyecto finaciado por el Ministerio de las
							Culturas,las Artes y el Patrimonio 2021
						</p>
						<img width="130" src={logoFondart} />
					</Grid>
				))}

			<Grid item md={4} sx={{ p: 3 }}>
				<p>¿Quieres saber de nuestras actividades?</p>
				<p>¡Sigue nuestras redes sociales!</p>
				<p>
					<StyledLink href={nimbus_app_data.instagram}>
						<FontAwesomeIcon
							size="3x"
							icon={["fab", "instagram"]}
						/>
					</StyledLink>
					<StyledLink href={nimbus_app_data.facebook}>
						<FontAwesomeIcon size="3x" icon={["fab", "facebook"]} />
					</StyledLink>
					<StyledLink href={nimbus_app_data.youtube}>
						<FontAwesomeIcon size="3x" icon={["fab", "youtube"]} />
					</StyledLink>
				</p>
			</Grid>
			<Grid item md={4} sx={{ p: 3 }}>
				<p>¿Quieres ser parte del directorio?</p>
				<p>¡Escríbenos!</p>
				<StyledButton href={`mailto:${nimbus_app_data.email}`}>
					<FontAwesomeIcon size="2x" icon={["fas", "envelope"]} />{" "}
					Enviar un email
				</StyledButton>
			</Grid>
		</Grid>
	);
};

export default NimbusFooter;
