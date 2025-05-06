// // utils/careerRecommendationEngine.js

// /**
//  * Calculate career matches based on assessment data
//  * @param {Object} assessment - User assessment data
//  * @param {Array} careers - List of career options
//  * @returns {Array} - Recommended careers with match percentages
//  * 
//  */
// function calculateCareerMatches(assessment, careers) {
//     const { careerTest, skillsAssessment, personalityAssessment } = assessment;
    
//     // Map responses to meaningful traits
//     const userTraits = extractUserTraits(careerTest, skillsAssessment, personalityAssessment);
    
//     // Calculate match scores for each career
//     const scoredCareers = careers.map(career => {
//       const matchScore = calculateMatchScore(userTraits, career);
      
//       return {
//         careerTitle: career.title,
//         matchPercentage: matchScore,
//         description: career.description,
//         skills: career.requiredSkills,
//         educationPath: career.educationRequirements,
//         averageSalary: career.averageSalary
//       };
//     });
    
//     // Sort by match percentage (descending)
//     const recommendations = scoredCareers
//       .sort((a, b) => b.matchPercentage - a.matchPercentage)
//       .slice(0, 5); // Top 5 recommendations
    
//     return recommendations;
//   }
  
//   /**
//    * Extract meaningful traits from assessment responses
//    * @param {Object} careerTest - Career interests assessment
//    * @param {Object} skillsAssessment - Skills assessment
//    * @param {Object} personalityAssessment - Personality assessment
//    * @returns {Object} - Extracted user traits
//    */
//   function extractUserTraits(careerTest, skillsAssessment, personalityAssessment) {
//     const traits = {
//       interests: [],
//       skills: [],
//       personality: [],
//       workEnvironmentPreferences: [],
//       workStyle: []
//     };
    
//     // Process career test (interests)
//     if (careerTest[0] && Array.isArray(careerTest[0])) {
//       // Mapping from first question (activities)
//       const activityMap = {
//         "Solving puzzles and analytical problems": ["analytical", "technical", "logical"],
//         "Creating art, music, or writing": ["creative", "artistic", "expressive"],
//         "Helping people and giving advice": ["helping", "social", "supportive"],
//         "Working with machines or technology": ["technical", "mechanical", "technological"],
//         "Managing projects and organizing tasks": ["organizational", "managerial", "administrative"]
//       };
      
//       careerTest[0].forEach(activity => {
//         if (activityMap[activity]) {
//           traits.interests.push(...activityMap[activity]);
//         }
//       });
//     }
    
//     // Process work preferences from career test
//     if (careerTest[1]) {
//       const workWithMap = {
//         "People": ["social", "interpersonal", "collaborative"],
//         "Data and numbers": ["analytical", "data-driven", "systematic"],
//         "Physical objects and tools": ["practical", "hands-on", "mechanical"],
//         "A mix of all the above": ["versatile", "adaptable", "multi-talented"]
//       };
      
//       if (workWithMap[careerTest[1]]) {
//         traits.interests.push(...workWithMap[careerTest[1]]);
//       }
//     }
    
//     // Map industry interests (question 10)
//     if (careerTest[9] && Array.isArray(careerTest[9])) {
//       const industryMap = {
//         "Technology and Engineering": ["technology", "engineering", "innovation"],
//         "Healthcare and Social Work": ["healthcare", "social-service", "helping"],
//         "Business and Entrepreneurship": ["business", "entrepreneurial", "commercial"],
//         "Arts, Media, and Entertainment": ["creative", "artistic", "entertainment"],
//         "Education and Research": ["educational", "research", "academic"]
//       };
      
//       careerTest[9].forEach(industry => {
//         if (industryMap[industry]) {
//           traits.interests.push(...industryMap[industry]);
//         }
//       });
//     }
    
//     // Process skills assessment
//     if (skillsAssessment[0]) {
//       const techComfortMap = {
//         "Very comfortable, I use them daily": ["tech-savvy", "digital"],
//         "Somewhat comfortable, I learn quickly": ["adaptable", "tech-capable"],
//         "Not very comfortable, but I want to improve": ["developing-tech"],
//         "Not comfortable at all": ["non-technical"]
//       };
      
//       if (techComfortMap[skillsAssessment[0]]) {
//         traits.skills.push(...techComfortMap[skillsAssessment[0]]);
//       }
//     }
    
