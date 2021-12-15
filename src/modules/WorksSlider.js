import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper-bundle.css";
import styled from "styled-components";

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

const WorksSlider = (props) => {
	return (
		<Swiper
			slidesPerView={1}
			modules={[Navigation, Pagination]}
			onSlideChange={() => console.log("slide change")}
			onSwiper={(swiper) => console.log(swiper)}
			navigation
			pagination={{ clickable: true }}
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
		</Swiper>
	);
};

export default WorksSlider;
