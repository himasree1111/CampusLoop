/**
 * Fake News Detection Algorithm
 * This module contains heuristics for detecting fake news.
 * In a production environment, this would be replaced with ML models.
 */

// Common fake news indicators with weights and categories
const FAKE_INDICATORS = [
  // Sensational language (high weight)
  { text: 'shocking', weight: 3, category: 'sensational' },
  { text: 'unbelievable', weight: 3, category: 'sensational' },
  { text: 'you won\'t believe', weight: 3, category: 'sensational' },
  { text: 'this changes everything', weight: 3, category: 'sensational' },
  { text: 'jaw dropping', weight: 3, category: 'sensational' },
  
  // Conspiracy theories (high weight)
  { text: 'deep state', weight: 3, category: 'conspiracy' },
  { text: 'globalist agenda', weight: 3, category: 'conspiracy' },
  { text: 'new world order', weight: 3, category: 'conspiracy' },
  { text: 'agenda 21', weight: 2, category: 'conspiracy' },
  { text: 'chemtrails', weight: 2, category: 'conspiracy' },
  { text: 'crisis actor', weight: 2, category: 'conspiracy' },
  
  // Emotional manipulation (medium weight)
  { text: 'fight back', weight: 2, category: 'emotional' },
  { text: 'wake up', weight: 2, category: 'emotional' },
  { text: 'sheeple', weight: 2, category: 'emotional' },
  { text: 'truth bomb', weight: 2, category: 'emotional' },
  { text: 'exposed', weight: 2, category: 'emotional' },
  
  // Misleading phrases (medium weight)
  { text: 'study reveals', weight: 2, category: 'misleading' },
  { text: 'research shows', weight: 2, category: 'misleading' },
  { text: 'according to experts', weight: 2, category: 'misleading' },
  { text: 'doctors hate this', weight: 2, category: 'misleading' },
  { text: 'politicians don\'t want', weight: 2, category: 'misleading' },
  
  // Fake educational content indicators (high weight)
  { text: 'get rich quick', weight: 3, category: 'educational' },
  { text: 'work from home', weight: 2, category: 'educational' },
  { text: 'make money fast', weight: 3, category: 'educational' },
  { text: 'no experience required', weight: 2, category: 'educational' },
  { text: 'guaranteed job', weight: 3, category: 'educational' },
  { text: '100% placement', weight: 3, category: 'educational' },
  { text: 'instant certification', weight: 3, category: 'educational' },
  { text: 'no exam required', weight: 2, category: 'educational' },
  { text: 'lifetime access', weight: 1, category: 'educational' },
  { text: 'exclusive offer', weight: 2, category: 'educational' },
  { text: 'limited time', weight: 1, category: 'educational' },
  { text: 'act now', weight: 1, category: 'educational' },
  
  // WhatsApp-specific indicators
  { text: 'forwarded', weight: 2, category: 'social' },
  { text: 'please share', weight: 2, category: 'social' },
  { text: 'urgent', weight: 2, category: 'social' },
  { text: 'important message', weight: 1, category: 'social' },
  { text: 'viral', weight: 1, category: 'social' },
  
  // Medical misinformation indicators
  { text: 'miracle cure', weight: 3, category: 'medical' },
  { text: 'cure for cancer', weight: 3, category: 'medical' },
  { text: 'government hiding', weight: 2, category: 'medical' },
  { text: 'big pharma', weight: 2, category: 'medical' },
  
  // Financial scam indicators
  { text: 'investment opportunity', weight: 2, category: 'financial' },
  { text: 'limited offer', weight: 1, category: 'financial' },
  { text: 'risk free', weight: 1, category: 'financial' },
  { text: 'guaranteed returns', weight: 3, category: 'financial' }
]

