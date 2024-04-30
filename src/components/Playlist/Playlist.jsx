import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import Spotify from '../../Spotify';

function Playlist({playlistName, playlistTracks, onRemove, onNameChange, onSave}) {
    const handleSave = () => {
        const trackUris = playlistTracks.map(track => track.uri);   
        Spotify.savePlaylist(playlistName, trackUris);
        onSave();
    }

    return (
      <div className="Playlist">
        <input
          defaultValue={playlistName}
          onChange={(e) => onNameChange(e.target.value)}
          onFocus={(e) => e.target.select()}
          className="Playlist-name"
        />
        <TrackList
          tracks={playlistTracks}
          onAddOrRemove={onRemove}
          isRemoval={true}
        />
        <button className="Playlist-save" onClick={handleSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
}

export default Playlist;
