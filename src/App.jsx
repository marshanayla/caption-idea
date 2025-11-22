import React, { useState } from 'react'
import './App.css'

function App() {
  const [selectedView, setSelectedView] = useState(null) // null, 'boy', or 'girl'
  const [boyText, setBoyText] = useState('')
  const [girlText, setGirlText] = useState('')
  const [boyStyle, setBoyStyle] = useState(null)
  const [girlStyle, setGirlStyle] = useState(null)

  const handleBoyClick = () => {
    setSelectedView('boy')
  }

  const handleGirlClick = () => {
    setSelectedView('girl')
  }

  const handleBack = () => {
    setSelectedView(null)
  }

  const textStyles = [
    { id: 'formal', label: 'Formal' },
    { id: 'joke', label: 'Joke/Teasing (Candaan)' },
    { id: 'casual', label: 'Casual/Everyday Language (Bahasa Sehari-hari)' }
  ]

  const renderContentScreen = (isBoy) => {
    const text = isBoy ? boyText : girlText
    const setText = isBoy ? setBoyText : setGirlText
    const style = isBoy ? boyStyle : girlStyle
    const setStyle = isBoy ? setBoyStyle : setGirlStyle
    const screenClass = isBoy ? 'boy-screen' : 'girl-screen'
    const title = isBoy ? 'Boy Captions' : 'Girl Captions'

    return (
      <div className={`app ${screenClass}`}>
        <div className="content-screen">
          <button className="back-button" onClick={handleBack}>
            ← Back
          </button>
          <div className="screen-content">
            <h1 className="screen-title">{title}</h1>
            
            <div className="input-section">
              <textarea
                className="text-input"
                placeholder="Enter your caption text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
              />
            </div>

            <div className="style-section">
              <h2 className="style-title">Select Style:</h2>
              <div className="style-buttons">
                {textStyles.map((styleOption) => (
                  <button
                    key={styleOption.id}
                    className={`style-button ${style === styleOption.id ? 'active' : ''}`}
                    onClick={() => setStyle(styleOption.id)}
                  >
                    {styleOption.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (selectedView === 'boy') {
    return renderContentScreen(true)
  }

  if (selectedView === 'girl') {
    return renderContentScreen(false)
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