// Credible source indicators with weights and categories
const CREDIBLE_SOURCES = [
  // Established news organizations
  { text: 'reuters', weight: 3, category: 'news' },
  { text: 'associated press', weight: 3, category: 'news' },
  { text: 'bbc', weight: 3, category: 'news' },
  { text: 'npr', weight: 3, category: 'news' },
  { text: 'pbs', weight: 3, category: 'news' },
  { text: 'cnn', weight: 2, category: 'news' },
  { text: 'fox news', weight: 2, category: 'news' },
  { text: 'the guardian', weight: 3, category: 'news' },
  { text: 'washington post', weight: 3, category: 'news' },
  { text: 'new york times', weight: 3, category: 'news' },
  
  // Academic institutions
  { text: 'harvard', weight: 3, category: 'academic' },
  { text: 'mit', weight: 3, category: 'academic' },
  { text: 'stanford', weight: 3, category: 'academic' },
  { text: 'yale', weight: 3, category: 'academic' },
  { text: 'princeton', weight: 3, category: 'academic' },
  { text: 'oxford', weight: 3, category: 'academic' },
  { text: 'cambridge', weight: 3, category: 'academic' },
  { text: 'johns hopkins', weight: 3, category: 'academic' },
  { text: 'berkeley', weight: 3, category: 'academic' },
  
  // Scientific publications
  { text: 'nature', weight: 3, category: 'scientific' },
  { text: 'science', weight: 3, category: 'scientific' },
  { text: 'scientific american', weight: 2, category: 'scientific' },
  { text: 'cell', weight: 3, category: 'scientific' },
  { text: 'the lancet', weight: 3, category: 'scientific' },
  
  // Fact-checking organizations
  { text: 'snopes', weight: 3, category: 'factcheck' },
  { text: 'factcheck.org', weight: 3, category: 'factcheck' },
  { text: 'politifact', weight: 3, category: 'factcheck' },
  { text: 'lead stories', weight: 2, category: 'factcheck' },
  
  // Accredited educational institutions and platforms
  { text: 'coursera', weight: 2, category: 'educational' },
  { text: 'edx', weight: 2, category: 'educational' },
  { text: 'udemy', weight: 1, category: 'educational' },
  { text: 'khan academy', weight: 3, category: 'educational' },
  { text: 'linkedin learning', weight: 2, category: 'educational' },
  { text: 'google career certificates', weight: 3, category: 'educational' },
  { text: 'ibm', weight: 2, category: 'educational' },
  { text: 'microsoft learn', weight: 2, category: 'educational' },
  { text: 'aws training', weight: 2, category: 'educational' },
  { text: 'accredited', weight: 2, category: 'educational' },
  { text: 'certification', weight: 1, category: 'educational' },
  { text: 'university', weight: 2, category: 'educational' },
  { text: 'college', weight: 1, category: 'educational' }
]

// Reliable domains
const RELIABLE_DOMAINS = [
  '.gov', '.edu', '.org', // Generally more reliable
  'reuters.com', 'apnews.com', 'bbc.com', 'npr.org', 'pbs.org',
  'coursera.org', 'edx.org', 'khanacademy.org',
  'nature.com', 'science.org', 'sciencemag.org',
  'who.int', 'cdc.gov', 'nih.gov' // Health authorities
]

// Unreliable domains
const UNRELIABLE_DOMAINS = [
  'buzzfeed.com', 'clickhole.com', 'theonion.com', // Satirical sites
  'freecoursesite.com', 'tutorialspace.com', 'getallcourse.com', // Fake educational sites
  'naturalnews.com', 'infowars.com', 'prisonplanet.com' // Known unreliable sources
]

// Patterns for detecting fake content
const SUSPICIOUS_PATTERNS = [
  // Excessive punctuation
  { pattern: /!{3,}/g, weight: 1, description: 'Excessive exclamation marks' },
  { pattern: /\?{3,}/g, weight: 1, description: 'Excessive question marks' },
  
  // All caps phrases
  { pattern: /\b[A-Z]{5,}\b/g, weight: 1, description: 'Excessive capitalization' },
  
  // Numbers that seem too good to be true
  { pattern: /\b\d+% guaranteed\b/g, weight: 2, description: 'Unrealistic guarantees' },
  { pattern: /\b\d+x return\b/g, weight: 2, description: 'Unrealistic returns' },
  
  // Emotional language
  { pattern: /\b(disgusting|outrageous|scandalous)\b/g, weight: 2, description: 'Emotional language' }
]

/**
 * Analyze text for fake news indicators with improved accuracy
 * @param {string} text - The text to analyze
 * @returns {Object} Analysis results
 */
