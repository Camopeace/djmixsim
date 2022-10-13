import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tracks from './components/Tracks'
import AddTrack from './components/AddTrack'
import About from './components/About'

const App = () => {
  const [showAddTrack, setShowAddTrack] = useState(false)
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    const getTracks = async () => {
      const tracksFromServer = await fetchTracks()
      setTracks(tracksFromServer)
    }

    getTracks()
  }, [])

  // Fetch Tracks
  const fetchTracks = async () => {
    const res = await fetch('http://localhost:5000/tracks')
    const data = await res.json()

    return data
  }

  // Fetch Track
  const fetchTrack = async (id) => {
    const res = await fetch(`http://localhost:5000/tracks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Track
  const addTrack = async (track) => {
    const res = await fetch('http://localhost:5000/tracks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(track),
    })

    const data = await res.json()

    setTracks([...tracks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTrack = { id, ...track }
    // setTracks([...tracks, newTrack])
  }

  // Delete Track
  const deleteTrack = async (id) => {
    const res = await fetch(`http://localhost:5000/tracks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTracks(tracks.filter((track) => track.id !== id))
      : alert('Error Deleting This Track')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const trackToToggle = await fetchTrack(id)
    const updTrack = { ...trackToToggle, reminder: !trackToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tracks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTrack),
    })

    const data = await res.json()

    setTracks(
      tracks.map((track) =>
        track.id === id ? { ...track, reminder: data.reminder } : track
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTrack(!showAddTrack)}
          showAdd={showAddTrack}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTrack && <AddTrack onAdd={addTrack} />}
                {tracks.length > 0 ? (
                  <Tracks
                    tracks={tracks}
                    onDelete={deleteTrack}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tracks To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App