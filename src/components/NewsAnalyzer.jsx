import React, { useState } from 'react'
import AnalysisResult from './AnalysisResult'
import { analyzeText } from '../utils/analyzer'
import './NewsAnalyzer.css'

const NewsAnalyzer = ({ onReset }) => {
  const [articleText, setArticleText] = useState('')
  const [url, setUrl] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Combine URL and text for analysis
    const fullContent = `${url} ${articleText}`
    
    // Simulate API call to analyze the article
    // In a real implementation, this would connect to a backend service
    setTimeout(() => {
      const result = analyzeText(fullContent)
      setAnalysisResult(result)
      setIsLoading(false)
    }, 1500)
  }

  const resetForm = () => {
    setArticleText('')
    setUrl('')
    setAnalysisResult(null)
    if (onReset) onReset()
  }

  return (
    <div className="news-analyzer">
      <h2>Analyze News Articles</h2>
      
      {!analysisResult ? (
        <form onSubmit={handleSubmit} className="analysis-form">
          <div className="input-group">
            <label htmlFor="url">News URL:</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/news-article"
            />
          </div>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <div className="input-group">
            <label htmlFor="article">Paste Article Text:</label>
            <textarea
              id="article"
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              placeholder="Copy and paste the full article text here..."
              rows="8"
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" disabled={isLoading || (!articleText && !url)}>
              {isLoading ? 'Analyzing...' : 'Analyze Article'}
            </button>
            <button type="button" onClick={resetForm} className="secondary-button">
              Back to Main
            </button>
          </div>
        </form>
      ) : (
        <AnalysisResult result={analysisResult} onReset={resetForm} />
      )}
      
      <div className="tips-section">
        <h3>Tips for Identifying Fake News</h3>
        <ul>
          <li>Check the source - Is it a reputable news organization?</li>
          <li>Look at the author - Are they qualified to write on this topic?</li>
          <li>Examine the date - Is this current or old news being shared again?</li>
          <li>Check the evidence - Are claims backed up by facts and sources?</li>
          <li>Be skeptical of emotional language or sensational headlines</li>
          <li>Verify with other sources - Do multiple reputable outlets report the same story?</li>
          <li>Check for bias - Does the article present multiple viewpoints?</li>
        </ul>
      </div>
    </div>
  )
}

export default NewsAnalyzer