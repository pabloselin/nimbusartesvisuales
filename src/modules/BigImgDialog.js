import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import FullWidthTitle from "../components/FullWidthTitle";
import FichaObra from "./FichaObra";

const StyledDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 0,
		backgroundColor: theme.palette.background.darker,
		border: `1px solid ${theme.palette.secondary.lighter}`,
		color: "white",
	},
	"& img": {
		maxHeight: "65vh",
		width: "auto",
	},
	["@media screen and (max-width: 768px)"]: {
		"& img": {
			maxWidth: "100%",
			height: "auto",
		},
	},
}));

const StyledLink = styled(Link)`
	color: white;
`;

const StyledDialogTitle = styled(DialogTitle)`
	position: absolute;
	top: 0;
	right: 0;
`;

const BigImgDialog = (props) => {
	const isMobile = useMediaQuery("(max-width: 768px)");

	return (
		<StyledDialog
			fullWidth={true}
			maxWidth={isMobile ? "sm" : "lg"}
			open={true}
			onClose={props.handleClose}
		>
			<StyledDialogTitle
				sx={{
					textAlign: "right",
				}}
			>
				<FontAwesomeIcon
					onClick={props.handleClose}
					icon={["fas", "times-circle"]}
					size={"lg"}
				/>
			</StyledDialogTitle>
			<DialogContent
				sx={{
					padding: 0,
				}}
			>
				<Box
					sx={{
						textAlign: "center",
						p: 2,
					}}
				>
					<img
						src={
							props.work.images.sizes.large !== undefined
								? props.work.images.sizes.large.url
								: props.work.images.full_url
						}
					/>
				</Box>
				<Box
					sx={{
						borderTop: `1px solid ${props.theme.palette.secondary.lighter}`,
						borderBottom: `1px solid ${props.theme.palette.secondary.lighter}`,
						pt: 1,
						pl: 2,
						pr: 2,
						pb: 1,
					}}
				>
					<Typography
						variant="h2"
						sx={{
							fontSize: "28px",
							textDecoration: "underline",
							color: "white",
						}}
					>
						{props.work.slug ? (
							<StyledLink to={`/artistas/${props.work.slug}`}>
								{props.work.artist}{" "}
							</StyledLink>
						) : (
							<>{props.work.artist} </>
						)}
					</Typography>
				</Box>
				<Box sx={{ p: 2 }}>
					<FichaObra
						nopad
						dark
						theme={props.theme}
						work={props.work}
					/>
				</Box>
			</DialogContent>
		</StyledDialog>
	);
};

export default BigImgDialog;
