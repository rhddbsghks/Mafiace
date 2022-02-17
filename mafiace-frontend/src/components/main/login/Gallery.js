import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./gallery.css";

const Gallery = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <div style={{ position: "absolute", top: "30%", left: "5%", width: "45%" }}>
      <Slider {...settings}>
        <div className="gallery-border">
          <img src="img/gallery/slide1.png" alt="" width="100%" />
        </div>
        <div className="gallery-border">
          <img src="img/gallery/slide2.png" alt="" width="100%" />
        </div>
        <div className="gallery-border">
          <img src="img/gallery/slide3.png" alt="" width="100%" />
        </div>
        <div className="gallery-border">
          <img src="img/gallery/slide4.png" alt="" width="100%" />
        </div>
        <div className="gallery-border">
          <img src="img/gallery/slide5.png" alt="" width="100%" />
        </div>
      </Slider>
    </div>
  );
};

export default Gallery;
