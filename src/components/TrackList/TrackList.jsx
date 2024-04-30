import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

function TrackList({tracks, isRemoval, onAddOrRemove}) {
    return (
      <div className="TrackList">
        {tracks && tracks.map(track => {
          return <Track key={track.id} track={track} onAddOrRemove={() => onAddOrRemove(track)} isRemoval={isRemoval} />;
        })}	
      </div>
    );
}

export default TrackList;