//     // Map technical skills (question 6)
//     if (skillsAssessment[5] && Array.isArray(skillsAssessment[5])) {
//       const techSkillsMap = {
//         "Programming (Java, Python, JavaScript, etc.)": ["programming", "coding", "software-development"],
//         "Data Analysis (Excel, SQL, Power BI, etc.)": ["data-analysis", "analytical", "statistical"],
//         "Graphic Design (Photoshop, Illustrator, etc.)": ["graphic-design", "visual", "creative"],
//         "Business Tools (Microsoft Office, CRM, etc.)": ["business-tools", "administrative", "organizational"]
//       };
      
//       skillsAssessment[5].forEach(skill => {
//         if (techSkillsMap[skill]) {
//           traits.skills.push(...techSkillsMap[skill]);
//         }
//       });
//     }
    
//     // Process personality assessment
//     if (personalityAssessment[0]) {
//       const paceMap = {
//         "Fast-paced, I enjoy challenges": ["fast-paced", "dynamic", "challenge-seeking"],
//         "Balanced, with some challenges and stability": ["balanced", "moderate-paced", "adaptable"],
//         "Slow-paced, I like consistency": ["slow-paced", "stable", "consistent"]
//       };
      
//       if (paceMap[personalityAssessment[0]]) {
//         traits.workEnvironmentPreferences.push(...paceMap[personalityAssessment[0]]);
//       }
//     }
    
//     if (personalityAssessment[1]) {
//       const thinkingStyleMap = {
//         "Detail-oriented, I like precision": ["detail-oriented", "precise", "thorough"],
//         "Big-picture thinker, I focus on strategy": ["big-picture", "strategic", "visionary"],
//         "A mix of both": ["balanced-thinking", "versatile", "adaptable"]
//       };
      
//       if (thinkingStyleMap[personalityAssessment[1]]) {
//         traits.personality.push(...thinkingStyleMap[personalityAssessment[1]]);
//       }
//     }
    
//     // Map workplace preference (question 8 in personality)
//     if (personalityAssessment[7]) {
//       const workplaceMap = {
//         "Office": ["office-based", "traditional-workplace"],
//         "Remote": ["remote", "independent", "self-directed"],
//         "Hybrid (both)": ["flexible", "adaptable", "hybrid-work"]
//       };
      
//       if (workplaceMap[personalityAssessment[7]]) {
//         traits.workEnvironmentPreferences.push(...workplaceMap[personalityAssessment[7]]);
//       }
//     }
    
//     return traits;
//   }
  
//   /**
//    * Calculate match score between user traits and career
//    * @param {Object} userTraits - User's extracted traits
//    * @param {Object} career - Career to match against
//    * @returns {Number} - Match percentage (0-100)
//    */
//   function calculateMatchScore(userTraits, career) {
//     let interestScore = 0;
//     let skillScore = 0;
//     let personalityScore = 0;
//     let environmentScore = 0;
    
//     // Calculate interest match
//     const interestMatches = countMatches(userTraits.interests, career.suitableInterests);
//     interestScore = calculatePercentage(interestMatches, Math.max(userTraits.interests.length, 1));
    
//     // Calculate skill match
//     const skillMatches = countMatches(userTraits.skills, career.requiredSkills);
//     skillScore = calculatePercentage(skillMatches, Math.max(career.requiredSkills.length, 1));
    
//     // Calculate personality match
//     const personalityMatches = countMatches(userTraits.personality, career.suitablePersonalityTraits);
//     personalityScore = calculatePercentage(personalityMatches, Math.max(career.suitablePersonalityTraits.length, 1));
    
//     // Calculate environment match
//     const environmentMatches = countMatches(userTraits.workEnvironmentPreferences, career.workEnvironment);
//     environmentScore = calculatePercentage(environmentMatches, Math.max(career.workEnvironment.length, 1));
    
//     // Calculate weighted total score
//     // Weights: Interests (40%), Skills (30%), Personality (20%), Environment (10%)
//     const totalScore = (interestScore * 0.4) + (skillScore * 0.3) + (personalityScore * 0.2) + (environmentScore * 0.1);
    
//     return Math.round(totalScore);
//   }
  
//   /**
//    * Count matching elements between two arrays
//    * @param {Array} array1 - First array
//    * @param {Array} array2 - Second array
//    * @returns {Number} - Number of matches
//    */
//   function countMatches(array1, array2) {
//     let matches = 0;
    
//     array1.forEach(item => {
//       if (array2.some(element => element.toLowerCase().includes(item.toLowerCase()) || 
//                                  item.toLowerCase().includes(element.toLowerCase()))) {
//         matches++;
//       }
//     });
    
//     return matches;
//   }
  
//   /**
//    * Calculate percentage
//    * @param {Number} value - Actual value
//    * @param {Number} total - Total possible value
//    * @returns {Number} - Percentage
//    */
//   function calculatePercentage(value, total) {
//     return (value / total) * 100;
//   }
  
//   module.exports = { calculateCareerMatches };


/// utils/careerRecommendationEngine.js

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
    workStyle: [],
    subjectInterests: []
  };
  
   // Process subject interests from career test question 0
if (careerTest[0] && Array.isArray(careerTest[0])) {
  const subjectMap = {
    "Technology and Computing": ["technology", "computing", "technical", "IT", "software"],
    "Business and Management": ["business", "management", "entrepreneurial", "commercial"],
    "Mathematics and Statistics": ["mathematics", "statistics", "analytical", "numerical"],
    "Language and Communication": ["languages", "communication", "linguistics", "verbal"],
    "Healthcare and Medicine": ["healthcare", "medicine", "medical", "nursing"],
    "Education and Teaching": ["education", "teaching", "mentoring", "instructional"],
    "Religious Studies and Theology": ["theology", "religious studies", "spiritual", "philosophical"]
  };
  
  careerTest[0].forEach(subject => {
    if (subjectMap[subject]) {
      traits.subjectInterests.push(...subjectMap[subject]);
    }
  });
}

// Process work environment preferences from career test question 1
if (careerTest[1]) {
  const environmentMap = {
    "Technical, working with computers and systems": ["technical", "technology-focused", "computing", "systematic"],
    "Business-oriented, working with data and processes": ["business", "data-driven", "process-oriented", "commercial"],
    "Classroom or educational setting": ["educational", "teaching", "classroom", "instructional"],
    "Hospital or healthcare setting": ["healthcare", "clinical", "medical", "patient-focused"],
    "Community-based, working with diverse groups of people": ["community", "diverse", "social", "people-oriented"]
  };
  
  if (environmentMap[careerTest[1]]) {
    traits.workEnvironmentPreferences.push(...environmentMap[careerTest[1]]);
  }
}

// Process problem-solving preferences from career test question 2
if (careerTest[2]) {
  const problemMap = {
    "Technical problems with computers and networks": ["technical", "problem-solving", "IT", "networking"],
    "Business challenges involving money and resources": ["business", "financial", "resource-management", "strategic"],
    "Teaching concepts to help others learn": ["educational", "teaching", "explanatory", "instructional"],
    "Caring for people's health and wellness": ["healthcare", "caring", "wellness", "patient-care"],
    "Religious or philosophical questions": ["theological", "philosophical", "spiritual", "reflective"]
  };
  
  if (problemMap[careerTest[2]]) {
    traits.interests.push(...problemMap[careerTest[2]]);
  }
}

// Process working style preferences from career test question 3
if (careerTest[3]) {
  const workStyleMap = {
    "Independently on technical tasks": ["independent", "technical", "focused", "autonomous"],
    "In business team settings": ["collaborative", "business", "team-oriented", "organizational"],
    "With students or learners": ["educational", "mentoring", "supportive", "instructional"],
    "With patients or in healthcare": ["healthcare", "patient-care", "supportive", "clinical"],
    "A mix of all the above": ["versatile", "adaptable", "multi-talented", "flexible"]
  };
  
  if (workStyleMap[careerTest[3]]) {
    traits.workStyle.push(...workStyleMap[careerTest[3]]);
  }
}

