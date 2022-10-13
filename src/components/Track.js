import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Track = ({ track, onDelete, onToggle }) => {
  return (
    <div
      className={`track ${track.reminder && 'reminder'}`}
      onDoubleClick={() => onToggle(track.id)}
    >
      <h3>
        {track.text} <FaTimes style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(track.id)}
        />
      </h3>
      <p>{track.day}</p>
    </div>
  )
}

export default Track

