import React, { useState } from 'react'
import { analyzeText, extractDomain, isReliableDomain, isUnreliableDomain } from '../utils/analyzer'
import './EducationAnalyzer.css'

const EducationAnalyzer = ({ onReset }) => {
  const [contentUrl, setContentUrl] = useState('')
  const [contentText, setContentText] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [contentType, setContentType] = useState('internship') // internship, course, link

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Combine URL and text for analysis
    const fullContent = `${contentUrl} ${contentText}`
    
    // Simulate API call
    setTimeout(() => {
      const result = analyzeEducationalContent(fullContent, contentType)
      setAnalysisResult(result)
      setIsLoading(false)
    }, 1500)
  }

  const analyzeEducationalContent = (text, type) => {
    const baseAnalysis = analyzeText(text)
    
    // Enhance analysis for educational content
    let educationSpecific = {}
    
    switch (type) {
      case 'internship':
        educationSpecific = {
          title: 'Internship Opportunity Analysis',
          redFlags: [
            'No company information provided',
            'Guaranteed placement without interview',
            'Upfront payment required',
            'Vague job responsibilities',
            'No contact information for employer',
            'Unrealistic salary promises',
            'No clear start/end dates',
            'Pressure to sign immediately'
          ],
          greenFlags: [
            'Clear company description with verifiable details',
            'Defined role and responsibilities',
            'Professional contact information',
            'Linked to established organization',
            'Realistic expectations and requirements',
            'Clear timeline and process',
            'Professional communication',
            'Reviews from previous interns'
          ]
        }
        break
      case 'course':
        educationSpecific = {
          title: 'Online Course Analysis',
          redFlags: [
            'No instructor credentials',
            'Lifetime access for free',
            'Guaranteed career outcomes',
            'No curriculum details',
            'Unrealistic promises',
            'No student reviews or testimonials',
            'Unclear certification process',
            'Pressure to buy immediately'
          ],
          greenFlags: [
            'Accredited institution or recognized platform',
            'Detailed curriculum with learning objectives',
            'Instructor qualifications and experience',
            'Student reviews and ratings available',
            'Clear learning outcomes and assessment',
            'Recognized certification or credential',
            'Regular updates to course content',
            'Clear refund policy'
          ]
        }
        break
      case 'link':
        educationSpecific = {
          title: 'Educational Link Analysis',
          redFlags: [
            'Shortened URLs',
            'Suspicious domain names',
            'Too good to be true offers',
            'Poor website design',
            'No contact information',
            'Grammatical errors and typos',
            'Urgent or pressuring language',
            'Requests for personal information'
          ],
          greenFlags: [
            'Official educational domains (.edu, .gov)',
            'Secure connection (HTTPS)',
            'Professional design and layout',
            'Clear about the source and purpose',
            'Contact information available',
            'Proper grammar and spelling',
            'Transparent about offerings',
            'Privacy policy available'
          ]
        }
        break
      default:
        educationSpecific = {
          title: 'Educational Content Analysis',
          redFlags: [],
          greenFlags: []
        }
    }
    
    return {
      ...baseAnalysis,
      ...educationSpecific,
      contentType: type
    }
  }

  const resetForm = () => {
    setContentUrl('')
    setContentText('')
    setAnalysisResult(null)
    setContentType('internship')
    if (onReset) onReset()
  }

  return (
    <div className="education-analyzer">
      <h2>Fake Education Content Detector</h2>
      <p className="subtitle">Verify internships, courses, and educational links</p>
      
      {!analysisResult ? (
        <form onSubmit={handleSubmit} className="analysis-form">
          <div className="content-type-selector">
            <label>Content Type:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="internship"
                  checked={contentType === 'internship'}
                  onChange={(e) => setContentType(e.target.value)}
                />
                Internship
              </label>
              <label>
                <input
                  type="radio"
                  value="course"
                  checked={contentType === 'course'}
                  onChange={(e) => setContentType(e.target.value)}
                />
                Online Course
              </label>
              <label>
                <input
                  type="radio"
                  value="link"
                  checked={contentType === 'link'}
                  onChange={(e) => setContentType(e.target.value)}
                />
                Educational Link
              </label>
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="url">URL:</label>
            <input
              type="url"
              id="url"
              value={contentUrl}
              onChange={(e) => setContentUrl(e.target.value)}
              placeholder="https://example.com/internship-opportunity"
            />
          </div>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <div className="input-group">
            <label htmlFor="content">Content Description:</label>
            <textarea
              id="content"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="Paste the full description of the internship, course, or link..."
              rows="6"
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" disabled={isLoading || (!contentUrl && !contentText)}>
              {isLoading ? 'Analyzing...' : 'Analyze Content'}
            </button>
            <button type="button" onClick={resetForm} className="secondary-button">
              Back to Main
            </button>
          </div>
        </form>
      ) : (
        <div className="analysis-result">
          <div className="result-header">
            <h3>{analysisResult.title}</h3>
            <button onClick={resetForm} className="reset-button">
              Analyze Another
            </button>
          </div>
          
          <div className="credibility-score">
            <div 
              className="credibility-badge"
              style={{ 
                backgroundColor: analysisResult.credibility === 'Likely Credible' ? '#27ae60' : 
                                analysisResult.credibility === 'Likely Fake' ? '#e74c3c' : '#f39c12' 
              }}
            >
              {analysisResult.credibility}
            </div>
            <div className="confidence-meter">
              <div className="confidence-label">
                Confidence: {analysisResult.confidence}%
              </div>
              <div className="confidence-bar">
                <div 
                  className="confidence-fill"
                  style={{ 
                    width: `${analysisResult.confidence}%`,
                    backgroundColor: analysisResult.credibility === 'Likely Credible' ? '#27ae60' : 
                                    analysisResult.credibility === 'Likely Fake' ? '#e74c3c' : '#f39c12' 
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="summary-section">
            <h4>Summary</h4>
            <p>{analysisResult.summary}</p>
            {analysisResult.isWhatsAppForward && (
              <div className="warning-box">
                <strong>WhatsApp Forward Detected:</strong> This content was forwarded on social media. 
                Forwarded messages are often unverified and can contain misinformation.
              </div>
            )}
          </div>
          
          <div className="score-breakdown">
            <div className="score-card">
              <h4>Fake Indicators Score</h4>
              <p className="score-value">{analysisResult.fakeScore}</p>
              <p>Higher score indicates more red flags</p>
              {analysisResult.categoryScores && Object.keys(analysisResult.categoryScores).length > 0 && (
                <p className="category-info">
                  Top category: {Object.keys(analysisResult.categoryScores).reduce((a, b) => 
                    analysisResult.categoryScores[a] > analysisResult.categoryScores[b] ? a : b)}
                </p>
              )}
            </div>
            
            <div className="score-card">
              <h4>Credible Indicators Score</h4>
              <p className="score-value">{analysisResult.credibleScore}</p>
              <p>Higher score indicates trustworthy content</p>
              {analysisResult.credibleCategoryScores && Object.keys(analysisResult.credibleCategoryScores).length > 0 && (
                <p className="category-info">
                  Top category: {Object.keys(analysisResult.credibleCategoryScores).reduce((a, b) => 
                    analysisResult.credibleCategoryScores[a] > analysisResult.credibleCategoryScores[b] ? a : b)}
                </p>
              )}
            </div>
          </div>
          
          <div className="details-grid">
            <div className="detail-card">
              <h4>Red Flags</h4>
              <ul>
                {analysisResult.redFlags.slice(0, 5).map((flag, index) => (
                  <li key={index}>{flag}</li>
                ))}
              </ul>
              {analysisResult.detectedIndicators && analysisResult.detectedIndicators.length > 0 && (
                <div className="detected-indicators">
                  <h5>Detected in Content:</h5>
                  <ul>
                    {analysisResult.detectedIndicators.map((indicator, index) => (
                      <li key={index}>{indicator}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="detail-card">
              <h4>Positive Indicators</h4>
              <ul>
                {analysisResult.greenFlags.slice(0, 5).map((flag, index) => (
                  <li key={index}>{flag}</li>
                ))}
              </ul>
              {analysisResult.detectedSources && analysisResult.detectedSources.length > 0 && (
                <div className="detected-indicators">
                  <h5>Recognized Sources:</h5>
                  <ul>
                    {analysisResult.detectedSources.map((source, index) => (
                      <li key={index}>{source}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className="recommendations-section">
            <h4>Recommendations</h4>
            <ul>
              {analysisResult.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      <div className="education-tips">
        <h3>Tips for Verifying Educational Content</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Internships</h4>
            <ul>
              <li>Research the company thoroughly through official channels</li>
              <li>Verify contact information independently</li>
              <li>Be wary of unpaid opportunities that benefit the company</li>
              <li>Look for reviews from previous interns</li>
              <li>Legitimate internships rarely require upfront payments</li>
              <li>Official internships have clear application processes</li>
            </ul>
          </div>
          
          <div className="tip-card">
            <h4>Online Courses</h4>
            <ul>
              <li>Check instructor credentials and affiliations</li>
              <li>Look for detailed curriculum and learning outcomes</li>
              <li>Read student reviews from multiple sources</li>
              <li>Verify accreditation if relevant to your goals</li>
              <li>Understand the certification and its value</li>
              <li>Check for regular content updates</li>
            </ul>
          </div>
          
          <div className="tip-card">
            <h4>Educational Links</h4>
            <ul>
              <li>Check the domain extension (.edu, .gov are generally reliable)</li>
              <li>Hover over links to see the destination before clicking</li>
              <li>Be cautious of shortened URLs in messages</li>
              <li>Verify the source before sharing with others</li>
              <li>Look for official contact information and "About Us" pages</li>
              <li>Be suspicious of requests for personal information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducationAnalyzer