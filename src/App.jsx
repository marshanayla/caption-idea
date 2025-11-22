import React, { useState } from 'react'
import './App.css'

function App() {
  const [selectedView, setSelectedView] = useState(null) // null, 'boy', or 'girl'
  const [boyText, setBoyText] = useState('')
  const [girlText, setGirlText] = useState('')
  const [boyStyle, setBoyStyle] = useState(null)
  const [girlStyle, setGirlStyle] = useState(null)
  const [preferredLanguage, setPreferredLanguage] = useState(null) // 'id' or 'en' or null

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

  // Detect language from text (Indonesian or English)
  const detectLanguage = (text) => {
    if (!text || text.trim().length === 0) return null // Return null if empty, don't default to English
    
    const indonesianWords = [
      'yang', 'dan', 'atau', 'dengan', 'untuk', 'dari', 'ini', 'itu', 'adalah', 
      'akan', 'sudah', 'belum', 'tidak', 'bukan', 'saya', 'kamu', 'dia', 'kita',
      'mereka', 'di', 'ke', 'pada', 'oleh', 'juga', 'saja', 'hanya',
      'bisa', 'dapat', 'harus', 'perlu', 'mau', 'ingin', 'lagi', 'masih',
      'terima', 'kasih', 'tolong', 'maaf', 'permisi', 'selamat', 'salam',
      'aku', 'engkau', 'kalian', 'kami', 'mereka', 'ini', 'itu',
      'ada', 'adalah', 'akan', 'sudah', 'belum', 'pernah',
      'nggak', 'gak', 'enggak', 'ga', 'ngga', 'ndak',
      'banget', 'banget', 'sih', 'dong', 'kok', 'nih', 'deh',
      'gimana', 'gimana', 'kenapa', 'apa', 'siapa', 'dimana', 'kapan',
      'terima kasih', 'makasih', 'thanks', 'tolong', 'minta',
      'cantik', 'ganteng', 'bagus', 'keren', 'mantap', 'asik', 'asyik'
    ]
    
    // Check for Indonesian-specific patterns
    const indonesianPatterns = [
      /\b(nggak|gak|enggak|ga|ngga|ndak)\b/i, // Negation
      /\b(banget|sih|dong|kok|nih|deh)\b/i, // Particles
      /\b(gimana|kenapa|dimana|kapan)\b/i, // Question words
      /\b(makasih|terima kasih)\b/i, // Thanks
      /\b(cantik|ganteng|bagus|keren|mantap|asik|asyik)\b/i, // Common adjectives
    ]
    
    const lowerText = text.toLowerCase().trim()
    const words = lowerText.split(/\s+/).filter(w => w.length > 0)
    
    if (words.length === 0) return null
    
    // Check for Indonesian patterns first (more reliable)
    for (const pattern of indonesianPatterns) {
      if (pattern.test(lowerText)) {
        return 'id'
      }
    }
    
    // Count Indonesian words
    let indonesianCount = 0
    for (const word of words) {
      // Remove punctuation for comparison
      const cleanWord = word.replace(/[.,!?;:]/g, '')
      if (indonesianWords.includes(cleanWord)) {
        indonesianCount++
      }
    }
    
    // Very sensitive detection: if ANY Indonesian word or pattern found, it's Indonesian
    // This ensures we always follow the user's language choice
    if (indonesianCount > 0) {
      return 'id'
    }
    
    // Default to English if no Indonesian detected
    return 'en'
  }

  // Generate text based on style, gender, and language
  const generateText = (style, isBoy, language = 'en') => {
    if (!style) return ''

    // English options
    const boyFormalEn = [
      "I am pleased to share this moment with you all. Thank you for being part of my journey.",
      "I would like to express my gratitude for the wonderful experiences we've shared together.",
      "It is with great pleasure that I share this update with my valued connections and friends."
    ]

    const boyJokeEn = [
      "Why did I post this? Because I can! 😂 Life's too short to not share the good moments.",
      "Plot twist: I actually have no idea what I'm doing, but here we are! 😎",
      "Warning: This post may contain traces of awesomeness. Proceed with caution! 😄"
    ]

    const boyCasualEn = [
      "Just living my best life! Hope everyone's doing great out there.",
      "Another day, another adventure. Can't complain!",
      "Life's good when you're surrounded by good vibes and good people."
    ]

    const girlFormalEn = [
      "I am delighted to share this special moment with all of you. Thank you for your continued support.",
      "I would like to take this opportunity to express my appreciation for the wonderful people in my life.",
      "It brings me great joy to share this update with my dear friends and family."
    ]

    const girlJokeEn = [
      "Plot twist: I'm actually a professional at looking like I know what I'm doing! 😂✨",
      "Why be normal when you can be fabulous? Just kidding... or am I? 😉",
      "Warning: This post contains 100% pure sass and zero regrets! 💅😂"
    ]

    const girlCasualEn = [
      "Living my best life, one day at a time! ✨ Hope everyone's having a great day!",
      "Just vibing and enjoying the little moments. Life's beautiful! 💕",
      "Another day, another reason to smile. Grateful for everything! 🌸"
    ]

    // Indonesian options
    const boyFormalId = [
      "Saya dengan senang hati berbagi momen ini dengan kalian semua. Terima kasih telah menjadi bagian dari perjalanan saya.",
      "Saya ingin mengucapkan terima kasih atas pengalaman indah yang telah kita bagikan bersama.",
      "Dengan senang hati saya berbagi update ini dengan koneksi dan teman-teman terhormat."
    ]

    const boyJokeId = [
      "Kenapa saya posting ini? Karena saya bisa! 😂 Hidup terlalu singkat untuk tidak berbagi momen-momen baik.",
      "Plot twist: Sebenarnya saya nggak tahu apa yang saya lakukan, tapi ya sudah begini! 😎",
      "Peringatan: Postingan ini mungkin mengandung jejak keren. Lanjutkan dengan hati-hati! 😄"
    ]

    const boyCasualId = [
      "Cuma hidup dengan baik aja! Semoga semua orang baik-baik saja di luar sana.",
      "Hari lain, petualangan lain. Nggak bisa mengeluh!",
      "Hidup jadi baik kalau dikelilingi vibes dan orang-orang baik."
    ]

    const girlFormalId = [
      "Saya dengan senang hati berbagi momen spesial ini dengan kalian semua. Terima kasih atas dukungan kalian yang berkelanjutan.",
      "Saya ingin mengambil kesempatan ini untuk mengucapkan terima kasih kepada orang-orang luar biasa dalam hidup saya.",
      "Saya sangat senang berbagi update ini dengan teman dan keluarga tercinta."
    ]

    const girlJokeId = [
      "Plot twist: Saya sebenarnya profesional dalam berpura-pura tahu apa yang saya lakukan! 😂✨",
      "Kenapa harus normal kalau bisa fabulous? Bercanda... atau tidak? 😉",
      "Peringatan: Postingan ini mengandung 100% sass murni dan zero regrets! 💅😂"
    ]

    const girlCasualId = [
      "Hidup dengan baik, satu hari demi satu hari! ✨ Semoga semua orang punya hari yang baik!",
      "Cuma vibing dan menikmati momen-momen kecil. Hidup itu indah! 💕",
      "Hari lain, alasan lain untuk tersenyum. Bersyukur untuk semuanya! 🌸"
    ]

    let options = []
    if (language === 'id') {
      // Indonesian
      if (isBoy) {
        if (style === 'formal') options = boyFormalId
        else if (style === 'joke') options = boyJokeId
        else if (style === 'casual') options = boyCasualId
      } else {
        if (style === 'formal') options = girlFormalId
        else if (style === 'joke') options = girlJokeId
        else if (style === 'casual') options = girlCasualId
      }
    } else {
      // English
      if (isBoy) {
        if (style === 'formal') options = boyFormalEn
        else if (style === 'joke') options = boyJokeEn
        else if (style === 'casual') options = boyCasualEn
      } else {
        if (style === 'formal') options = girlFormalEn
        else if (style === 'joke') options = girlJokeEn
        else if (style === 'casual') options = girlCasualEn
      }
    }

    if (options.length > 0) {
      return options[Math.floor(Math.random() * options.length)]
    }
    return ''
  }


  const handleStyleClick = (styleId, currentText, isBoy) => {
    // Always detect language from user's current text first
    let detectedLang = detectLanguage(currentText)
    
    // If we detected a language, save it as preference
    if (detectedLang) {
      setPreferredLanguage(detectedLang)
    } else if (preferredLanguage) {
      // If no text to detect from, use the previously detected language preference
      detectedLang = preferredLanguage
    } else {
      // If no preference and no text, default to English (but this should be rare)
      detectedLang = 'en'
    }
    
    // Generate text in the detected/preferred language
    const generatedText = generateText(styleId, isBoy, detectedLang)
    
    if (isBoy) {
      setBoyStyle(styleId)
      setBoyText(generatedText)
    } else {
      setGirlStyle(styleId)
      setGirlText(generatedText)
    }
  }
  
  // Also detect language when user types, to remember their preference
  const handleTextChange = (newText, isBoy) => {
    if (isBoy) {
      setBoyText(newText)
    } else {
      setGirlText(newText)
    }
    
    // Update language preference when user types
    const detectedLang = detectLanguage(newText)
    if (detectedLang) {
      setPreferredLanguage(detectedLang)
    }
  }

  const renderContentScreen = (isBoy) => {
    const text = isBoy ? boyText : girlText
    const setText = isBoy ? setBoyText : setGirlText
    const style = isBoy ? boyStyle : girlStyle
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
                onChange={(e) => handleTextChange(e.target.value, isBoy)}
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
                    onClick={() => handleStyleClick(styleOption.id, text, isBoy)}
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

