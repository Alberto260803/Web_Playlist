import { useState } from 'react';
import './PlaylistSelector.css';

const PlaylistSelector = ({ setPlaylists }) => {
  const [urls, setUrls] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filtramos las que no estén vacías
    const validUrls = urls.filter(url => url.trim() !== "");
    if (validUrls.length === 4) {
      setPlaylists(validUrls);
    } else {
      alert("Debes introducir las 4 playlists.");
    }
  };

  return (
    <div className="playlist-selector">
      <h2>Selecciona tus playlists</h2>
      <form onSubmit={handleSubmit}>
        {urls.map((url, index) => (
          <input
            key={index}
            type="text"
            placeholder={`URL Playlist ${index + 2022}`}
            value={url}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
};

export default PlaylistSelector;
