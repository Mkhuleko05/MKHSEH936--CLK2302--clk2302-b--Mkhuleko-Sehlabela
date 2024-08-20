import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({data}) => {
    const settings = {
        dots:true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    };

    const imageStyle ={
        maxwWidth: "100%",
        height: "400px",
        padding: "80px",
        
    };

    return(
        <div>
            <h1 className="trending">Hottest Podcasts Right Now</h1>
        <Slider {...settings}>
            {data.map((item) => (
                <div key={item.id}>
                    <img className="carousel--image" src={item.image} alt="" style={imageStyle}/>
                    <h3 className="carousel--title">{item.title}</h3>
                 </div>
            ))}
        </Slider>
        </div>
    );
};

export default Carousel;