export function analyzeText(text) {
  if (!text || text.length < 10) {
    return {
      credibility: 'Insufficient Data',
      confidence: 10,
      summary: 'The provided text is too short to analyze effectively.',
      fakeScore: 0,
      credibleScore: 0,
      recommendations: [
        'Provide a longer article for better analysis',
        'Include the source URL if available'
      ],
      categoryScores: {}
    }
  }
  
  const lowerText = text.toLowerCase()
  
  // Calculate fake score by category
  let fakeScore = 0
  const fakeMatches = []
  const categoryScores = {}
  
  FAKE_INDICATORS.forEach(indicator => {
    const count = (lowerText.match(new RegExp(indicator.text, 'g')) || []).length;
    if (count > 0) {
      const score = indicator.weight * count;
      fakeScore += score
      fakeMatches.push(indicator.text)
      
      // Track category scores
      if (!categoryScores[indicator.category]) {
        categoryScores[indicator.category] = 0
      }
      categoryScores[indicator.category] += score
    }
  })
  
  // Check for suspicious patterns
  SUSPICIOUS_PATTERNS.forEach(patternObj => {
    const matches = (text.match(patternObj.pattern) || []).length;
    if (matches > 0) {
      const score = patternObj.weight * matches;
      fakeScore += score
      // Add to category scores
      if (!categoryScores['patterns']) {
        categoryScores['patterns'] = 0
      }
      categoryScores['patterns'] += score
    }
  })
  
  // Calculate credible score by category
  let credibleScore = 0
  const credibleMatches = []
  const credibleCategoryScores = {}
  
  CREDIBLE_SOURCES.forEach(source => {
    const count = (lowerText.match(new RegExp(source.text, 'g')) || []).length;
    if (count > 0) {
      const score = source.weight * count;
      credibleScore += score
      credibleMatches.push(source.text)
      
      // Track category scores
      if (!credibleCategoryScores[source.category]) {
        credibleCategoryScores[source.category] = 0
      }
      credibleCategoryScores[source.category] += score
    }
  })
  
  // Check domain reliability
  const domainMatches = checkDomainReliability(text)
  let domainScore = 0
  if (domainMatches.isReliable) {
    domainScore = 5 // Higher weight for domain reliability
    if (!credibleCategoryScores['domain']) {
      credibleCategoryScores['domain'] = 0
    }
    credibleCategoryScores['domain'] += domainScore
    credibleScore += domainScore
  } else if (domainMatches.isUnreliable) {
    domainScore = 5 // Higher weight for unreliable domains
    if (!categoryScores['domain']) {
      categoryScores['domain'] = 0
    }
    categoryScores['domain'] += domainScore
    fakeScore += domainScore
  }
  
  // Adjust scores based on content length and quality
  const lengthAdjustment = Math.min(1.5, Math.max(0.5, text.length / 500))
  fakeScore = fakeScore * lengthAdjustment
  credibleScore = credibleScore * lengthAdjustment
  
  // Special handling for URLs - check if it's just a URL without content
  const hasUrls = /https?:\/\/[^\s]+/.test(text);
  const isJustUrl = hasUrls && text.trim().length < 100 && (text.trim().startsWith('http') || text.trim().startsWith('www'));
  
  if (isJustUrl) {
    // If it's just a URL, rely more heavily on domain analysis
    if (domainMatches.isReliable) {
      credibleScore = 20 + domainScore;
      fakeScore = Math.max(0, fakeScore - 10);
    } else if (domainMatches.isUnreliable) {
      fakeScore = 20 + domainScore;
      credibleScore = Math.max(0, credibleScore - 10);
    } else {
      // For unknown domains, provide a moderate confidence level
      fakeScore = 10;
      credibleScore = 10;
    }
  }
  
  // Special handling for WhatsApp forwards
  let isWhatsAppForward = false
  if (lowerText.includes('forwarded') || lowerText.includes('whatsapp')) {
    isWhatsAppForward = true
    // Apply additional weight to existing scores
    if (fakeScore > credibleScore) {
      fakeScore *= 1.3 // Increase fake score for WhatsApp forwards
    }
  }
  
  // Determine credibility score with improved nuance
  let credibility = 'Unknown'
  let confidence = 0
  let summary = ''
  
  // More nuanced scoring system
  const totalScore = fakeScore + credibleScore
  const fakePercentage = totalScore > 0 ? (fakeScore / totalScore) * 100 : 0
  const crediblePercentage = totalScore > 0 ? (credibleScore / totalScore) * 100 : 0
  
  // Improved decision logic
  if (fakePercentage > 75) {
    credibility = 'Likely Fake'
    confidence = Math.min(95, 60 + fakePercentage / 3)
    summary = 'This content contains several strong indicators of unreliable information. Be cautious and verify with trusted sources.'
  } else if (crediblePercentage > 75) {
    credibility = 'Likely Credible'
    confidence = Math.min(95, 60 + crediblePercentage / 3)
    summary = 'This content appears to come from credible sources. However, always cross-reference important information with multiple trusted sources.'
  } else if (fakePercentage > 60) {
    credibility = 'Potentially Unreliable'
    confidence = Math.min(85, 40 + fakePercentage / 3)
    summary = 'This content contains concerning indicators. We recommend verifying this information before sharing.'
  } else if (crediblePercentage > 60) {
    credibility = 'Likely Credible'
    confidence = Math.min(85, 50 + crediblePercentage / 3)
    summary = 'This content appears to be from credible sources. Consider checking one other source for important decisions.'
  } else if (fakePercentage > crediblePercentage && fakePercentage > 30) {
    credibility = 'Potentially Unreliable'
    confidence = Math.min(70, 30 + (fakePercentage - crediblePercentage))
    summary = 'This content has more red flags than positive indicators. Exercise caution and verify key claims.'
  } else if (crediblePercentage > fakePercentage && crediblePercentage > 30) {
    credibility = 'Likely Credible'
    confidence = Math.min(70, 30 + (crediblePercentage - fakePercentage))
    summary = 'This content has more positive indicators than red flags. Still, consider verifying with another source.'
  } else if (isJustUrl) {
    // Special handling for just URLs
    if (domainMatches.isReliable) {
      credibility = 'Likely Credible'
      confidence = 70
      summary = 'This URL appears to be from a credible domain. However, always verify the content of the page before trusting it.'
    } else if (domainMatches.isUnreliable) {
      credibility = 'Likely Fake'
      confidence = 70
      summary = 'This URL is from a domain known for unreliable content. Exercise caution when viewing content from this source.'
    } else {
      credibility = 'Cannot Determine'
      confidence = 40
      summary = 'We cannot determine the credibility of this URL. Please check the content of the page and verify with trusted sources.'
    }
  } else {
    credibility = 'Cannot Determine'
    confidence = 40
    summary = 'We cannot confidently determine the credibility of this content. Please check with trusted fact-checking websites.'
  }
  
  // Special handling for WhatsApp forwards
  if (isWhatsAppForward) {
    if (fakeScore > credibleScore) {
      credibility = 'Likely Fake'
      confidence = Math.min(90, confidence + 10)
      summary = 'This appears to be a forwarded message with several red flags. Forwarded messages on social platforms are often unverified and can contain misinformation.'
    } else {
      summary += ' This content was forwarded on social media. Even if it seems credible, it\'s always good to verify with original sources.'
    }
  }
  
  // Special handling for very short content
  if (text.length < 100 && !isJustUrl) {
    summary += ' Note: The content is quite short, which may affect analysis accuracy.'
    confidence = Math.min(confidence, 50)
  }
  
  return {
    credibility,
    confidence: Math.round(confidence),
    summary,
    fakeScore: Math.round(fakeScore),
    credibleScore: Math.round(credibleScore),
    recommendations: generateRecommendations(credibility, categoryScores, credibleCategoryScores),
    detectedIndicators: fakeMatches.slice(0, 5), // Show top 5 indicators
    detectedSources: credibleMatches.slice(0, 5), // Show top 5 sources
    categoryScores,
    credibleCategoryScores,
    isWhatsAppForward,
    isJustUrl
  }
}

