
'import "React", { useEffect, useState } from "react";'
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import axios from "axios";
import "./Hero.css";

// Hero Component
export default function Hero() {
  // State for storing shows data and carousel position
  // eslint-disable-next-line no-undef
  const [shows, setShows] = useState([]);
  const [carouselPosition, setCarouselPosition] = 'useState([0])';

  // Constants for carousel settings
  const slideWidth = 200;
  const slidesToShow = 5;
  const containerWidth = slideWidth * shows.length;

  // Fetch show data from the API
  'useEffect'(() => {
    axios
      .get("https://podcast-api.netlify.app/shows")
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to move the carousel
  const moveCarousel = (steps) => {
    const newPosition = carouselPosition + steps * slideWidth;
    setCarouselPosition(
      Math.max(
        -(containerWidth - slideWidth * slidesToShow),
        Math.min(0, newPosition)
      )
    );
  };

  // Interval variable for continuous scroll
  let interval;

  // Handle mouse down for continuous scroll
  const handleMouseDown = (steps) => {
    clearInterval(interval);
    interval = setInterval(() => moveCarousel(steps), 100);
  };

  // Handle mouse up to stop scroll
  const handleMouseUp = () => {
    clearInterval(interval);
  };

  return (
    <div className="hero-section">
      <div className="carousel-container">
        <div
          className="show-info"
          style={{
            transform: `translateX(${carouselPosition}px)`,
            width: `${containerWidth}px`,
          }}
        >
          {shows.map((show) => (
            <div key={show.id} className="carousel-slide">
              <img src={show.image} alt={show.name} width={slideWidth} />
              <h1>{show.name}</h1>
            </div>
          ))}
        </div>
      </div>
      <ArrowBackIosNewOutlinedIcon
        className="arrow-icon backward"
        onMouseDown={() => handleMouseDown(1)}
        onMouseUp={handleMouseUp}
      />
      <ArrowForwardIosOutlinedIcon
        className="arrow-icon forward"
        onMouseDown={() => handleMouseDown(-1)}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}