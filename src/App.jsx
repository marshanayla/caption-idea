import React, { useState } from 'react'
import './App.css'

function App() {
  const [selectedView, setSelectedView] = useState(null) // null, 'boy', or 'girl'

  const handleBoyClick = () => {
    setSelectedView('boy')
  }

  const handleGirlClick = () => {
    setSelectedView('girl')
  }

  const handleBack = () => {
    setSelectedView(null)
  }

  if (selectedView === 'boy') {
    return (
      <div className="app boy-screen">
        <div className="content-screen">
          <button className="back-button" onClick={handleBack}>
            ← Back
          </button>
          <div className="screen-content">
            <h1 className="screen-title">Boy Captions</h1>
            <p className="screen-subtitle">Content coming soon...</p>
          </div>
        </div>
      </div>
    )
  }

  if (selectedView === 'girl') {
    return (
      <div className="app girl-screen">
        <div className="content-screen">
          <button className="back-button" onClick={handleBack}>
            ← Back
          </button>
          <div className="screen-content">
            <h1 className="screen-title">Girl Captions</h1>
            <p className="screen-subtitle">Content coming soon...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="opening-screen">
        <div className="boy-section" onClick={handleBoyClick}>
          <div className="choice-content">
            <h1 className="choice-title">Boy</h1>
            <p className="choice-subtitle">Tap to explore</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="girl-section" onClick={handleGirlClick}>
          <div className="choice-content">
            <h1 className="choice-title">Girl</h1>
            <p className="choice-subtitle">Tap to explore</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

