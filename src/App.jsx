import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'
import './App.css'


function App() {
    // const [tracks, setTracks] = useState([
    //   {
    //     id: 1,
    //     name: "Track 1",
    //     artist: "Artist 1",
    //     album: "Album 1",
    //     uri: "spotify:track:6rqhFgbbKwnb9MLmUQDhG6",
    //   },
    //   {
    //     id: 2,
    //     name: "Track 2",
    //     artist: "Artist 2",
    //     album: "Album 2",
    //     uri: "spotify:track:6I9VzXrHxO9rA9A5euc8Ak",
    //   },
    //   {
    //     id: 3,
    //     name: "Track 3",
    //     artist: "Artist 3",
    //     album: "Album 3",
    //     uri: "spotify:track:0WqIKmW4BTrj3eJFmnCKMv",
    //   },
    // ]);

  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([
    // {
    //   id: 4,
    //   name: 'Track 4',
    //   artist: 'Artist 4',
    //   album: 'Album 4',
    // },
    // {
    //   id: 5,
    //   name: 'Track 5',
    //   artist: 'Artist 5',
    //   album: 'Album 5',
    // },
    // {
    //   id: 6,
    //   name: 'Track 6',
    //   artist: 'Artist 6',
    //   album: 'Album 6',
    // },
  ])

  const[searchResults, setSearchResults] = useState([])

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    setPlaylistTracks([...playlistTracks, track])
  }

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id))
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  }

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map(track => track.uri)
    console.log("Saving playlist with URIs: ", trackURIs)
    setPlaylistTracks([])
    setPlaylistName('New Playlist')
  }

  const handleSearch = (results) => {
    setSearchResults(results)
  }

  return (
    <div className="App">
      <h1>Ja<span>mmm</span>ing</h1>
      <h2>Spotify playlist maker</h2>
      <SearchBar onSearch={handleSearch}/>
      <div className="App-playlist">
        <SearchResults searchResults={searchResults} onAdd={addTrack}/>
        <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onNameChange={updatePlaylistName} onRemove={removeTrack} onSave={savePlaylist}/>
      </div>
    </div>
  )
}

export default App