// Process desired skills from career test question 4
if (careerTest[4] && Array.isArray(careerTest[4])) {
  const skillsMap = {
    "Programming and software development": ["programming", "software development", "coding", "technical"],
    "Financial analysis and accounting": ["financial analysis", "accounting", "numerical", "analytical"],
    "Teaching and explaining concepts": ["teaching", "communication", "explanatory", "instructional"],
    "Healthcare and patient care": ["healthcare", "patient care", "medical", "supportive"],
    "Network and system administration": ["networking", "system administration", "technical", "IT infrastructure"],
    "Business management and leadership": ["management", "leadership", "organizational", "strategic"],
    "Language and communication": ["communication", "language", "verbal", "writing"],
    "Religious counseling and guidance": ["counseling", "spiritual guidance", "supportive", "advisory"]
  };
  
  careerTest[4].forEach(skill => {
    if (skillsMap[skill]) {
      traits.skills.push(...skillsMap[skill]);
    }
  });
}

// Process math comfort level from career test question 5
if (careerTest[5]) {
  const mathMap = {
    "Very comfortable - I enjoy mathematical challenges": ["mathematical", "analytical", "numerical", "logical"],
    "Somewhat comfortable with basic to intermediate math": ["basic-math", "quantitative", "numerical-capable"],
    "I prefer minimal mathematical work": ["minimal-math", "qualitative", "creative"],
    "I'm more interested in qualitative than quantitative work": ["qualitative", "non-numerical", "verbal", "conceptual"]
  };
  
  if (mathMap[careerTest[5]]) {
    traits.skills.push(...mathMap[careerTest[5]]);
  }
}

// Process career impact preferences from career test question 6
if (careerTest[6]) {
  const impactMap = {
    "Creating innovative technology solutions": ["innovative", "technological", "solution-oriented", "creative"],
    "Helping businesses succeed financially": ["business-focused", "financial", "commercial", "organizational"],
    "Educating and developing future generations": ["educational", "developmental", "mentoring", "supportive"],
    "Improving people's health and wellbeing": ["healthcare", "wellness", "supportive", "helping"],
    "Providing spiritual guidance and support": ["spiritual", "guidance", "supportive", "advisory"]
  };
  
  if (impactMap[careerTest[6]]) {
    traits.interests.push(...impactMap[careerTest[6]]);
  }
}

// Process study preferences from career test question 7
if (careerTest[7]) {
  const studyMap = {
    "I enjoy continuous learning in technology fields": ["tech-learning", "continuous-development", "technical-growth"],
    "I'm comfortable with professional business certifications": ["business-certifications", "professional-development", "organizational-learning"],
    "I'm interested in educational development": ["educational-development", "teaching-growth", "instructional-learning"],
    "I'm prepared for extensive medical/healthcare training": ["healthcare-training", "medical-education", "clinical-learning"],
    "I value theological and philosophical study": ["theological-study", "philosophical-learning", "spiritual-development"]
  };
  
  if (studyMap[careerTest[7]]) {
    traits.interests.push(...studyMap[careerTest[7]]);
  }
}

// Process technical comfort level from career test question 8
if (careerTest[8]) {
  const techLevelMap = {
    "Advanced - programming, networking, system administration": ["advanced-technical", "programming", "networking", "systems"],
    "Intermediate - business software and data analysis": ["intermediate-technical", "business-software", "data-analysis"],
    "Basic - everyday computing and teaching tools": ["basic-technical", "everyday-computing", "teaching-tools"],
    "Minimal - I prefer working directly with people rather than computers": ["minimal-technical", "people-focused", "interpersonal"]
  };
  
  if (techLevelMap[careerTest[8]]) {
    traits.skills.push(...techLevelMap[careerTest[8]]);
  }
}

// Process field interests from career test question 9
if (careerTest[9] && Array.isArray(careerTest[9])) {
  const fieldMap = {
    "Information Technology and Computing": ["IT", "computing", "technology", "technical"],
    "Business Administration and Management": ["business", "administration", "management", "organizational"],
    "Education and Teaching": ["education", "teaching", "instructional", "developmental"],
    "Healthcare and Medicine": ["healthcare", "medicine", "medical", "clinical"],
    "Religious Studies and Theology": ["theology", "religious studies", "spiritual", "philosophical"],
    "Languages and Communication": ["languages", "communication", "linguistics", "verbal"],
    "Geography and Environmental Studies": ["geography", "environmental", "spatial", "analytical"],
    "Mathematics and Economics": ["mathematics", "economics", "analytical", "quantitative"]
  };
  
  careerTest[9].forEach(field => {
    if (fieldMap[field]) {
      traits.interests.push(...fieldMap[field]);
    }
  });
}
  
   // ENHANCED SKILLS ASSESSMENT PROCESSING

