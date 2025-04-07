import { useEffect, useState } from "react";
import image1 from "../assets/banner/img1.webp";
import image1Mob from "../assets/banner/img1_mobile.jpg";
import image2 from "../assets/banner/img2.webp";
import image2Mob from "../assets/banner/img2_mobile.webp";
import image3 from "../assets/banner/img3.jpg";
import image3Mob from "../assets/banner/img3_mobile.jpg";
import image4 from "../assets/banner/img4.jpg";
import image4Mob from "../assets/banner/img4_mobile.jpg";
import image5 from "../assets/banner/img5.webp";
import image5Mob from "../assets/banner/img5_mobile.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function BannerSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [image1Mob, image2Mob, image3Mob, image4Mob, image5Mob];

  const totalImages = desktopImages.length;

  const loopImageFunc = () => {
    return setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % totalImages);
    }, 5000);
  };

  useEffect(() => {
    const intervalId = loopImageFunc();
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
    return clearInterval(loopImageFunc)
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
    return clearInterval(loopImageFunc)
  };

  return (
    <div className="container mx-auto px-4">
      <div className="h-48 md:h-72 w-full bg-slate-200 overflow-hidden rounded relative">
        <div className="absolute inset-0 flex justify-between items-center text-2xl text-white z-10" 
          onClick={(e) => {
            const { clientX } = e; // Get the x position of the click
            const { clientWidth } = e.currentTarget; // Get the width of the banner
            if (clientX < clientWidth / 2) {
              handlePrev(); // Clicked on the left side
            } else {
              handleNext(); // Clicked on the right side
            }
          }}
        >
          <button onClick={handlePrev} className="hidden md:block p-4">
            <FaChevronLeft />
          </button>
          <button onClick={handleNext} className="hidden md:block p-4">
            <FaChevronRight />
          </button>
        </div>

        <div className="hidden md:flex h-full w-full transition-transform duration-500" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
          {desktopImages.map((img, index) => (
            <div key={"banner img" + index} className="min-w-full min-h-full">
              <img src={img} alt={"banner img" + (index + 1)} className="w-full h-full" />
            </div>
          ))}
        </div>

        <div className="flex md:hidden h-full w-full transition-transform duration-500" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
          {mobileImages.map((img, index) => (
            <div key={"banner img" + index} className="min-w-full min-h-full">
              <img src={img} alt={"banner img" + (index + 1)} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannerSlider;