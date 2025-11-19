import { createContext, useContext, useState, useEffect } from 'react';

const TournamentContext = createContext();

export const useTournament = () => useContext(TournamentContext);

export const TournamentProvider = ({ children }) => {
  const [position, setPosition] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [scores, setScores] = useState([0,0,0,0]);
  const [videosByPlaylist, setVideosByPlaylist] = useState([]);
  const [winner, setWinner] = useState(null);
  const [tieIndices, setTieIndices] = useState([]);
  const [finished, setFinished] = useState(false);
  const [playlists, setPlaylists] = useState([]); // 👈 mover playlists aquí al contexto

  const years = [2022, 2023, 2024, 2025];

  const resetActive = () => setActiveIndex(null);
  const activateIndex = (index) => setActiveIndex(index);

  const updateScores = (index) => {
    setScores(prev => {
      const newScores = [...prev];
      newScores[index] += 1;
      return newScores;
    });
  };

  const updateVideos = (allVideos) => {
    setVideosByPlaylist(allVideos);
    const maxLength = Math.max(...allVideos.map(v => v.length));
    setPosition(maxLength);
    setWinner(null);
    setTieIndices([]);
    setFinished(false);
  };

  const advancePosition = () => {
    setPosition(prev => {
      let nextPos = prev - 1;
      while (nextPos > 0 && videosByPlaylist.every(videos => !videos[nextPos - 1])) {
        nextPos--;
      }
      if (nextPos < 1) {
        setFinished(true);
        return 0;
      }
      resetActive();
      return nextPos;
    });
  };

  useEffect(() => {
    if (finished && position === 0) {
      const maxScore = Math.max(...scores);
      const indices = scores
        .map((s, i) => (s === maxScore ? i : null))
        .filter(i => i !== null);

      if (indices.length === 1) {
        setWinner(years[indices[0]]);
      } else {
        setTieIndices(indices);
      }
    }
  }, [finished, position, scores]);

  const finalizeWinner = (year) => {
    setWinner(year);
    setTieIndices([]);
  };

  const goHome = () => {
    setPosition(null);
    setActiveIndex(null);
    setScores([0,0,0,0]);
    setVideosByPlaylist([]);
    setWinner(null);
    setTieIndices([]);
    setFinished(false);
    setPlaylists([]);
  };

  
  return (
    <TournamentContext.Provider value={{
      position,
      activeIndex,
      scores,
      videosByPlaylist,
      winner,
      tieIndices,
      finished,
      playlists,
      setPlaylists,
      resetActive,
      activateIndex,
      updateScores,
      updateVideos,
      advancePosition,
      finalizeWinner,
      goHome,
      playlists,
      setPlaylists
    }}>
      {children}
    </TournamentContext.Provider>
  );
};
