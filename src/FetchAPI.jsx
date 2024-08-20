import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const FetchApi = ({showData }) => {

    const [content, setContent] = useState([]);


  const CardStyle={

    cardImage: {
      width: '100%',
      borderRadius: '9px',
      marginBottom: '9px',
  },

  
cardTitle: {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '25px',
  color:'#2A445E'
},

cardSeason : {
  
  top: '6px',
  left: '6px',
  backgroundColor: 'white',
  padding: '5px 7px',
  borderRadius: '2px',
  fontWeight: 'bold',
  color:'#2A445E'
},

Paper: {
    width: '250px',
    height: "100%",
    fontsize: '12px',
    flex: '0 0 auto',        
    display: 'flex',         
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'Transparent',
    padding: '15px',
   
},

CardButton:{
  color:'white',
  backgroundColor:'#841e62',
  border:"none",
  cursor: 'pointer',
  padding:"10px",
  borderRadius:'9px',
  marginLeft: '25%',
  marginTop:'10px',
  paddingBottom: '10px',

},

descriptionButton:{
  color:'white',
  backgroundColor:'#841e62',
  border:"none",
  cursor: 'pointer',
  padding:"10px",
  borderRadius:'9px',
  marginLeft: '25%',

},

CardUpdated:{
 color:'#2A445E',

},

cardDescription:{
  color:'#2A445E',
}

  }

  return (
    <div>
      <Paper>
        <Grid>
          <div>
            {content.map((shows) => (
              <h2 key={shows.id}>
                {shows.title}{' '}
                <button className="FetchButton" onClick={() => handleShowButtonClick(shows.id)}>
                  Fetch Show
                </button>
              </h2>
            ))}
          </div>

          {showData && showData.description && (
            <div>
              <br />
              <p>{showData.description}</p>

              {/* Fetching the all seasons */}
              {showData.seasons && showData.seasons.map((season) => (
                <div key={season.season}>
                  <p>{season.title}</p>
                  <img className='cardImage' style={CardStyle.cardImage} src={season?.image} />

                  {/* Fetching the all Episodes of the seasons */}
                  {season.episodes && season.episodes.map((episode) => (
                    <div key={episode.episode}>
                      <p className="EpisodeName" style={CardStyle.EpisodeName}>{episode.title}</p>
                      <p className='EpisodeDescription' style={CardStyle.EpisodeDescription}>{episode.description}</p>
                      <p>{episode.episode}</p>

                      {/* AUDIO FILE */}
                      <audio controls>
                        <source src={episode.file} type="audio/mpeg" />
                      </audio>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default FetchApi;
