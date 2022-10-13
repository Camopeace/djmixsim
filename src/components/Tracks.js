import React from 'react'
import Track from './Track'

const Tracks = ({ tracks, onDelete, onToggle }) => {
  return (
    <>
      {tracks.map((track, index) => (
        <Track key={index} track={track} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Tracks