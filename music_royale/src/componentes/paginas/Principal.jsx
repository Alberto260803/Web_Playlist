import { useState } from 'react';
import './Principal.css';
import PlaylistSelector from '../principal/PlaylistSelector.jsx';
import Tournament from '../principal/Tournament.jsx';
import Result from '../principal/Result.jsx';
import { useTournament } from '../contextos/TournamentContext.jsx';

const Principal = () => {
  const { winner, finished, playlists, setPlaylists } = useTournament();

  const defaultPlaylists = [
    "https://youtube.com/playlist?list=PL2-kZmhCWZJMB2f1o7qjdV-3e0AmZmDY9&si=PWGHMf3gid5eSMB_", // 2022
    "https://youtube.com/playlist?list=PL2-kZmhCWZJNHb0Ad0YX_ne_jQEssJJpr&si=sHga5DaNCRawRK2Z", // 2023
    "https://youtube.com/playlist?list=PL2-kZmhCWZJM6iTtJ9Vfwqa5dKswj4i0C&si=8PGeOYzsQrW38jCt", // 2024
    "https://youtube.com/playlist?list=PL2-kZmhCWZJM--BPsJplELJLT2Np430QR&si=yKrGOAqlSQSKXvq9"  // 2025
  ];

  const fillDefaultPlaylists = () => {
    setPlaylists(defaultPlaylists);
  };


  return (
    <div className="principal">
      <header className="header">
        <h1>MUSIC ROYALE</h1>
        <p>Selecciona tus 4 playlists anuales y descubre qué año gana.</p>
        {!winner && !finished && playlists.length === 0 && (
          <button className="auto-fill-btn" onClick={fillDefaultPlaylists}>
            Usar mis playlists por defecto
          </button>
        )}
      </header>

      {!winner && !finished && playlists.length < 4 && (
        <PlaylistSelector setPlaylists={setPlaylists} />
      )}

      {!winner && !finished && playlists.length === 4 && (
        <Tournament playlists={playlists} />
      )}

      {finished && <Result winner={winner} />}
    </div>
  );
};

export default Principal;
