import { useEffect, useState } from "@wordpress/element";
import Box from "@mui/material/Box";
import { Navigation, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BigImgDialog from "./BigImgDialog";
import FichaObra from "./FichaObra";

const StyledSlideContent = styled("div")`
	text-align: center;
	img {
		max-height: 50vh;
		width: auto;
		max-width: 100%;
		height: auto;
	}
	p {
		text-align: left;
	}
`;

const ImageContainer = styled("div")`
	background-color: #0a0a1f;
	line-height: 0.2;
`;

const SliderTitle = styled("div")`
	position: absolute;
	top: 24px;
	left: 24px;
	color: white;
	opacity: 0.8;
	text-shadow: 0 0 4px #333;
	z-index: 10;
	font-family: "Bebas Neue", sans-serif;
	font-size: 32px;
`;

const SwiperNavigation = styled("div")`
	.swiperNext,
	.swiperPrev {
		position: absolute;
		top: 25vh;
		font-size: 36px;
		color: white;
		filter: drop-shadow(0 1px 4px rgb(0 0 0 / 0.4));
		z-index: 10;
		transition: opacity linear 0.4s;
	}
	.swiperNext {
		right: 12px;
	}
	.swiperPrev {
		left: 12px;
	}
	.swiper-button-disabled {
		opacity: 0;
	}
`;

const WorksSlider = (props) => {
	const theme = useTheme();
	const [bigImg, setBigImg] = useState({});
	const handleClose = () => {
		setBigImg({});
	};

	return (
		<Box sx={{ position: "relative" }}>
			<SliderTitle>{props.title}</SliderTitle>
			<Swiper
				slidesPerView={1}
				modules={[Navigation]}
				onSlideChange={() => console.log("slide change")}
				onSwiper={(swiper) => console.log(swiper)}
				navigation={{
					nextEl: ".swiperNext",
					prevEl: ".swiperPrev",
				}}
			>
				{props.works &&
					props.works.map((work) => (
						<SwiperSlide>
							<StyledSlideContent>
								<ImageContainer>
									<img
										onClick={() => setBigImg(work)}
										src={
											work.images.sizes.large
												? work.images.sizes.large.url
												: work.images.full_url
										}
									/>
								</ImageContainer>
								<FichaObra work={work} theme={theme} />
							</StyledSlideContent>
						</SwiperSlide>
					))}
				<SwiperNavigation>
					<FontAwesomeIcon
						className="swiperNext"
						icon="chevron-circle-right"
					/>
					<FontAwesomeIcon
						className="swiperPrev"
						icon="chevron-circle-left"
					/>
				</SwiperNavigation>
				{bigImg.images && (
					<BigImgDialog
						artist={props.artist}
						slug={props.artistSlug}
						handleClose={handleClose}
						work={bigImg}
						theme={theme}
					/>
				)}
			</Swiper>
		</Box>
	);
};

export default WorksSlider;
