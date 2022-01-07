import apiFetch from "@wordpress/api-fetch";
import FullWidthTitle from "./components/FullWidthTitle";
import SectionTitle from "./components/SectionTitle";
import { useState, useEffect } from "@wordpress/element";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import Loading from "./components/Loading";
import NimbusVideo from "./modules/NimbusVideo";

const Series = (props) => {
	//fetch series
	const [content, setContent] = useState([{ artists: null }]);
	const theme = useTheme();
	const { videoSlug } = useParams();
	console.log(videoSlug);
	const fetchroute =
		videoSlug !== undefined
			? "nimbus/v1/videosingle/?slug=" + videoSlug
			: "nimbus/v1/videos";

	console.log(fetchroute);

	const StyledRouterLink = styled(RouterLink)(({ theme }) => ({
		textDecoration: "none",
		color: theme.palette.primary.main,
	}));

	useEffect(() => {
		async function getContent() {
			apiFetch({ path: fetchroute }).then((result) => {
				setContent({
					videos: result,
				});
			});
		}
		getContent();
	}, [videoSlug]);

	return (
		<>
			{content.videos && content.videos.length ? (
				<>
					<SectionTitle>Serie documental</SectionTitle>
					{content.videos.map((video) => (
						<>
							<FullWidthTitle variant="h2">
								<StyledRouterLink to={`/serie/${video.slug}`}>
									Capítulo {video.chapter_number}:{" "}
									{video.name}
								</StyledRouterLink>
							</FullWidthTitle>
							<NimbusVideo video={video} />
						</>
					))}
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Series;
