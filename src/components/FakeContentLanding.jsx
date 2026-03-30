import React from 'react';
import './FakeContentLanding.css';

const FakeContentLanding = ({ onStart }) => {
  return (
    <div className="fake-content-landing">
      <div className="landing-header">
        <h1 className="landing-title">Fake News Detector</h1>
        <p className="landing-subtitle">
          Empower yourself with media literacy. Instantly analyze news articles and educational content to 
          separate fact from fiction. Our AI-powered detection identifies fake news, scams, and misinformation 
          before they spread.
        </p>
      </div>

      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-icon">📰</div>
          <h3 className="feature-title">News Analysis</h3>
          <p className="feature-desc">Verify news articles, check sources, detect sensationalism and bias in seconds.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎓</div>
          <h3 className="feature-title">Education Verification</h3>
          <p className="feature-desc">Spot fake internships, scam courses, and fraudulent educational opportunities.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3 className="feature-title">Smart Detection</h3>
          <p className="feature-desc">AI analyzes language patterns, source credibility, and content quality automatically.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3 className="feature-title">Educational Resources</h3>
          <p className="feature-desc">Learn how to identify fake content with our comprehensive media literacy guides.</p>
        </div>
      </div>

      <button className="start-button" onClick={onStart}>
        Start Detecting Fake Content
      </button>
    </div>
  );
};

export default FakeContentLanding;

