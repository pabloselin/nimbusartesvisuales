import { useEffect, useState } from "@wordpress/element";
import Box from "@mui/material/Box";
import { Navigation, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMediaQuery from "@mui/material/useMediaQuery";
import BigImgDialog from "./BigImgDialog";
import FichaObra from "./FichaObra";

const StyledSlideContent = styled("div")`
	text-align: center;
	img {
		max-height: 50vh;
		width: auto;
		max-width: 100%;
		height: auto;
		&.square {
			max-height: 392px;
			height: 392px;
			width: 392px;
		}
	}
	p {
		text-align: left;
	}
`;

const SliderTitle = styled("div")`
	display: none;
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
	&.square {
		.swiperNext,
		.swiperPrev {
			top: 200px;
		}
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

const StyledLink = styled(Link)`
	color: white;
`;

const WorksSlider = (props) => {
	const theme = useTheme();
	const [bigImg, setBigImg] = useState({});
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [slide, setSlide] = useState(0);

	const ImageContainer = styled("div")`
		background-color: ${props.full ? "#1A1A1A" : "white"};
		line-height: 0.2;
		position: relative;

		.artistOverlay {
			display: flex;
			cursor: pointer;
			flex-direction: column;
			opacity: 0;
			transition: all linear 0.3s;
			position: absolute;
			top: 0;
			left: 0;
			color: white;
			width: 100%;
			height: 100%;
			align-items: center;
			text-align: center;
			background-color: rgba(51, 51, 153, 0.6);
			justify-content: center;
			font-family: "Bebas Neue", sans-serif;
			h2 {
				font-size: 32px;
				margin-bottom: 24px;
			}
		}

		&:hover {
			.artistOverlay {
				opacity: 1;
			}
		}
	`;

	const handleClose = () => {
		setBigImg({});
	};

	const imageSize = (work) => {
		let size;
		if (props.square) {
			size = work.images.sizes.thumbnail.url;
		} else if (work.images.sizes.large) {
			size = work.images.sizes.large.url;
		} else {
			size = work.images.full_url;
		}
		return size;
	};

	return (
		<Box sx={{ position: "relative" }}>
			<SliderTitle>{props.title}</SliderTitle>
			<Swiper
				initialSlide={props.initialSlide ? props.initialSlide : 0}
				slidesPerView={props.front && !isMobile ? 3 : 1}
				modules={[Navigation]}
				onSlideChange={(swiper) => setSlide(swiper.activeIndex)}
				onSwiper={(swiper) => console.log(swiper)}
				navigation={{
					nextEl: ".swiperNext",
					prevEl: ".swiperPrev",
				}}
				spaceBetween={12}
			>
				{props.works &&
					props.works.map((work) => (
						<SwiperSlide>
							<StyledSlideContent>
								<ImageContainer>
									{props.front && (
										<div
											onClick={() => setBigImg(work)}
											className="artistOverlay"
										>
											<Typography variant="h2">
												{work.artist}
											</Typography>
											<FontAwesomeIcon
												icon={["fas", "eye"]}
												size="lg"
											/>
										</div>
									)}
									<img
										className={
											props.square ? "square" : "normal"
										}
										onClick={() =>
											!props.full && setBigImg(work)
										}
										src={imageSize(work)}
									/>
									{props.full && (
										<>
											<Box
												sx={{
													borderTop: `1px solid ${theme.palette.secondary.lighter}`,
													borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
													pt: 1,
													pl: 2,
													pr: 2,
													pb: 1,
												}}
											>
												<Typography
													variant="h2"
													sx={{
														fontSize: "28px",
														textDecoration:
															"underline",
														color: "white",
														textAlign: "left",
													}}
												>
													{work.slug ? (
														<StyledLink
															to={`/artistas/${work.slug}`}
														>
															{work.artist}{" "}
														</StyledLink>
													) : (
														<>{work.artist} </>
													)}
												</Typography>
											</Box>
											<Box sx={{ p: 2 }}>
												<FichaObra
													nopad
													dark
													theme={theme}
													work={work}
												/>
											</Box>
										</>
									)}
								</ImageContainer>
							</StyledSlideContent>
						</SwiperSlide>
					))}
				<SwiperNavigation
					className={props.square ? "square" : "normal"}
				>
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
						handleClose={handleClose}
						work={bigImg}
						theme={theme}
						artist={props.artist}
						artistSlug={props.artistSlug}
						activeSlide={slide}
						works={props.works}
					/>
				)}
			</Swiper>
		</Box>
	);
};

export default WorksSlider;
