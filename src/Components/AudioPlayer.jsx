import {useState, useEffect, useRef} from 'react'

const AudioStyles = {
   
    Audio: {
      padding: "10px",
      borderRadius: "9px",
      background: " #b52d5b",
      display: "flex",
      flexDirection: "row",
      
    },
    currentProgress:{
     fontSize:"15px",
     color:"white"
    },
    PlayButton:{
      border:"none",
      background:"transparent",
      
      color:"white",
    }
  };

 // Helper function to format time in mm:ss format
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  
function AudioPlayer({ showData,
   
    file,
    isFavorite,
    favoriteList,
    handleToggleFavorite,
    likeIcon,
    progress,
  
    }) {


       const [isPlaying, setIsPlaying] = useState(false);
       const audioRef = useRef(null)

       useEffect(() => {
        if (isPlaying){
            audioRef.current.play();
        } else{
            audioRef.current.pause();
        }
        
       },[isPlaying])

       const handleTogglePlay = () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
       };
       const updateAudioProgress =() =>{
        const audioElement= audioRef.current;
        if (audioElement) {
          const currentTime = audioElement.currentTime;
          const duration =audioElement.duration;
          const progressPercentage = (currentTime / duration) * 100;
          setProgress({ currentTime, duration, progressPercentage });
        }
       }
      
       useEffect(()=> {
        const audioElement = audioRef.current;
        if(audioElement) {
          audioElement.addEventListener("timeupdate", updateAudioProgress);
        }
        return () => {
          if (audioElement){
            audioElement.removeEventListener("timeupdate", updateAudioProgress);
          }
        }
       },[])
    
  return (
    <div className="AudioPlayer">
       
       <div className="Audio" style={AudioStyles.Audio}>
        <img
          src={
            isFavorite
              ? "../public/icons/filledLike.svg"
              : "../public/icons/like.svg"
          }
          width="24"
          height="24"
          className="Faves"
          handleToggleFavorite={() => handleToggleFavorite(shows.id)}
        />
        <audio ref={audioRef} controls >
          <source src={file} type="audio/mpeg" />
          Oops, your browser does not support the audio element.
        </audio>
        <button onClick={handleTogglePlay} className='PlayButton' style={AudioStyles.PlayButton}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="currentProgress" style={AudioStyles.currentProgress}>
          <span>{formatTime(progress.currentTime)}</span> /{" "}
          <span>{formatTime(progress.duration)}</span>
        </div>
      </div>
        </div>
  
  )
}

export default AudioPlayer
