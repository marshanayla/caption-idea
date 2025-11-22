import React, { useState } from 'react'
import './App.css'

function App() {
  // Detect browser/system language on first load
  const getDefaultLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage || 'en'
    // Check if browser language is Indonesian
    if (browserLang.startsWith('id') || browserLang.includes('id-ID') || browserLang.includes('id_ID')) {
      return 'id'
    }
    // Default to Indonesian since user prefers Indonesian
    return 'id'
  }

  const [selectedView, setSelectedView] = useState(null) // null, 'boy', or 'girl'
  const [boyText, setBoyText] = useState('')
  const [girlText, setGirlText] = useState('')
  const [boyStyle, setBoyStyle] = useState(null)
  const [girlStyle, setGirlStyle] = useState(null)
  const [preferredLanguage, setPreferredLanguage] = useState(getDefaultLanguage()) // Default to Indonesian

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

  // Detect language from text (Indonesian or English) - Smart detection that ALWAYS follows user input
  const detectLanguage = (text) => {
    if (!text || text.trim().length === 0) return null
    
    const lowerText = text.toLowerCase().trim()
    const words = lowerText.split(/\s+/).filter(w => w.length > 0)
    
    if (words.length === 0) return null
    
    // Comprehensive Indonesian word list
    const indonesianWords = new Set([
      // Pronouns
      'saya', 'aku', 'kamu', 'engkau', 'dia', 'ia', 'kita', 'kami', 'kalian', 'mereka',
      // Common words
      'yang', 'dan', 'atau', 'dengan', 'untuk', 'dari', 'ini', 'itu', 'adalah', 
      'akan', 'sudah', 'belum', 'tidak', 'bukan', 'di', 'ke', 'pada', 'oleh', 
      'juga', 'saja', 'hanya', 'bisa', 'dapat', 'harus', 'perlu', 'mau', 'ingin', 
      'lagi', 'masih', 'pernah', 'ada', 'jadi', 'akan', 'sudah',
      // Negation (very common in Indonesian)
      'nggak', 'gak', 'enggak', 'ga', 'ngga', 'ndak', 'tak', 'tidak',
      // Particles (very Indonesian-specific)
      'banget', 'sih', 'dong', 'kok', 'nih', 'deh', 'loh', 'dah', 'kan',
      // Question words
      'gimana', 'bagaimana', 'kenapa', 'mengapa', 'apa', 'siapa', 'dimana', 'dimana', 
      'kapan', 'kapan', 'berapa', 'mana',
      // Common phrases
      'terima kasih', 'makasih', 'tolong', 'maaf', 'permisi', 'selamat', 'salam',
      // Adjectives (common in captions)
      'cantik', 'ganteng', 'bagus', 'keren', 'mantap', 'asik', 'asyik', 'keren',
      'bagus', 'indah', 'menarik', 'seru', 'asyik',
      // Verbs
      'minta', 'mau', 'ingin', 'perlu', 'harus', 'bisa', 'dapat',
      // More common words
      'kalau', 'jika', 'karena', 'jadi', 'tapi', 'tetapi', 'namun',
      'sampai', 'hingga', 'sambil', 'selama', 'sebelum', 'sesudah',
      // Numbers (Indonesian style)
      'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh'
    ])
    
    // Indonesian-specific patterns (very reliable indicators)
    const indonesianPatterns = [
      /\b(nggak|gak|enggak|ga|ngga|ndak|tak)\b/i, // Negation
      /\b(banget|sih|dong|kok|nih|deh|loh|dah|kan)\b/i, // Particles
      /\b(gimana|bagaimana|kenapa|mengapa|dimana|kapan|berapa)\b/i, // Question words
      /\b(makasih|terima kasih|tolong|maaf)\b/i, // Common phrases
      /\b(cantik|ganteng|bagus|keren|mantap|asik|asyik)\b/i, // Adjectives
      /\b(saya|aku|kamu|dia|kita|kami|kalian|mereka)\b/i, // Pronouns
    ]
    
    // Check patterns first (most reliable)
    for (const pattern of indonesianPatterns) {
      if (pattern.test(lowerText)) {
        return 'id' // Definitely Indonesian
      }
    }
    
    // Check for Indonesian words
    let indonesianCount = 0
    let totalWords = 0
    
    for (const word of words) {
      const cleanWord = word.replace(/[.,!?;:()\[\]{}'"]/g, '').toLowerCase()
      if (cleanWord.length > 0) {
        totalWords++
        if (indonesianWords.has(cleanWord)) {
          indonesianCount++
        }
      }
    }
    
    // If ANY Indonesian word found, it's Indonesian (very sensitive)
    if (indonesianCount > 0) {
      return 'id'
    }
    
    // Check for common English words to confirm it's English
    const commonEnglishWords = ['the', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 
                                'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'might',
                                'this', 'that', 'these', 'those', 'a', 'an', 'and', 'or', 'but', 'if', 'when',
                                'where', 'what', 'who', 'why', 'how', 'i', 'you', 'he', 'she', 'it', 'we', 'they']
    
    let englishCount = 0
    for (const word of words) {
      const cleanWord = word.replace(/[.,!?;:()\[\]{}'"]/g, '').toLowerCase()
      if (commonEnglishWords.includes(cleanWord)) {
        englishCount++
      }
    }
    
    // If has English words and no Indonesian words, it's English
    if (englishCount > 0 && indonesianCount === 0) {
      return 'en'
    }
    
    // Default: if we can't tell, assume Indonesian (since user prefers Indonesian)
    return 'id'
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
    // ALWAYS detect language from the CURRENT text the user has typed
    // This is the most important - we MUST follow what user actually typed
    let detectedLang = detectLanguage(currentText)
    
    // If we detected language from current text, use it immediately
    if (detectedLang) {
      setPreferredLanguage(detectedLang) // Save it
    } else {
      // If no text to detect from, use saved preference (which was set when user typed)
      // If no preference exists, default to Indonesian
      detectedLang = preferredLanguage || 'id'
    }
    
    // Generate text in the language we detected from user's input
    const generatedText = generateText(styleId, isBoy, detectedLang)
    
    if (isBoy) {
      setBoyStyle(styleId)
      setBoyText(generatedText)
    } else {
      setGirlStyle(styleId)
      setGirlText(generatedText)
    }
  }
  
  // Detect and save language preference in real-time as user types
  const handleTextChange = (newText, isBoy) => {
    if (isBoy) {
      setBoyText(newText)
    } else {
      setGirlText(newText)
    }
    
    // IMMEDIATELY detect and save language preference when user types
    // This ensures we always follow what the user is typing
    const detectedLang = detectLanguage(newText)
    if (detectedLang) {
      setPreferredLanguage(detectedLang) // Save immediately so next style click uses this language
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

