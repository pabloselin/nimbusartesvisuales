import { Box } from "@mui/system";

export default function HTMLContent(props) {
	console.log(props.html);

	return (
		<Box
			sx={{
				pl: 3,
				pr: 3,
				pt: 2,
				pb: 2,
				bgcolor: "#f0f0f0",
				fontFamily: "Inconsolata",
			}}
			dangerouslySetInnerHTML={{ __html: props.html }}
		/>
	);
}
