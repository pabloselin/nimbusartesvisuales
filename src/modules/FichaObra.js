import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FichaObra = (props) => (
	<Box
		sx={{
			padding: props.nopad ? 0 : "12px 24px 12px 24px",
			textAlign: "left",
			backgroundColor: props.dark
				? "#1A1A1A"
				: props.theme.palette.background.default,
		}}
	>
		<Typography
			variant="h2"
			sx={{
				color: props.dark
					? props.theme.palette.secondary.lighter
					: "#0A0A1F",
				fontSize: "18px",
				fontFamily: props.theme.typography.fontFamily,
				fontWeight: "700",
			}}
		>
			Título: {props.work.images.title}
		</Typography>
		<Typography
			sx={{
				color: props.dark
					? props.theme.palette.secondary.lighter
					: "#0A0A1F",
			}}
		>
			<br />
			{props.work.technique && <>Técnica: {props.work.technique}</>}
			{props.work.medidas && (
				<>
					<br />
					Medidas: {props.work.measures}
				</>
			)}
			{props.work.year && (
				<>
					<br />
					Año: {props.work.year}
				</>
			)}
		</Typography>
	</Box>
);

export default FichaObra;
