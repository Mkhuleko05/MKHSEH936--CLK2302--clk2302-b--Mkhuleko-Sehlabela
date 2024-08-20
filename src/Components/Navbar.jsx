import React from 'react';
import microphoneIcon from '../images/microphone.png';
import favouriteIcon from '../images/favourite.png';
import searchIcon from '../images/search.png';
//import { Favorite } from '@mui/icons-material';

export default function Navbar() {

    const handleSearchClick = () => {
        // Perform search functionality here
        console.log('Search button clicked!');
      };
    
      // Function to handle the favorite button click
      const handleFavoriteClick = () => {
        // Perform favorite functionality here
        console.log('Favorite button clicked!');
      };

return (
    <div>
      <nav className="navbar">
        <img src={microphoneIcon} alt="Microphone Icon" className="nav--icon" />
        <h1>LESPODCAST</h1>

        <div className="nav--buttons">

          

          <button className="nav--button" onClick={handleFavoriteClick}>
            <img src={favouriteIcon} alt="Favorite Icon" className="nav--icon" />
            Favorite
          </button>
        </div>
      </nav>
    </div>
  );
}
