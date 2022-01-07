import { Box } from "@mui/system";

export default function HTMLContent(props) {
	console.log(props.html);

	return (
		<Box
			sx={{ p: 1, bgcolor: "#f0f0f0", fontFamily: "Inconsolata" }}
			dangerouslySetInnerHTML={{ __html: props.html }}
		/>
	);
}
