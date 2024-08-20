import React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper"
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import PreviewPodcast from "./PreviewPodcast";

function PodcastFaves({
  showData,
  loading,
  error,
  content,
  handleShowButtonClick,
  selectedShowId,
  isFavorite,
 
  likeIcon,
  favoriteList,
}) {
  // State to store the user's favorite episodes
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  // Function to add an episode to favorites
  const addToFavorites = (episode) => {
    setFavoriteEpisodes((prevFavorites) => [...prevFavorites, episode]);
  };

  // Function to remove an episode from favorites
  const removeFromFavorites = (episodeId) => {
    setFavoriteEpisodes((prevFavorites) =>
      prevFavorites.filter((episode) => episode.id !== episodeId)
    );
  };

  // Retrieve favorites from local storage on initial load
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavoriteEpisodes(storedFavorites);
    }
  }, []);

  // Update local storage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteEpisodes));
  }, [favoriteEpisodes]);

  // Function to handle toggling the favorite status of a show
const handleToggleFavorite = (showId) => {
  const showData = content.find((show) => show.id === showId);
  if (showData) {
    if(showData.isFavorite){
      removeFromFavorites(showId);
    
  } else {
        addToFavorites({...showData, isFavorite: true});
    }
  }
};

  const FaveStyles = {
    Body: {
      backgroundImage:
        "url(https://us.123rf.com/450wm/nanastudio/nanastudio1903/nanastudio190301015/119463669-headphones-on-dark-wooden-background-vintage-style.jpg?ver=6)",
      paddingLeft: "40px",
      color: "white",
    },


    BodyImg: {
      width: "50%",
      height: "50%",
    },

    History:{
      color:"#841e62",
      fontSize:"20px",
      marginLeft:"30px",
    },
 
  };

  const drawerWidth = 360;

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }} className="Body" style={FaveStyles.Body}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: "none" }) }}
        >
          <MenuIcon />

          <Typography>
            {" "}
            <h3>Search & My Favorites</h3>
          </Typography>
        </IconButton>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
      <section className="History" style={FaveStyles.History}>
        <h3 >My History: </h3>
        <p>All your favorites and history tucked away safely  </p>

        <Divider />


       </section>
          <Divider />
       
         <Paper> 
          {/* Display favorite episodes */}
          {favoriteEpisodes.map((episode) => (
            <div key={episode.id}>
              <h2>{episode.show}</h2>
              <p>Season: {episode.season}</p>{" "}
              <p>Episode Title: {episode.title}</p>
              <img
      src={
        episode.isFavorite
          ? "../public/icons/filledLike.svg"
          : "../public/icons/like.svg"
      }
      width="24"
      height="24"
      className="Faves"
      onClick={() => handleToggleFavorite(episode.id)}
    />
            </div>
          ))}</Paper>
         
           <PreviewPodcast />
        </Drawer>
      </Box>
    </div>
  );
}

export default PodcastFaves;
