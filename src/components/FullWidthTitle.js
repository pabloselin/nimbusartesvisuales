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
		borderBottomWidth: "2px",
		borderBottomStyle: "solid",
		borderBottomColor: theme.palette.primary.main,
	}));

	return (
		<StyledHeading variant={props.variant}>{props.children}</StyledHeading>
	);
};

export default FullWidthTitle;
