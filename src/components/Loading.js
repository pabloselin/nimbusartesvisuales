import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledTypography = styled(Typography)`
	.icon {
		animation: pulse 1s infinite;
		animation-delay: calc(var(--index) * -0.25s);

		@keyframes pulse {
			0% {
				opacity: 0.2;
			}
			100% {
				opacity: 1;
			}
		}
	}
`;

const Loading = (props) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				padding: "24px",
				textAlign: "center",
				backgroundColor: theme.palette.background.default,
				color: theme.palette.primary.main,
			}}
		>
			<StyledTypography variant="body1" sx={{ textAlign: "center" }}>
				<p>
					<FontAwesomeIcon size="2x" icon="wind" className="icon" />
					<FontAwesomeIcon size="2x" icon="wind" className="icon" />
					<FontAwesomeIcon size="2x" icon="wind" className="icon" />
				</p>
				Cargando ...
			</StyledTypography>
		</Box>
	);
};

export default Loading;
