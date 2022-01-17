import YouTube from "react-youtube";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "@wordpress/element";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const getVideoImg = (videoId) => {
	if (videoId) {
		return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	}
};

const NimbusVideo = (props) => {
	const theme = useTheme();
	const [activeVideo, setActiveVideo] = useState(false);

	const StyledThumb = styled("div")`
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		img {
			max-width: 100%;
			height: auto;
		}

		svg {
			position: absolute;
			color: white;
			font-size: 120px;
			transition: all ease-in 0.5s;
		}

		&:hover {
			svg {
				color: ${theme.palette.primary.main};
			}
		}
	`;

	const NimbusThumb = (props) => (
		<StyledThumb theme={theme} onClick={props.onClick}>
			<FontAwesomeIcon icon={["fas", "play-circle"]} size="xl" />
			<img src={getVideoImg(props.videoid)} />
		</StyledThumb>
	);

	return (
		<>
			{props.expanded || activeVideo ? (
				<VideoWrapper>
					<StyledYouTube videoId={props.video.video_id} />
				</VideoWrapper>
			) : (
				<>
					{props.togglable ? (
						<NimbusThumb
							onClick={() => setActiveVideo(true)}
							videoid={props.video.video_id}
						/>
					) : (
						<RouterLink to={`/serie/${props.video.slug}`}>
							<NimbusThumb />
						</RouterLink>
					)}
				</>
			)}

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
