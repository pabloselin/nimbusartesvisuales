import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const SectionTitle = (props) => {
	const StyledTitle = styled("h1")(({ theme }) => ({
		textTransfrom: "uppercase",
		fontFamily: theme.typography.headingsFont,
		color: theme.palette.secondary.main,
		[theme.breakpoints.down("md")]: {
			fontSize: "18px",
		},
		paddingLeft: "12px",
	}));

	return <StyledTitle>{props.children}</StyledTitle>;
};

export default SectionTitle;
