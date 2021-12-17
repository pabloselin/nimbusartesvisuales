import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledSlideContent = styled.div`
	text-align: center;
	img {
		max-height: 50vh;
		width: auto;
	}
	p {
		text-align: left;
	}
`;

const ImageContainer = styled.div`
	padding: 6px;
`;

const SwiperNavigation = styled.div`
	.swiperNext,
	.swiperPrev {
		position: absolute;
		top: 25vh;
		font-size: 36px;
		color: #555;
		text-shadow: 0 0 4px #333;
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
	return (
		<Swiper
			slidesPerView={1}
			modules={[Navigation, Pagination]}
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
									src={
										work.images.sizes.large
											? work.images.sizes.large.url
											: work.images.full_url
									}
								/>
							</ImageContainer>
							<p>
								<strong>{work.images.title}</strong>
								<br />
								{work.technique}
								<br />
								{work.measures}
								<br />
								{work.year}
							</p>
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
		</Swiper>
	);
};

export default WorksSlider;
