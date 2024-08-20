import { useState, useEffect } from "react";

import CarouselComponent from "../Components/CarouselComponent";
import DisplayCard from "../Components/DisplayCard";
import PodcastFaves from "../Components/PodcastFaves";
import LogInOutContainer from "../Components/LogIns/LogInOutContainer";

function App() {
  const BodyStyles = {
    Body: {
      paddingLeft: "40px",
      height: "100%",
      width: "100%",
    },

    Text: {
      paddingLeft: "40px",
      height: "100%",
      width: "100%",
      color: "white",
      fontSize: "25px",
    },

    Heading: {
      color: "#841e62",
      fontSize: "55px",
      fontFamily: "Times New Roman (serif)",
      paddingLeft: "40px",
      marginTop: "200px",
    },

    BodyArt: {
      color: "#841e62",
      fontSize: "55px",
      fontFamily: "Times New Roman (serif)",
      paddingLeft: "40px",
      display: "flex",
      background: "pink",
      backgroundImage:
        "url(https://us.123rf.com/450wm/nanastudio/nanastudio1903/nanastudio190301015/119463669-headphones-on-dark-wooden-background-vintage-style.jpg?ver=6)",
      backgroundSize: "cover",
      height: "500px",
    },
    BodyImg: {
      width: "50%",
      height: "50%",
    },
  };

  // Lift state up from PodcastApp
  const [content, setContent] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null); //For the selected PodcastShow to display the episodes
  const [showData, setShowData] = useState({});
  const [episodes, setEpisodes] = useState([]);

  const [file, setFile] = useState(content); //the Audio file
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]); // Building the list in teh drawer
  const [selectedGenre, setSelectedGenre] = useState(1);
  const [filteredGenres, setFilteredGenres] = useState(content);

  useEffect(() => {
    setLoading(true);
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        const initialState = data.map((showData) => ({
          ...showData,
          isFavorite: false, // Add the isFavorite property to each showData object
        }));
        setContent(initialState);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("Oops something went wrong while fetching data");
      });
  }, []);

  useEffect(() => {
    setLoading(true), [];

    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        setShowData(data);
        setTitles(data.map((shows) => shows.title)), setLoading(false);
      })

      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("Oops something went wrong while fetching data");
      });
  }, []);

  const fetchContent = () => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setContent(data));
  };

  const fetchShow = (id) => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((response) => response.json())
      .then((data) => setShowData(data));
  };

  const fetchEpisodes = (id) => {
    fetch(`https://podcast-api.netlify.app/id/${id}/episodes`)
      .then((response) => response.json())
      .then((data) => setEpisodes(data));
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (selectedShowId) {
      fetchShow(selectedShowId);
    }
  }, [selectedShowId]);

  const ascendingOrder = () => {
    setTitles(titles.slice().sort((a, b) => a.localeCompare(b)));
  };

  const descendingOrder = () => {
    setTitles(titles.slice().sort((a, b) => b.localeCompare(a)));
  };

  const handleShowButtonClick = (id) => {
    setSelectedShowId(id);
  };

  const handleShowMore = () => {
    setShowCount((prevCount) => prevCount + 20);
  };

  const handleSelectGenre = (genreValue) => {
    setSelectedGenre(genreValue);
    const filteredShows = content.filter((show) =>
      show.genres.includes(genreValue)
    );
    setFilteredGenres(filteredShows);
  };

  function getGenreName(genreId) {
    return genreId[genreId];
  }

  {
    /*Switches the heart on and off*/
  }
  function handleToggleFavorite(id) {
    const showIndex = content.findIndex((showData) => showData.id === id);
    if (showIndex !== -1) {
      const updatedContent = [...content];
      updatedContent[showIndex] = {
        ...updatedContent[showIndex],
        isFavorite: !updatedContent[showIndex].isFavorite,
      };
      setContent(updatedContent);

      const updatedFavoriteList = updatedContent
        .filter((showData) => showData.isFavorite)
        .map((showData) => showData.id);
      setFavoriteList(updatedFavoriteList);
      setIsFavorite(updatedContent.filter((showData) => showData.isFavorite));
    }
  }
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

  return (
    <div className="Body" style={BodyStyles.Body}>
      <div className="BodyArt" style={BodyStyles.BodyArt}>
        <div>
          <h1 className="Heading" style={BodyStyles.Heading}>
            FRESHERS ENTERTAINMENT PODCAST
          </h1>
          <div className="Text" style={BodyStyles.Text}>
            {" "}
            <p> Be entertained on what we provide, Stay tuned. </p>
          </div>
        </div>
      </div>

      <CarouselComponent />

      <PodcastFaves favoriteList={favoriteList} isFavorite={isFavorite} />

      <DisplayCard
        selectedShowId={selectedShowId}
        showData={showData}
        loading={loading}
        error={error}
        content={content}
        genreList={genreList}
        favoriteList={favoriteList}
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavorite}
        handleShowButtonClick={handleShowButtonClick}
        filteredGenres={filteredGenres}
      />

      {/*
     <LogInOutContainer/>
        
      */}
    </div>
  );
}

export default App;
{
  /*SupabASE vGuCeJ834cvKM0bb*/
}
