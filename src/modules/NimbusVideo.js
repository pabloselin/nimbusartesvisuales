import YouTube from "react-youtube";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";

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

const StyledThumb = styled("img")`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const getVideoImg = (videoId) => {
	if (videoId) {
		return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
	}
};

const NimbusVideo = (props) => {
	const theme = useTheme();

	return (
		<>
			<VideoWrapper>
				{props.expanded ? (
					<StyledYouTube videoId={props.video.video_id} />
				) : (
					<RouterLink to={`/serie/${props.video.slug}`}>
						<StyledThumb src={getVideoImg(props.video.video_id)} />
					</RouterLink>
				)}
			</VideoWrapper>
			{props.expanded && (
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
			)}
		</>
	);
};

export default NimbusVideo;
