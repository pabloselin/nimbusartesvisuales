import { useEffect, useState } from "@wordpress/element";
import { Navigation, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "@mui/material/Box";
import "swiper/css";
import "swiper/css/navigation";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import alphabet from "../components/alphabet";

const SwiperNavigation = styled("div")`
	.swiperNext,
	.swiperPrev {
		position: absolute;
		top: 0;
		font-size: 24px;
		z-index: 10;
		transition: opacity linear 0.4s;
		cursor: pointer;
		background-color: white;
	}
	.swiperNext {
		right: 2px;
	}
	.swiperPrev {
		left: 2px;
	}
	.swiper-button-disabled {
		opacity: 0;
	}
`;

const StyledSwiper = styled(Swiper)`
	padding: 0 24px;
`;

const LetterSlider = (props) => {
	const theme = useTheme();
	const [emptyLetters, setEmptyLetters] = useState([{ empties: null }]);
	useEffect(() => {
		const checkEmptyLetters = () => {
			let empties = [];
			alphabet.map((letter) => {
				let hasArtist = props.artists.filter((artist) =>
					artist.lastname.toUpperCase().startsWith(letter)
				);
				if (hasArtist.length === 0) {
					empties.push(letter);
				}
			});
			setEmptyLetters({ empties: empties });
		};
		checkEmptyLetters();
	}, []);

	return (
		<Box
			sx={{
				padding: "6px",
				margin: "12px 24px 12px 24px",
				backgroundColor: "white",
				borderRadius: "20px",
				color: theme.palette.secondary.main,
				border: `1px solid ${theme.palette.secondary.main}`,
			}}
		>
			<StyledSwiper
				slidesPerView={6}
				modules={[Navigation]}
				navigation={{
					nextEl: ".swiperNext",
					prevEl: ".swiperPrev",
				}}
			>
				<SwiperSlide onClick={() => props.setLetter("all")}>
					<Typography
						sx={{
							textAlign: "center",
							cursor: "pointer",
							borderRadius: "20px",
							lineHeight: "24px",
							verticalAlign: "middle",
							height: "24px",
							fontFamily: theme.typography.headingsFont,
							color:
								props.activeLetter === "all"
									? "white"
									: theme.palette.secondary.main,
							fontSize: "20px",

							backgroundColor:
								props.activeLetter === "all"
									? theme.palette.primary.main
									: "white",
						}}
					>
						Todos
					</Typography>
				</SwiperSlide>
				{alphabet.map((letter) => (
					<>
						{emptyLetters.empties &&
						emptyLetters.empties.find(
							(idxletter) => idxletter === letter
						) ? (
							<SwiperSlide>
								<Typography
									sx={{
										width: "24px",
										height: "24px",
										lineHeight: "24px",
										verticalAlign: "middle",
										textAlign: "center",
										cursor: "pointer",
										borderRadius: "20px",
										fontFamily:
											theme.typography.headingsFont,
										color: "#ccc",
										fontSize: "20px",
										backgroundColor: "white",
									}}
								>
									{letter}
								</Typography>
							</SwiperSlide>
						) : (
							<SwiperSlide
								onClick={() => props.setLetter(letter)}
							>
								<Typography
									sx={{
										width: "24px",
										height: "24px",
										lineHeight: "24px",
										verticalAlign: "middle",
										textAlign: "center",
										cursor: "pointer",
										borderRadius: "20px",
										fontFamily:
											theme.typography.headingsFont,
										color:
											props.activeLetter === letter
												? "white"
												: theme.palette.secondary.main,
										fontSize: "20px",
										backgroundColor:
											props.activeLetter === letter
												? theme.palette.primary.main
												: "white",
									}}
								>
									{letter}
								</Typography>
							</SwiperSlide>
						)}
					</>
				))}
				<SwiperNavigation>
					<FontAwesomeIcon
						className="swiperNext"
						icon="chevron-right"
					/>
					<FontAwesomeIcon
						className="swiperPrev"
						icon="chevron-left"
					/>
				</SwiperNavigation>
			</StyledSwiper>
		</Box>
	);
};

export default LetterSlider;
