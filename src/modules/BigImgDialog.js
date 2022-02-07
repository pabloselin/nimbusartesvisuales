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
import WorksSlider from "./WorksSlider";

const StyledDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 0,
		backgroundColor: "#1A1A1A",
		color: "white",
	},
	"& img": {
		maxHeight: "65vh",
		width: "auto",
	},
	["@media screen and (max-width: 768px)"]: {
		"& img": {
			maxWidth: "100%",
			maxHeight: "none",
			height: "auto",
		},
	},
}));

const StyledDialogTitle = styled(DialogTitle)`
	position: absolute;
	top: 0;
	right: 0;
`;

const BigImgDialog = (props) => {
	const isMobile = useMediaQuery("(max-width: 768px)");

	return (
		<StyledDialog
			fullScreen
			fullWidth={true}
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
						pt: 6,
						pl: 2,
						pb: 2,
						pr: 2,
					}}
				>
					<WorksSlider
						full
						artist={props.artist}
						artistSlug={props.artistSlug}
						title="Muestra de Obras"
						works={props.works}
						initialSlide={props.activeSlide}
					/>
				</Box>
			</DialogContent>
		</StyledDialog>
	);
};

export default BigImgDialog;
