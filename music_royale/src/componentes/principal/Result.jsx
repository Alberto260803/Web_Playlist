import './Result.css';
import { useTournament } from '../contextos/TournamentContext.jsx';
import { useState, useEffect } from 'react';
import VideoBattle from '../torneo/VideoBattle.jsx';

const Result = ({ winner }) => {
  const { tieIndices, videosByPlaylist, finalizeWinner, activateIndex, goHome } = useTournament();
  const years = [2022, 2023, 2024, 2025];
  const [randomSongs, setRandomSongs] = useState({});

  useEffect(() => {
    if (tieIndices.length > 1) {
      const usedIds = new Set();
      const songs = {};
      tieIndices.forEach(i => {
        const playlist = videosByPlaylist[i];
        if (!playlist || playlist.length === 0) return;

        let videoId = null;
        let attempts = 0;
        while (attempts < 10) {
          const randomIndex = Math.floor(Math.random() * playlist.length);
          const candidate = playlist[randomIndex];
          if (!usedIds.has(candidate)) {
            videoId = candidate;
            usedIds.add(candidate);
            break;
          }
          attempts++;
        }
        if (videoId) {
          songs[i] = videoId;
        }
      });
      setRandomSongs(songs);
    }
  }, [tieIndices, videosByPlaylist]);

  if (tieIndices.length > 1) {
    return (
      <div className="result">
        {/* Botón de inicio arriba a la izquierda */}
        <button className="home-btn" onClick={
          () => goHome()
        }>
          <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Inicio" />
        </button>

        <h2>⚔️ ¡Empate!</h2>
        <p>Elige la playlist que decida el ganador:</p>
        <div className="battle-grid">
          {years.map((year, idx) => (
            <div
              key={year}
              className="battle-item"
              onMouseEnter={() => activateIndex(idx)}
            >
              <h3>{year}</h3>
              {tieIndices.includes(idx) && randomSongs[idx] ? (
                <>
                  <VideoBattle videoId={randomSongs[idx]} index={idx} />
                  <button onClick={() => finalizeWinner(year)}>
                    Votar {year}
                  </button>
                </>
              ) : (
                <div className="empty-slot">Sin canción</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="result">
      {/* Botón de inicio arriba a la izquierda */}
      <button className="home-btn" onClick={
        () => goHome()
      }>
        <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Inicio" />
      </button>

      <h2>🏆 ¡Ganador!</h2>
      <p>El año ganador es: <strong>{winner}</strong></p>
    </div>
  );
};

export default Result;
