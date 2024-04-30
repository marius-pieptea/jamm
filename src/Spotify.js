const clientId = "get yours from https://developer.spotify.com/dashboard/";
const redirectUri = "http://localhost:5173/";

let accessToken;
let tokenExpirationtime;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expirationTimeMatch =
      window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expirationTimeMatch) {
      accessToken = accessTokenMatch[1];
      tokenExpirationtime = Number(expirationTimeMatch[1]);
      window.setTimeout(() => (accessToken = ""), tokenExpirationtime * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
        term
      )}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed!");
        },
        (networkError) => console.log(networkError.message)
      )
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
   getUserId() {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.id) {
          return jsonResponse.id;
        }
      });
  },

  createPlaylist(userId, name) {
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({ name: name });
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: headers,
      body: body
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.id) {
        return jsonResponse.id;
      }
    });
  },

  addTracksToPlaylist(playlistId, trackUris) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ uris: trackUris })
    })
    .then(response => response.json())
    .then(jsonResponse => jsonResponse.snapshot_id);
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) return;
    let userId = null;
    let playlistId = null;

    Spotify.getUserId()
      .then(id => {
        userId = id;
        return Spotify.createPlaylist(userId, name);
      })
      .then(id => {
        playlistId = id;
        return Spotify.addTracksToPlaylist(playlistId, trackUris);
      });
  }
};
  


export default Spotify;
