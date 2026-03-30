import React, { useState } from 'react';
import NewsAnalyzer from './NewsAnalyzer';
import EducationAnalyzer from './EducationAnalyzer';
import FakeContentLanding from './FakeContentLanding';
import './FakeContentDetector.css';

const FakeContentDetector = ({ onReset }) => {
  const [currentScreen, setCurrentScreen] = useState(0); // 0=landing, 1=news, 2=edu
  const [showResult, setShowResult] = useState(false);

  const goToNews = () => setCurrentScreen(1);
  const goToEdu = () => setCurrentScreen(2);
  const backToLanding = () => {
    setCurrentScreen(0);
    setShowResult(false);
  };

  if (currentScreen === 0) {
    return <FakeContentLanding onStart={goToNews} />;
  }

  return (
    <div className="detector-container">
      <div>
        <div className="tabs-container">
          <button 
            className={`tab-button ${currentScreen === 1 ? 'active' : ''}`}
            onClick={() => setCurrentScreen(1)}
          >
            News Articles
          </button>
          <button 
            className={`tab-button ${currentScreen === 2 ? 'active' : ''}`}
            onClick={goToEdu}
          >
            Education Content
          </button>
        </div>
        {currentScreen === 1 ? (
          <NewsAnalyzer onReset={backToLanding} />
        ) : (
          <EducationAnalyzer onReset={backToLanding} />
        )}
      </div>
    </div>
  );
};

export default FakeContentDetector;

