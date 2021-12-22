import YouTube from "react-youtube";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const VideoWrapper = styled("div")`
	position: relative;
	padding-bottom: 56.25%;
	padding-top: 25px;
	height: 0;
`;

const StyledYouTube = styled(YouTube)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const NimbusVideo = (props) => {
	const theme = useTheme();
	return (
		<>
			<VideoWrapper>
				<StyledYouTube videoId={props.video.video_id} />
			</VideoWrapper>
			<Box
				sx={{
					padding: "12px 24px",
					backgroundColor: theme.palette.background.default,
				}}
			>
				<Typography variant="h4">
					{props.video.chapter_title}
				</Typography>
				<Typography
					variant="body1"
					dangerouslySetInnerHTML={{
						__html: props.video.chapter_content,
					}}
				/>
			</Box>
		</>
	);
};

export default NimbusVideo;
