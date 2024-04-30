import React, { useState } from 'react';
import './SearchBar.css';
import Spotify from '../../Spotify';
function SearchBar({onSearch}) {
    const [term, setTerm] = useState('');

    const search = () => {
        Spotify.search(term).then(searchResults => {
            onSearch(searchResults)
        })
    }

    const handleTermChange = (event) => {
        setTerm(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    }


    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" 
            onChange={handleTermChange}
            onKeyDown={handleKeyDown}
            />
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    )
}

export default SearchBar;