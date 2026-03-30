import React from 'react'
import './LandingPage.css'

const LandingPage = ({ onStart }) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Fake News Detector</h1>
        <p className="subtitle">Empowering Students with Media Literacy</p>
        
        <div className="mission-statement">
          <p>
            Misinformation spreads quickly through online news and social media, making it hard 
            for students to differentiate between reliable and fake information. This tool helps 
            analyze articles, assess credibility, and provide concise, trustworthy summaries.
          </p>
        </div>
        
        <div className="features">
          <div className="feature-card">
            <h3>📰 News Analysis</h3>
            <p>Detect fake news articles and verify credibility of sources</p>
          </div>
          
          <div className="feature-card">
            <h3>🎓 Education Verification</h3>
            <p>Identify fake internships, courses, and educational links</p>
          </div>
          
          <div className="feature-card">
            <h3>🔍 Smart Detection</h3>
            <p>Advanced algorithms detect common fake content patterns</p>
          </div>
          
          <div className="feature-card">
            <h3>📚 Educational</h3>
            <p>Learn media literacy skills while checking content</p>
          </div>
        </div>
        
        <div className="cta-section">
          <button className="start-button" onClick={onStart}>
            Start Detecting Fake Content
          </button>
        </div>
        
        <div className="target-audience">
          <p>Designed specifically for first-generation learners and students from rural areas</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage