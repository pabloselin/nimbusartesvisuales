import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FichaObra = (props) => (
	<Box
		sx={{
			padding: props.nopad ? 0 : "12px 24px 12px 24px",
			textAlign: "left",
			backgroundColor: props.dark
				? props.theme.palette.background.darker
				: props.theme.palette.background.default,
		}}
	>
		<Typography
			variant="h2"
			sx={{
				color: props.dark
					? props.theme.palette.secondary.lighter
					: "#333",
				fontSize: "18px",
				fontFamily: props.theme.typography.fontFamily,
				fontWeight: "700",
			}}
		>
			{props.work.images.title}
		</Typography>
		<Typography>
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
