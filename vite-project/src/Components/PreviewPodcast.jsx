import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import RestButton from "./RestButton";
function PreviewPodcast({ onPodcastClick }) {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(""); // Track the selected genre option
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleShowSearchOptions = () => {
    setShowSearchOptions(!showSearchOptions);
  };

  const handleShowSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const CardStyles = {
    cardImage: {
      width: "60%",
      borderRadius: "9px",
      marginBottom: "9px",
      marginLeft: "9px",
   
    },

    Paper: {
      width: "350px",
      height: "100%",
      fontsize: "12px",
      flex: "0 0 auto",
      display: "flex",
      flexDirection: "column",
       padding: "15px",
      backgroundImage:"url(https://resources.rawpixel.com/image_transparent_png_450/cmF3cGl4ZWwtZGVzaWduLXByb2Q6OmRlc2lnbi9wcmV2aWV3L3Jhd3BpeGVsLzAxZ2s2dHJtYnpuZ3kxY3AwbnhndHowYW41LWhvdmVyLWRlZmF1bHQucG5n.png?v=1698118798)",
    },

    genreForm: {
      color: "white",
      backgroundColor: "#841e62",
      border: "none",
      cursor: "pointer",
      padding: "5px",

      margin: "5px",
      borderRadius: "5px",
      marginLeft: "5%",
    },

    removeButton: {
      color: "white",
      backgroundColor: "#841e62",
      border: "none",
      cursor: "pointer",
      padding: "5px",

      margin: "5px",
      borderRadius: "5px",
      marginLeft: "5%",
    },

    SearchButton: {
      color: "white",
      backgroundColor: "#841e62",
      border: "none",
      cursor: "pointer",
      padding: "5px",

      margin: "5px",
      borderRadius: "5px",
      marginLeft: "10%",
    },

    titleSearch: {
      color: "white",
      backgroundColor: "#841e62",
      border: "none",
      cursor: "pointer",
      padding: "5px",

      margin: "5px",
      borderRadius: "5px",
      marginLeft: "5%",
    },

    sortButton: {
      color: "white",

      backgroundColor: "#841e62",
      border: "none",
      cursor: "pointer",
      padding: "5px",
      margin: "5px",
      borderRadius: "5px",
      marginLeft: "5%",
    },
    podcastTitle: {
      color: "#2a445e",
      fontFamily: "cursive",
      marginLeft: "5%",
    },
  };

  const genreMap = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids & Family",
  };

  useEffect(() => {
    // Fetch data from the API
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data); // Check if you're receiving the expected data
        setPodcasts(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // Function to handle clicking on a podcast
  const handlePodcastClick = (podcastId, genre) => {
    console.log(`Clicked on podcast with ID: ${podcastId}`);
    // Add your logic here to handle the click event
    // For example, you can open a modal or navigate to a specific podcast page.
    onPodcastClick(podcastId, genre);
  };

  useEffect(() => {
    if (sortOption === "A-Z") {
      setPodcasts([...podcasts.sort((a, b) => a.title.localeCompare(b.title))]);
    } else if (sortOption === "Z-A") {
      setPodcasts([...podcasts.sort((a, b) => b.title.localeCompare(a.title))]);
    } else if (sortOption === "Oldest") {
      setPodcasts([
        ...podcasts.sort((a, b) => new Date(a.updated) - new Date(b.updated)),
      ]);
    } else if (sortOption === "Newest") {
      setPodcasts([
        ...podcasts.sort((a, b) => new Date(b.updated) - new Date(a.updated)),
      ]);
    }
  }, [sortOption, podcasts]);

  // Function to handle filtering based on the search query and genre when the search button is clicked
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "" || selectedGenre !== "") {
      const filteredPodcasts = podcasts.filter((podcast) => {
        const matchesSearchQuery =
          searchQuery.trim() === "" ||
          podcast.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre =
          selectedGenre === "" ||
          (podcast.genres && podcast.genres.includes(parseInt(selectedGenre)));
        return matchesSearchQuery && matchesGenre;
      });
      setPodcasts(filteredPodcasts);
    }
  };

  if (loading) {
    return <div className="loadingState">Loading...</div>;
  }

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <div className="Paper" style={CardStyles.Paper}>
        <form className="form">
          <div>
            <input
              type="text"
              className="titleSearch"
              placeholder="Search by title..."
              value={searchQuery}
              style={CardStyles.titleSearch}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
          </div>
          <button
          className="SearchButton"
          style={CardStyles.SearchButton}
          onClick={handleSearch}
        >
          Search
        </button>
          <div>
            <select
              className="genreForm"
              style={CardStyles.genreForm}
              onChange={(e) => setSelectedGenre(e.target.value)}
              value={selectedGenre}
            >
              <option value="">All Genres</option>
              {Object.entries(genreMap).map(([genreId, genreName]) => (
                <option key={genreId} value={genreId}>
                  {genreName}
                </option>
              ))}
            </select>
          </div>
        </form>

       
        <div>
          <select
            className="sortButton"
            style={CardStyles.sortButton}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Oldest">Oldest</option>
            <option value="Newest">Newest</option>
          </select>
        </div>

        <button
          onClick={() => removeFromFavorites(episode.id)}
          className="removeButton"
          style={CardStyles.removeButton}
        >
          Remove from Favorites
        </button>


        <RestButton/>
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="podcastImage"
            onClick={() => onPodcastClick(podcast.id, podcast.genres)}
          >
            <div className="imgDiv">
              <img
                src={podcast.image}
                className="cardImage"
                style={CardStyles.cardImage}
                alt="podcastimage"
              />
            </div>

            <div className="podcastTitle" style={CardStyles.podcastTitle}>
              <h4>{podcast.title}</h4>
              <p>Season: {podcast.seasons}</p>
              <p>
                Genre:{" "}
                {podcast.genres && podcast.genres.length > 0
                  ? podcast.genres
                      .map((genreId) => genreMap[genreId])
                      .join(", ")
                  : "N/A"}
              </p>
              <p>
                Updated:{" "}
                {new Date(podcast.updated).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Grid>
  );
}

export default PreviewPodcast;
