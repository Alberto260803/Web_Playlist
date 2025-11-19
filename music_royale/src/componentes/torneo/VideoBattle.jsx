import { useEffect, useRef } from 'react';
import { useTournament } from '../contextos/TournamentContext.jsx';
import './VideoBattle.css';

const VideoBattle = ({ videoId, index }) => {
  const { activeIndex } = useTournament();
  const playerRef = useRef(null);
  const readyRef = useRef(false);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const createPlayer = () => {
      if (window.YT && window.YT.Player) {
        if (!playerRef.current) {
          playerRef.current = new window.YT.Player(`player-${index}`, {
            videoId,
            playerVars: { autoplay: 0, mute: 1, enablejsapi: 1 },
            events: {
              onReady: (event) => {
                readyRef.current = true;
                event.target.mute();
                event.target.setVolume(50);
              }
            }

          });
        } else if (readyRef.current) {
          playerRef.current.cueVideoById(videoId);
        }
      }
    };

    window.onYouTubeIframeAPIReady = createPlayer;
    if (window.YT && window.YT.Player) createPlayer();
  }, [videoId, index]);

  useEffect(() => {
    if (readyRef.current && playerRef.current) {
      if (activeIndex === index) {
        playerRef.current.unMute();
        playerRef.current.setVolume(50); // asegurar volumen al activar
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
        playerRef.current.mute();
      }
    }
  }, [activeIndex, index]);


  return (
    <div className="video-container">
      <div id={`player-${index}`}></div>
    </div>
  );
};

export default VideoBattle;
