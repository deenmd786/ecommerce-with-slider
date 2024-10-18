// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "./Carousel.css";

// Import images
import slide1 from "../assets/Slider/pexels-dagmara-dombrovska-22732579-11986432.jpg";
import slide2 from "../assets/Slider/pexels-funda-izgi-236637469-13334689.jpg";
import slide3 from "../assets/Slider/pexels-koolshooters-6982481.jpg";
import slide4 from "../assets/Slider/pexels-ricardo-oliveira-317251078-27219297.jpg";

const slides = [
  { id: 1, image: slide1, caption: "Slide 1" },
  { id: 2, image: slide2, caption: "Slide 2" },
  { id: 3, image: slide3, caption: "Slide 3" },
  { id: 4, image: slide4, caption: "Slide 4" },
];

const Carousel = () => {
  const [backgroundImage, setBackgroundImage] = useState(slides[0].image);

  const handleSlideChange = (swiper) => {
    // Update the background image based on the active slide index
    setBackgroundImage(slides[swiper.activeIndex].image);
  };

  return (
    <div
      className="carousel"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10} // Adjust space between slides for a smoother look
        slidesPerView={2} // Show partial slides
        centeredSlides={true} // Center the active slide
        onSlideChange={handleSlideChange}
        autoplay={{
          delay: 3000, // Auto slide every 3 seconds
          disableOnInteraction: false, // Allow interaction without disabling autoplay
        }}
        speed={700} // Duration of transition (in ms)
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.image}
              alt={slide.caption}
              className="swiper-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
