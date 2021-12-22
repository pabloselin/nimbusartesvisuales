import Typography from "@mui/material/Typography";

export default function NimbusTitle(props) {
	<Typography variant="h2" sx={{ fontFamily: "Bebas Neue" }}>
		{props.children}
	</Typography>;
}