/**
 * Check domain reliability
 * @param {string} text - The text to check for URLs
 * @returns {Object} Domain reliability information
 */
function checkDomainReliability(text) {
  // Simple URL extraction (in a real app, you'd use a more robust solution)
  const urlMatches = text.match(/https?:\/\/[^\s]+/g) || []
  
  for (const url of urlMatches) {
    try {
      const domain = new URL(url).hostname.replace('www.', '')
      
      const isReliable = RELIABLE_DOMAINS.some(reliable => 
        domain.includes(reliable)
      )
      
      const isUnreliable = UNRELIABLE_DOMAINS.some(unreliable => 
        domain.includes(unreliable)
      )
      
      if (isReliable || isUnreliable) {
        return { isReliable, isUnreliable, domain }
      }
      
      // If no match, check domain extensions
      if (domain.endsWith('.gov') || domain.endsWith('.edu')) {
        return { isReliable: true, isUnreliable: false, domain }
      }
    } catch (e) {
      // Invalid URL, continue
    }
  }
  
  return { isReliable: false, isUnreliable: false }
}

/**
 * Generate recommendations based on credibility assessment
 * @param {string} credibility - The credibility assessment
 * @param {Object} categoryScores - Fake indicator category scores
 * @param {Object} credibleCategoryScores - Credible indicator category scores
 * @returns {Array} List of recommendations
 */
