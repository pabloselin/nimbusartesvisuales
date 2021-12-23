import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NimbusVideo from "./modules/NimbusVideo";
import Loading from "./components/Loading";
import FullWidthTitle from "./components/FullWidthTitle";

const Serie = (props) => {
	const theme = useTheme();
	const [video, setVideo] = useState([{ data: null }]);
	const { videoSlug } = useParams();

	useEffect(() => {
		async function getVideo(videoSlug) {
			let fetchroute = "/nimbus/v1/videosingle/?slug=" + videoSlug;
			apiFetch({ path: fetchroute }).then((result) => {
				setVideo({ data: result });
			});
		}
		if (videoSlug !== undefined) {
			getVideo(videoSlug);
		}
	}, [videoSlug]);

	return (
		<>
			{video.data !== undefined ? (
				<>
					<FullWidthTitle variant="h1">
						{video.data.name}
					</FullWidthTitle>
					<NimbusVideo expanded video={video.data} />
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Serie;
