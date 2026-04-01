import React from 'react';
import './FakeContentLanding.css';

const FakeContentLanding = ({ onStart }) => {
  return (
    <div className="fake-content-landing">
      <div className="landing-header">
<h1 className="landing-title">Fake Content Detector</h1>
        <p className="landing-subtitle">
          Empower yourself with media literacy. Instantly analyze news articles and educational content to 
          separate fact from fiction. Our AI-powered detection identifies fake news, scams, and misinformation 
          before they spread.
        </p>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="feature-card group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center">
          <div className="feature-icon mb-4 text-4xl group-hover:scale-110 transition-transform">📰</div>
          <h3 className="feature-title text-xl font-bold mb-3">News Analysis</h3>
          <p className="feature-desc text-gray-700 leading-relaxed">Verify news articles, check sources, detect sensationalism and bias in seconds.</p>
        </div>

        <div className="feature-card group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center">
          <div className="feature-icon mb-4 text-4xl group-hover:scale-110 transition-transform">🎓</div>
          <h3 className="feature-title text-xl font-bold mb-3">Education Verification</h3>
          <p className="feature-desc text-gray-700 leading-relaxed">Spot fake internships, scam courses, and fraudulent educational opportunities.</p>
        </div>

        <div className="feature-card group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center">
          <div className="feature-icon mb-4 text-4xl group-hover:scale-110 transition-transform">🧠</div>
          <h3 className="feature-title text-xl font-bold mb-3">Smart Detection</h3>
          <p className="feature-desc text-gray-700 leading-relaxed">AI analyzes language patterns, source credibility, and content quality automatically.</p>
        </div>

        <div className="feature-card group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center">
          <div className="feature-icon mb-4 text-4xl group-hover:scale-110 transition-transform">📚</div>
          <h3 className="feature-title text-xl font-bold mb-3">Educational Resources</h3>
          <p className="feature-desc text-gray-700 leading-relaxed">Learn how to identify fake content with our comprehensive media literacy guides.</p>
        </div>
      </div>

      <button className="start-button" onClick={onStart}>
        Start Detecting Fake Content
      </button>
    </div>
  );
};

export default FakeContentLanding;