function generateRecommendations(credibility, categoryScores, credibleCategoryScores) {
  const baseRecommendations = [
    'Cross-reference with multiple trusted sources',
    'Check the author\'s credentials and expertise',
    'Verify dates to ensure information is current',
    'Look for supporting evidence and citations'
  ]
  
  // Add category-specific recommendations
  const additionalRecommendations = []
  
  // If sensational language is high
  if (categoryScores.sensational > 5) {
    additionalRecommendations.push('Be especially cautious of sensational headlines that seem designed to provoke an emotional response')
  }
  
  // If conspiracy theories are present
  if (categoryScores.conspiracy > 3) {
    additionalRecommendations.push('Content with conspiracy theories should be verified with authoritative sources')
  }
  
  // If emotional manipulation is present
  if (categoryScores.emotional > 3) {
    additionalRecommendations.push('Be wary of content that uses emotionally charged language to influence your opinion')
  }
  
  // If educational content issues are present
  if (categoryScores.educational > 3) {
    additionalRecommendations.push('Verify educational opportunities through official channels before committing time or money')
  }
  
  // If financial scams are detected
  if (categoryScores.financial > 2) {
    additionalRecommendations.push('Financial opportunities that seem too good to be true usually are - verify with financial advisors')
  }
  
  // If medical misinformation is detected
  if (categoryScores.medical > 2) {
    additionalRecommendations.push('Medical claims should always be verified with healthcare professionals or authoritative medical sources')
  }
  
  switch (credibility) {
    case 'Likely Fake':
      return [
        'Do not share this content without verification',
        'Report suspicious content to platform moderators',
        ...baseRecommendations,
        'Consult fact-checking websites like Snopes or PolitiFact',
        ...additionalRecommendations
      ]
    case 'Potentially Unreliable':
      return [
        'Approach with skepticism and verify key claims',
        ...baseRecommendations,
        'Consider why someone might want to mislead about this topic',
        ...additionalRecommendations
      ]
    case 'Likely Credible':
      return [
        'This appears to be from a credible source',
        'Still consider checking one other source for important decisions',
        ...baseRecommendations.slice(2),
        ...additionalRecommendations
      ]
    default:
      return [
        'Exercise caution with this content',
        ...baseRecommendations,
        'When in doubt, consult your teacher or librarian',
        ...additionalRecommendations
      ]
  }
}

/**
 * Extract domain from URL
 * @param {string} url - The URL to extract domain from
 * @returns {string} Domain name
 */
export function extractDomain(url) {
  try {
    const domain = new URL(url).hostname.replace('www.', '')
    return domain
  } catch (e) {
    return ''
  }
}

/**
 * Check if domain is generally reliable
 * @param {string} domain - The domain to check
 * @returns {boolean} Whether domain is reliable
 */
export function isReliableDomain(domain) {
  if (!domain) return false
  
  // Check specific domains first
  const isSpecificReliable = RELIABLE_DOMAINS.some(reliable => 
    domain.includes(reliable)
  )
  
  if (isSpecificReliable) return true
  
  // Check domain extensions
  return domain.endsWith('.gov') || domain.endsWith('.edu') || domain.endsWith('.org')
}

/**
 * Check if domain is generally unreliable
 * @param {string} domain - The domain to check
 * @returns {boolean} Whether domain is unreliable
 */
export function isUnreliableDomain(domain) {
  if (!domain) return false
  
  return UNRELIABLE_DOMAINS.some(unreliable => 
    domain.includes(unreliable)
  )
}

export default {
  analyzeText,
  extractDomain,
  isReliableDomain,
  isUnreliableDomain
}