// Process programming skill level (question 0)
if (skillsAssessment[0]) {
  const programmingSkillMap = {
    "Advanced - I can develop complex software applications": ["programming", "software development", "coding", "advanced-technical", "complex-systems"],
    "Intermediate - I can write basic code and understand programming concepts": ["basic-programming", "coding-capable", "technical", "software-understanding"],
    "Basic - I understand the principles but have limited coding experience": ["programming-principles", "minimal-coding", "technical-awareness"],
    "None - I have no programming experience": ["non-technical", "no-programming"]
  };
  
  if (programmingSkillMap[skillsAssessment[0]]) {
    traits.skills.push(...programmingSkillMap[skillsAssessment[0]]);
  }
}

// Process financial concepts comfort (question 1)
if (skillsAssessment[1]) {
  const financialSkillMap = {
    "Very comfortable - I understand complex financial models": ["financial-analysis", "advanced-financial", "complex-models", "financial-expertise"],
    "Comfortable - I can work with budgets and financial statements": ["financial-literacy", "budgeting", "accounting", "financial-capable"],
    "Somewhat comfortable - I understand basic financial concepts": ["basic-finance", "financial-awareness", "fundamental-accounting"],
    "Not comfortable - I have little experience with financial matters": ["non-financial", "finance-averse"]
  };
  
  if (financialSkillMap[skillsAssessment[1]]) {
    traits.skills.push(...financialSkillMap[skillsAssessment[1]]);
  }
}

// Process communication and teaching skills (question 2)
if (skillsAssessment[2]) {
  const communicationSkillMap = {
    "Excellent - I can explain complex concepts clearly to diverse audiences": ["excellent-communication", "teaching", "explanatory", "advanced-instruction"],
    "Good - I communicate well and enjoy helping others learn": ["good-communication", "mentoring", "instructional", "teaching-capable"],
    "Average - I can communicate effectively but may not be my strength": ["adequate-communication", "basic-teaching", "explaining"],
    "Below average - I prefer working with data or systems than teaching": ["minimal-teaching", "system-focused", "data-oriented"]
  };
  
  if (communicationSkillMap[skillsAssessment[2]]) {
    traits.skills.push(...communicationSkillMap[skillsAssessment[2]]);
  }
}

// Process healthcare experience (question 3)
if (skillsAssessment[3]) {
  const healthcareSkillMap = {
    "Significant - I have healthcare training or experience": ["healthcare", "patient-care", "medical-training", "health-expertise"],
    "Some - I've had exposure to healthcare settings": ["healthcare-exposure", "medical-awareness", "basic-patient-care"],
    "Limited - I understand basics but have no direct experience": ["healthcare-concepts", "minimal-medical-knowledge"],
    "None - I have no healthcare experience": ["non-medical", "no-healthcare"]
  };
  
  if (healthcareSkillMap[skillsAssessment[3]]) {
    traits.skills.push(...healthcareSkillMap[skillsAssessment[3]]);
  }
}

// Process network/system administration comfort (question 4)
if (skillsAssessment[4]) {
  const networkSkillMap = {
    "Very comfortable - I understand networks, servers, and system management": ["network-administration", "system-management", "IT-infrastructure", "advanced-technical"],
    "Somewhat comfortable - I can troubleshoot basic network issues": ["basic-networking", "troubleshooting", "IT-capable", "technical"],
    "Basic understanding - I know the concepts but limited practical experience": ["network-concepts", "IT-awareness", "technical-understanding"],
    "Not comfortable - I have minimal experience with networks and systems": ["non-technical", "minimal-IT"]
  };
  
  if (networkSkillMap[skillsAssessment[4]]) {
    traits.skills.push(...networkSkillMap[skillsAssessment[4]]);
  }
}

