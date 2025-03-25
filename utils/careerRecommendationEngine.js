// utils/careerRecommendationEngine.js

/**
 * Calculate career matches based on assessment data
 * @param {Object} assessment - User assessment data
 * @param {Array} careers - List of career options
 * @returns {Array} - Recommended careers with match percentages
 * 
 */
function calculateCareerMatches(assessment, careers) {
    const { careerTest, skillsAssessment, personalityAssessment } = assessment;
    
    // Map responses to meaningful traits
    const userTraits = extractUserTraits(careerTest, skillsAssessment, personalityAssessment);
    
    // Calculate match scores for each career
    const scoredCareers = careers.map(career => {
      const matchScore = calculateMatchScore(userTraits, career);
      
      return {
        careerTitle: career.title,
        matchPercentage: matchScore,
        description: career.description,
        skills: career.requiredSkills,
        educationPath: career.educationRequirements,
        averageSalary: career.averageSalary
      };
    });
    
    // Sort by match percentage (descending)
    const recommendations = scoredCareers
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 5); // Top 5 recommendations
    
    return recommendations;
  }
  
  /**
   * Extract meaningful traits from assessment responses
   * @param {Object} careerTest - Career interests assessment
   * @param {Object} skillsAssessment - Skills assessment
   * @param {Object} personalityAssessment - Personality assessment
   * @returns {Object} - Extracted user traits
   */
  function extractUserTraits(careerTest, skillsAssessment, personalityAssessment) {
    const traits = {
      interests: [],
      skills: [],
      personality: [],
      workEnvironmentPreferences: [],
      workStyle: []
    };
    
    // Process career test (interests)
    if (careerTest[0] && Array.isArray(careerTest[0])) {
      // Mapping from first question (activities)
      const activityMap = {
        "Solving puzzles and analytical problems": ["analytical", "technical", "logical"],
        "Creating art, music, or writing": ["creative", "artistic", "expressive"],
        "Helping people and giving advice": ["helping", "social", "supportive"],
        "Working with machines or technology": ["technical", "mechanical", "technological"],
        "Managing projects and organizing tasks": ["organizational", "managerial", "administrative"]
      };
      
      careerTest[0].forEach(activity => {
        if (activityMap[activity]) {
          traits.interests.push(...activityMap[activity]);
        }
      });
    }
    
    // Process work preferences from career test
    if (careerTest[1]) {
      const workWithMap = {
        "People": ["social", "interpersonal", "collaborative"],
        "Data and numbers": ["analytical", "data-driven", "systematic"],
        "Physical objects and tools": ["practical", "hands-on", "mechanical"],
        "A mix of all the above": ["versatile", "adaptable", "multi-talented"]
      };
      
      if (workWithMap[careerTest[1]]) {
        traits.interests.push(...workWithMap[careerTest[1]]);
      }
    }
    
    // Map industry interests (question 10)
    if (careerTest[9] && Array.isArray(careerTest[9])) {
      const industryMap = {
        "Technology and Engineering": ["technology", "engineering", "innovation"],
        "Healthcare and Social Work": ["healthcare", "social-service", "helping"],
        "Business and Entrepreneurship": ["business", "entrepreneurial", "commercial"],
        "Arts, Media, and Entertainment": ["creative", "artistic", "entertainment"],
        "Education and Research": ["educational", "research", "academic"]
      };
      
      careerTest[9].forEach(industry => {
        if (industryMap[industry]) {
          traits.interests.push(...industryMap[industry]);
        }
      });
    }
    
    // Process skills assessment
    if (skillsAssessment[0]) {
      const techComfortMap = {
        "Very comfortable, I use them daily": ["tech-savvy", "digital"],
        "Somewhat comfortable, I learn quickly": ["adaptable", "tech-capable"],
        "Not very comfortable, but I want to improve": ["developing-tech"],
        "Not comfortable at all": ["non-technical"]
      };
      
      if (techComfortMap[skillsAssessment[0]]) {
        traits.skills.push(...techComfortMap[skillsAssessment[0]]);
      }
    }
    
    // Map technical skills (question 6)
    if (skillsAssessment[5] && Array.isArray(skillsAssessment[5])) {
      const techSkillsMap = {
        "Programming (Java, Python, JavaScript, etc.)": ["programming", "coding", "software-development"],
        "Data Analysis (Excel, SQL, Power BI, etc.)": ["data-analysis", "analytical", "statistical"],
        "Graphic Design (Photoshop, Illustrator, etc.)": ["graphic-design", "visual", "creative"],
        "Business Tools (Microsoft Office, CRM, etc.)": ["business-tools", "administrative", "organizational"]
      };
      
      skillsAssessment[5].forEach(skill => {
        if (techSkillsMap[skill]) {
          traits.skills.push(...techSkillsMap[skill]);
        }
      });
    }
    
    // Process personality assessment
    if (personalityAssessment[0]) {
      const paceMap = {
        "Fast-paced, I enjoy challenges": ["fast-paced", "dynamic", "challenge-seeking"],
        "Balanced, with some challenges and stability": ["balanced", "moderate-paced", "adaptable"],
        "Slow-paced, I like consistency": ["slow-paced", "stable", "consistent"]
      };
      
      if (paceMap[personalityAssessment[0]]) {
        traits.workEnvironmentPreferences.push(...paceMap[personalityAssessment[0]]);
      }
    }
    
    if (personalityAssessment[1]) {
      const thinkingStyleMap = {
        "Detail-oriented, I like precision": ["detail-oriented", "precise", "thorough"],
        "Big-picture thinker, I focus on strategy": ["big-picture", "strategic", "visionary"],
        "A mix of both": ["balanced-thinking", "versatile", "adaptable"]
      };
      
      if (thinkingStyleMap[personalityAssessment[1]]) {
        traits.personality.push(...thinkingStyleMap[personalityAssessment[1]]);
      }
    }
    
    // Map workplace preference (question 8 in personality)
    if (personalityAssessment[7]) {
      const workplaceMap = {
        "Office": ["office-based", "traditional-workplace"],
        "Remote": ["remote", "independent", "self-directed"],
        "Hybrid (both)": ["flexible", "adaptable", "hybrid-work"]
      };
      
      if (workplaceMap[personalityAssessment[7]]) {
        traits.workEnvironmentPreferences.push(...workplaceMap[personalityAssessment[7]]);
      }
    }
    
    return traits;
  }
  
  /**
   * Calculate match score between user traits and career
   * @param {Object} userTraits - User's extracted traits
   * @param {Object} career - Career to match against
   * @returns {Number} - Match percentage (0-100)
   */
  function calculateMatchScore(userTraits, career) {
    let interestScore = 0;
    let skillScore = 0;
    let personalityScore = 0;
    let environmentScore = 0;
    
    // Calculate interest match
    const interestMatches = countMatches(userTraits.interests, career.suitableInterests);
    interestScore = calculatePercentage(interestMatches, Math.max(userTraits.interests.length, 1));
    
    // Calculate skill match
    const skillMatches = countMatches(userTraits.skills, career.requiredSkills);
    skillScore = calculatePercentage(skillMatches, Math.max(career.requiredSkills.length, 1));
    
    // Calculate personality match
    const personalityMatches = countMatches(userTraits.personality, career.suitablePersonalityTraits);
    personalityScore = calculatePercentage(personalityMatches, Math.max(career.suitablePersonalityTraits.length, 1));
    
    // Calculate environment match
    const environmentMatches = countMatches(userTraits.workEnvironmentPreferences, career.workEnvironment);
    environmentScore = calculatePercentage(environmentMatches, Math.max(career.workEnvironment.length, 1));
    
    // Calculate weighted total score
    // Weights: Interests (40%), Skills (30%), Personality (20%), Environment (10%)
    const totalScore = (interestScore * 0.4) + (skillScore * 0.3) + (personalityScore * 0.2) + (environmentScore * 0.1);
    
    return Math.round(totalScore);
  }
  
  /**
   * Count matching elements between two arrays
   * @param {Array} array1 - First array
   * @param {Array} array2 - Second array
   * @returns {Number} - Number of matches
   */
  function countMatches(array1, array2) {
    let matches = 0;
    
    array1.forEach(item => {
      if (array2.some(element => element.toLowerCase().includes(item.toLowerCase()) || 
                                 item.toLowerCase().includes(element.toLowerCase()))) {
        matches++;
      }
    });
    
    return matches;
  }
  
  /**
   * Calculate percentage
   * @param {Number} value - Actual value
   * @param {Number} total - Total possible value
   * @returns {Number} - Percentage
   */
  function calculatePercentage(value, total) {
    return (value / total) * 100;
  }
  
  module.exports = { calculateCareerMatches };