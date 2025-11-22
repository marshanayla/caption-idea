import React, { useState, useEffect } from 'react'
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

  // Generate text based on style and gender
  const generateText = (style, isBoy) => {
    if (!style) return ''

    const boyFormal = [
      "I am pleased to share this moment with you all. Thank you for being part of my journey.",
      "I would like to express my gratitude for the wonderful experiences we've shared together.",
      "It is with great pleasure that I share this update with my valued connections and friends."
    ]

    const boyJoke = [
      "Why did I post this? Because I can! 😂 Life's too short to not share the good moments.",
      "Plot twist: I actually have no idea what I'm doing, but here we are! 😎",
      "Warning: This post may contain traces of awesomeness. Proceed with caution! 😄"
    ]

    const boyCasual = [
      "Just living my best life! Hope everyone's doing great out there.",
      "Another day, another adventure. Can't complain!",
      "Life's good when you're surrounded by good vibes and good people."
    ]

    const girlFormal = [
      "I am delighted to share this special moment with all of you. Thank you for your continued support.",
      "I would like to take this opportunity to express my appreciation for the wonderful people in my life.",
      "It brings me great joy to share this update with my dear friends and family."
    ]

    const girlJoke = [
      "Plot twist: I'm actually a professional at looking like I know what I'm doing! 😂✨",
      "Why be normal when you can be fabulous? Just kidding... or am I? 😉",
      "Warning: This post contains 100% pure sass and zero regrets! 💅😂"
    ]

    const girlCasual = [
      "Living my best life, one day at a time! ✨ Hope everyone's having a great day!",
      "Just vibing and enjoying the little moments. Life's beautiful! 💕",
      "Another day, another reason to smile. Grateful for everything! 🌸"
    ]

    let options = []
    if (isBoy) {
      if (style === 'formal') options = boyFormal
      else if (style === 'joke') options = boyJoke
      else if (style === 'casual') options = boyCasual
    } else {
      if (style === 'formal') options = girlFormal
      else if (style === 'joke') options = girlJoke
      else if (style === 'casual') options = girlCasual
    }

    if (options.length > 0) {
      return options[Math.floor(Math.random() * options.length)]
    }
    return ''
  }

  // Auto-generate text when style changes
  useEffect(() => {
    if (boyStyle) {
      setBoyText(generateText(boyStyle, true))
    }
  }, [boyStyle])

  useEffect(() => {
    if (girlStyle) {
      setGirlText(generateText(girlStyle, false))
    }
  }, [girlStyle])

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
                    onClick={() => {
                      setStyle(styleOption.id)
                      // Text will be auto-generated via useEffect
                    }}
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

