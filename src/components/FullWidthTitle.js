import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const FullWidthTitle = (props) => {
	const theme = useTheme();

	const StyledHeading = styled(Typography)(({ theme }) => ({
		fontSize: props.variant === "h3" ? "16px" : "20px",
		fontWeight: props.variant === "h3" ? 700 : 400,
		padding: "12px 24px 12px 24px",
		backgroundColor: "white",
		color: theme.palette.primary.main,
		borderBottomWidth: props.variant === "h1" ? 0 : "2px",
		borderBottomStyle: "solid",
		borderBottomColor: theme.palette.primary.main,
		borderTopWidth: props.borderedTop ? "1px" : 0,
		borderTopColor: theme.palette.primary.main,
		borderTopStyle: "solid",
		["@media screen and (min-width: 768px)"]: {
			borderBottomWidth: props.variant === "h1" ? 0 : "1px",
			borderTopWidth: props.dhb ? 0 : "1px",
			borderLeftWidth: props.dhb ? 0 : "1px",
			borderRightWidth: props.dhb ? 0 : "1px",
			borderBottomWidth: props.dhb ? 0 : "1px",
			borderStyle: "solid",
		},
	}));

	return (
		<StyledHeading id={props.id} variant={props.variant}>
			{props.children}
		</StyledHeading>
	);
};

export default FullWidthTitle;
