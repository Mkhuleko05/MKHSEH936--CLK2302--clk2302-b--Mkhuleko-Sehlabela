import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselComponent = () => {
  const [content, setContent] = useState([]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      itemClass: "carousel-item-desktop",
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      itemClass: "carousel-item-tablet",
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      itemClass: "carousel-item-mobile",
    },
  };

  const PreviewCardStyles = {
    Paper: {
      fontSize: "18px",
      width: "250px",
      margin: "auto 1rem",

      fontFamily: "arial",
      borderRadius: "1rem",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
      paddingBottom: "0em",
      backgroundColor: "Transparent",
      justifyContent: "spaceBetween",
      padding: "0.5em",
    },

    cardImage: {
      width: "90%",
      height: "80%",
      borderRadius: "9px",
      marginBottom: "9px",
      marginLeft: "9px",
    },

    cardTitle: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "20px",
    },

    cardStats: {
      display: "flex",
      alignItems: "center",
    },

    Carousel: {
      backgroundImage:
        "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyoAJMExJ7RTCIk9RUxDtr39iteqURmiLqdQmfnFSHyl5qnmfs5VfCjgys0Xoj7YSBr1g&usqp=CAU)",

      backgroundSize: "cover",
      backgroundPosition: "center",
      marginBottom: "50px",
      width: "100%",
      height: "100%",
      borderRadius: "5px",
      marginTop: "10px",
    },
  };

  const genreList = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        const updatedShows = data.map((shows) => {
          const updatedGenres = shows.genres.map(
            (genreId) => genreList[genreId]
          );
          return {
            ...shows,
            genres: updatedGenres,
          };
        });

        setContent(updatedShows);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const genreNames = content.map((contentItem) =>
    contentItem.genres.map((genreNumber) => genreList[genreNumber])
  );

  return (
    <div className="Carousel" style={PreviewCardStyles.Carousel}>
      <Carousel
        responsive={responsive}
        className="Carousel"
        style={PreviewCardStyles.Carousel}
      >
        {content.map((contentItem) => (
          <Paper
            key={contentItem.id}
            className="Paper"
            style={PreviewCardStyles.Paper}
          >
            <div className="card" style={PreviewCardStyles.card}>
              <div>
                <img
                  src={contentItem.image}
                  className="cardImage"
                  style={PreviewCardStyles.cardImage}
                />
                <p className="cardTitle" style={PreviewCardStyles.cardTitle}>
                  {contentItem.title}
                </p>
                <div className="cardSeason">Season: {contentItem.seasons}</div>
                <p>
                  Updated:{" "}
                  {new Date(contentItem.updated).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                {/* Display genres by name */}
                {contentItem.genres.map((genreName, genreIndex) => (
                  <p
                    key={genreIndex}
                    className="tabText"
                    style={PreviewCardStyles.tabText}
                  >
                    {genreName}
                  </p>
                ))}
              </div>
            </div>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
