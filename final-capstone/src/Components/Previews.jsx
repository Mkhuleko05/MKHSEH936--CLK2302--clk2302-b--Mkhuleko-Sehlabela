import React, { useEffect, useState, Fragment } from 'react';
import Fuse from 'fuse.js';
import axios from 'axios';


// state variables
const Preview = () => {
  const [previewData, setPreviewData] = useState([]);
  const [showData, setShowData] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [loadingShow, setLoadingShow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [filteredPreviews, setFilteredPreviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // New state variable for filtered data
  const [descriptionVisible, setDescriptionVisible] = useState(false); // State for description visibility
//Genre titles
  const genreTitleMapping = {
    1: 'Personal Growth',
    2: 'True Crime and Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };
//fetched the shows
  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setPreviewData(data);
        setLoadingPreview(false);
      })
      .catch((error) => console.error('Error fetching previews:', error));
  }, []);
//fetched the showID
  const fetchShowDetails = async (showId) => {
    try {
      setLoadingShow(true);
      const response = await axios.get(`https://podcast-api.netlify.app/id/${showId}`);
      const data = response.data;
      setShowData(data);
      setSelectedSeason(null);
      setLoadingShow(false);
    } catch (error) {
      console.error('Error fetching show details:', error);
      setLoadingShow(false);
    }
  };
//BELOW shows the show details
  const handleShowClick = (showId) => {
    fetchShowDetails(showId);
  };
//season numbers
  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };
//sort by and select different genres
  useEffect(() => {
    filterPreviews();
  }, [searchQuery, sortBy, previewData, selectedGenre]); // Update dependencies

  const filterPreviews = () => {
    let filteredPreviews = [...previewData];

    // Filter by title
    if (searchQuery) {
      const fuse = new Fuse(filteredPreviews, { keys: ['title'] });
      filteredPreviews = fuse.search(searchQuery).map((result) => result.item);
    }

    // Filter by genre (assuming you have selectedGenre as a state variable)
    if (selectedGenre) {
      filteredPreviews = filteredPreviews.filter((preview) =>
        preview.genres.includes(parseInt(selectedGenre))
      );
    }
   
    // Sort the previews based on sortBy
    if (sortBy === 'title') {
      filteredPreviews.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-az') {
      filteredPreviews.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'seasons') {
      filteredPreviews.sort((a, b) => a.seasons - b.seasons);
    } else if (sortBy === 'date') {
      filteredPreviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredPreviews(filteredPreviews);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
//the loading state
//The component conditionally renders different views based on the loadingPreview, loadingShow, and showData states.
//While the previews are loading, it displays "Loading...".
//If showData is null, it renders the list of filtered podcast show previews along with search input, genre filter, and sort options.
//If showData is not null, it displays the details of the selected show, including its seasons and episodes.
  if (loadingPreview) {
    return <div>Loading...</div>;
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!showData) {
    return (
      <div className="podcast-data-container">
        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title..."
        />
        <div>
          <h3>Filter by Genre:</h3>
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">All Genres</option>
            {Object.entries(genreTitleMapping).map(([genreId, genreTitle]) => (
              <option key={genreId} value={genreId}>
                {genreTitle}
              </option>
            ))}
          </select>
        </div>
        {/* Sort select */}
        <select value={sortBy} onChange={handleSortChange}>
        <option value="choose">Choose</option>
          <option value="date">Sort by Date (A-Z)</option>
          <option value="date">Sort by Date (Z-A)</option>
          <option value="title">Sort by Title (A-Z)</option>
          <option value="title-az">Sort by Title (Z-A)</option>
          

        </select>
        {/* Header Component */}
        <ul className="prev">
          {filteredPreviews.map((show) => (
            <div key={show.id} className="preview-item">
              <div className="image">
                <img src={show.image} alt={show.title} className="preview-image" />
                <div className="dots">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="infos">
                <h3>Title: {show.title}</h3>
                Genre: {show.genres.map((genreId) => genreTitleMapping[genreId]).join(',')}
                <p>Seasons: {show.seasons}</p>
                {/* Toggle description visibility */}
                {descriptionVisible && <p>Description: {show.description}</p>}
                <p>Last Updated:{formatDate(show.updated)} </p>
              </div>
              <div className='buto'>
                <button onClick={() => handleShowClick(show.id)}>Seasons</button>
                {/* Toggle description visibility on button click */}
                <button onClick={() => setDescriptionVisible(!descriptionVisible)}>
                  {descriptionVisible ? 'Hide Description' : 'Show Description'}
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    );
  }
//shows differnt seasons
  return (
    <div className="season-page">
      <button onClick={() => setShowData(null)}>Back to Show List</button>
      <div>
        <h2>{showData.title}</h2>
        {showData.seasons.map((season) => (
          <div key={season.number}>
            <h3>Season {season.number}</h3>
            {selectedSeason === season.number ? (
              <ul>
                {season.episodes.map((episode) => (
                  <Fragment key={episode.id}>
                    <h4>{episode.name}</h4>
                    <li>{episode.title}</li>
                    <p>{episode.description}</p>
                    <audio controls>
                      <source src={episode.file} />
                    </audio>
                  </Fragment>
                ))}
              </ul>
            ) : (
              <div>
                <img className="seas" src={season.image} alt={`Season ${season.number}`} />
                <div>{season.episodes.length} Episodes</div>
                <button onClick={() => handleSeasonClick(season.number)}>View Episodes</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preview;
