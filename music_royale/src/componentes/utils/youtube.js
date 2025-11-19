export const extractPlaylistId = (url) => {
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

export const fetchPlaylistVideos = async (playlistId, apiKey) => {
  let videos = [];
  let nextPageToken = "";

  console.log("📂 Cargando playlist:", playlistId);

  try {
    do {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&pageToken=${nextPageToken}&key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.items) {
        console.error("❌ Error en la API:", data);
        break;
      }

      const ids = data.items.map(item => item.snippet?.resourceId?.videoId).filter(Boolean);
      videos = videos.concat(ids);
      nextPageToken = data.nextPageToken || "";
    } while (nextPageToken);

    console.log(`🎵 Playlist ${playlistId} cargada con ${videos.length} vídeos totales`);
    return videos;
  } catch (error) {
    console.error("🔥 Error al cargar la playlist:", error);
    return [];
  }
};
