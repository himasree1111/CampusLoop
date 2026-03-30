import React from 'react'
import './AnalysisResult.css'

const AnalysisResult = ({ result, onReset }) => {
  const getCredibilityColor = (credibility) => {
    switch (credibility) {
      case 'Likely Credible':
        return '#27ae60'
      case 'Likely Fake':
        return '#e74c3c'
      default:
        return '#f39c12'
    }
  }

  // Function to get category with highest score
  const getTopCategory = (categoryScores) => {
    if (!categoryScores) return null;
    return Object.keys(categoryScores).reduce((a, b) => 
      categoryScores[a] > categoryScores[b] ? a : b, null
    );
  }

  const topFakeCategory = getTopCategory(result.categoryScores);
  const topCredibleCategory = getTopCategory(result.credibleCategoryScores);

  return (
    <div className="analysis-result">
      <div className="result-header">
        <h2>Analysis Result</h2>
        <button onClick={onReset} className="reset-button">
          Analyze Another Article
        </button>
      </div>

      <div className="credibility-score">
        <div 
          className="credibility-badge"
          style={{ backgroundColor: getCredibilityColor(result.credibility) }}
        >
          {result.credibility}
        </div>
        <div className="confidence-meter">
          <div className="confidence-label">
            Confidence: {result.confidence}%
          </div>
          <div className="confidence-bar">
            <div 
              className="confidence-fill"
              style={{ 
                width: `${result.confidence}%`,
                backgroundColor: getCredibilityColor(result.credibility)
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="summary-section">
        <h3>Summary</h3>
        <p>{result.summary}</p>
        {result.isWhatsAppForward && (
          <div className="warning-box">
            <strong>WhatsApp Forward Detected:</strong> This content was forwarded on social media. 
            Forwarded messages are often unverified and can contain misinformation.
          </div>
        )}
      </div>

      <div className="score-breakdown">
        <div className="score-card">
          <h4>Fake Indicators Score</h4>
          <p className="score-value">{result.fakeScore}</p>
          <p>Higher score indicates more red flags</p>
          {topFakeCategory && (
            <p className="category-info">Top category: {topFakeCategory}</p>
          )}
        </div>
        
        <div className="score-card">
          <h4>Credible Indicators Score</h4>
          <p className="score-value">{result.credibleScore}</p>
          <p>Higher score indicates trustworthy content</p>
          {topCredibleCategory && (
            <p className="category-info">Top category: {topCredibleCategory}</p>
          )}
        </div>
      </div>

      <div className="details-section">
        <div className="detail-card">
          <h4>Suspicious Indicators</h4>
          <p className="detail-value">{result.fakeIndicators}</p>
          <p className="detail-description">Red flags found in the content</p>
          {result.detectedIndicators && result.detectedIndicators.length > 0 && (
            <div className="detected-items">
              <p>Detected: {result.detectedIndicators.join(', ')}</p>
            </div>
          )}
        </div>
        
        <div className="detail-card">
          <h4>Credible Sources</h4>
          <p className="detail-value">{result.credibleSources}</p>
          <p className="detail-description">Recognized trustworthy sources</p>
          {result.detectedSources && result.detectedSources.length > 0 && (
            <div className="detected-items">
              <p>Detected: {result.detectedSources.join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="recommendations-section">
        <h3>Recommendations</h3>
        <ul>
          {result.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AnalysisResult