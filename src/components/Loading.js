import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = (props) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				padding: "24px",
				textAlign: "center",
				backgroundColor: theme.palette.background.default,
			}}
		>
			<Typography variant="body1">
				<FontAwesomeIcon size="2x" icon="wind" />
				<br />
				Cargando ...
			</Typography>
		</Box>
	);
};

export default Loading;
