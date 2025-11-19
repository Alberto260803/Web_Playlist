import { useEffect } from 'react';
import VideoBattle from '../torneo/VideoBattle.jsx';
import { fetchPlaylistVideos, extractPlaylistId } from '../utils/youtube.js';
import './Tournament.css';
import { useTournament } from '../contextos/TournamentContext.jsx';

const Tournament = ({ playlists }) => {
  const {
    position, scores, videosByPlaylist,
    activateIndex, updateScores, updateVideos, advancePosition, goHome
  } = useTournament();

  const years = [2022, 2023, 2024, 2025];
  const apiKey = "API_KEY_HERE"; // Reemplaza con tu clave de API de YouTube

  useEffect(() => {
    const loadPlaylists = async () => {
      const allVideos = [];
      for (let pl of playlists) {
        const playlistId = extractPlaylistId(pl);
        const vids = await fetchPlaylistVideos(playlistId, apiKey);
        allVideos.push(vids);
      }
      updateVideos(allVideos);
    };
    loadPlaylists();
  }, [playlists]);

  const handleVote = (index) => {
    updateScores(index);
    advancePosition();
  };

  if (position === null) return <div className="tournament">Cargando playlists...</div>;

  return (
    <div className="tournament">
      <button className="home-btn" onClick={
        () => goHome()
      }>
        <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Inicio" />
      </button>
      <h2>Posición #{position}</h2>
      <div className="battle-grid">
        {videosByPlaylist.map((videos, index) => {
          const videoId = videos[position - 1];
          return (
            <div
              key={index}
              className="battle-item"
              onMouseEnter={() => activateIndex(index)}
            >
              <h3>{years[index]}</h3>
              {videoId ? (
                <>
                    <VideoBattle videoId={videoId} index={index} />
                    <button onClick={() => handleVote(index)}>Votar {years[index]}</button>
                    <div className="vote-counter">
                    Votos: {scores[index]}
                    </div>
                </>
                ) : (
                <div className="empty-slot">Sin canción</div>
                )}
            </div>
          );
        })}
      </div>
      <div className="next-button">
        <button onClick={() => advancePosition()}>
          {position > 1 ? "Siguiente posición" : "Finalizar torneo"}
        </button>
      </div>
    </div>
  );
};

export default Tournament;
