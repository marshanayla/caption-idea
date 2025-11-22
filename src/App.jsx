import React from 'react'
import './App.css'

function App() {
  const handleBoyClick = () => {
    console.log('Boy selected')
    // TODO: Navigate to boy captions
  }

  const handleGirlClick = () => {
    console.log('Girl selected')
    // TODO: Navigate to girl captions
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