// Process technical skills (question 5 - checkbox type)
if (skillsAssessment[5] && Array.isArray(skillsAssessment[5])) {
  const technicalSkillsMap = {
    "Programming (Java, Python, JavaScript, etc.)": ["programming", "coding", "software-development", "technical"],
    "Network configuration and management": ["networking", "system-administration", "IT-infrastructure", "technical"],
    "Database design and management": ["database", "data-management", "SQL", "technical"],
    "Financial analysis and accounting": ["financial-analysis", "accounting", "numerical", "analytical"],
    "Teaching and curriculum development": ["teaching", "curriculum-development", "educational", "instructional"],
    "Medical or healthcare procedures": ["healthcare", "medical-procedures", "patient-care", "clinical"],
    "Geographic Information Systems (GIS)": ["GIS", "geography", "spatial-analysis", "technical"],
    "Foreign language proficiency": ["language-skills", "multilingual", "communication", "linguistics"]
  };
  
  skillsAssessment[5].forEach(skill => {
    if (technicalSkillsMap[skill]) {
      traits.skills.push(...technicalSkillsMap[skill]);
    }
  });
}

// Process leadership and management skills (question 6)
if (skillsAssessment[6]) {
  const leadershipSkillMap = {
    "Excellent - I regularly lead teams and manage projects": ["leadership", "project-management", "team-management", "strategic"],
    "Good - I can effectively organize and direct group efforts": ["team-coordination", "organizational", "leadership-capable", "managerial"],
    "Average - I can manage when needed but it's not my strength": ["basic-leadership", "team-contributor", "managerial-aware"],
    "Limited - I prefer individual contributor roles": ["individual-contributor", "self-directed", "independent"]
  };
  
  if (leadershipSkillMap[skillsAssessment[6]]) {
    traits.skills.push(...leadershipSkillMap[skillsAssessment[6]]);
    traits.personality.push(...leadershipSkillMap[skillsAssessment[6]]);
  }
}

// Process diversity comfort (question 7)
if (skillsAssessment[7]) {
  const diversityComfortMap = {
    "Very comfortable - I thrive in diverse environments": ["diversity-oriented", "multicultural", "inclusive", "adaptable"],
    "Comfortable - I work well with various groups of people": ["people-oriented", "collaborative", "social", "adaptable"],
    "Somewhat comfortable - I can manage but may not be my preference": ["adaptable", "manageable-diversity", "moderate-social"],
    "Not comfortable - I prefer more homogeneous environments": ["homogeneous-preference", "structured", "consistent"]
  };
  
  if (diversityComfortMap[skillsAssessment[7]]) {
    traits.personality.push(...diversityComfortMap[skillsAssessment[7]]);
    traits.workEnvironmentPreferences.push(...diversityComfortMap[skillsAssessment[7]]);
  }
}

// Process analytical abilities (question 8)
if (skillsAssessment[8]) {
  const analyticalSkillMap = {
    "Excellent - I excel at analyzing complex problems": ["analytical", "problem-solving", "critical-thinking", "logical"],
    "Good - I can effectively solve most analytical challenges": ["analytical-capable", "problem-solver", "logical-thinking"],
    "Average - I can solve problems but may need guidance with complex issues": ["basic-analytical", "guided-problem-solving", "moderate-analytical"],
    "Below average - I struggle with highly analytical tasks": ["minimal-analytical", "practical", "intuitive"]
  };
  
  if (analyticalSkillMap[skillsAssessment[8]]) {
    traits.skills.push(...analyticalSkillMap[skillsAssessment[8]]);
    traits.personality.push(...analyticalSkillMap[skillsAssessment[8]]);
  }
}

// Process soft skills (question 9 - checkbox type)
if (skillsAssessment[9] && Array.isArray(skillsAssessment[9])) {
  const softSkillsMap = {
    "Critical thinking and problem solving": ["critical-thinking", "problem-solving", "analytical", "logical"],
    "Communication and presentation": ["communication", "presentation", "verbal", "articulate"],
    "Teamwork and collaboration": ["teamwork", "collaborative", "cooperative", "social"],
    "Organization and time management": ["organized", "time-management", "structured", "efficient"],
    "Empathy and emotional intelligence": ["empathetic", "emotionally-intelligent", "compassionate", "people-oriented"],
    "Creativity and innovation": ["creative", "innovative", "original", "imaginative"],
    "Adaptability and flexibility": ["adaptable", "flexible", "versatile", "resilient"],
    "Attention to detail": ["detail-oriented", "meticulous", "thorough", "precise"]
  };
  
  skillsAssessment[9].forEach(skill => {
    if (softSkillsMap[skill]) {
      traits.skills.push(...softSkillsMap[skill]);
      traits.personality.push(...softSkillsMap[skill]);
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