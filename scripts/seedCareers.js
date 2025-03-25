// scripts/seedCareers.js
const mongoose = require('mongoose');
const Career = require('../models/Career');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careerGuidanceDB')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Career data
const careers = [
  {
    title: 'Software Developer',
    category: 'Technology',
    description: 'Design, develop, and maintain software applications and systems.',
    requiredSkills: ['programming', 'problem-solving', 'logical thinking', 'debugging', 'teamwork'],
    suitableInterests: ['technology', 'engineering', 'innovation', 'analytical', 'technical', 'logical'],
    suitablePersonalityTraits: ['detail-oriented', 'creative', 'patient', 'analytical'],
    educationRequirements: ['Bachelor\'s degree in Computer Science or related field', 'Coding bootcamp', 'Self-taught with portfolio'],
    workEnvironment: ['office-based', 'remote', 'flexible', 'collaborative'],
    averageSalary: '$70,000 - $120,000',
    growthProspects: 'High demand with continuous growth'
  },
  {
    title: 'Data Scientist',
    category: 'Technology',
    description: 'Analyze and interpret complex data to help organizations make informed decisions.',
    requiredSkills: ['statistical analysis', 'programming', 'machine learning', 'data visualization', 'critical thinking'],
    suitableInterests: ['data-driven', 'analytical', 'technology', 'research', 'innovation'],
    suitablePersonalityTraits: ['detail-oriented', 'analytical', 'curious', 'patient'],
    educationRequirements: ['Master\'s or PhD in Statistics, Mathematics, Computer Science, or related field'],
    workEnvironment: ['office-based', 'remote', 'research-oriented'],
    averageSalary: '$90,000 - $150,000',
    growthProspects: 'Rapidly growing field with high demand'
  },
  {
    title: 'Registered Nurse',
    category: 'Healthcare',
    description: 'Provide and coordinate patient care, educate patients about health conditions, and provide advice and emotional support.',
    requiredSkills: ['patient care', 'clinical knowledge', 'communication', 'empathy', 'critical thinking'],
    suitableInterests: ['healthcare', 'helping', 'social', 'supportive'],
    suitablePersonalityTraits: ['compassionate', 'detail-oriented', 'emotionally stable', 'adaptable'],
    educationRequirements: ['Bachelor\'s or Associate\'s degree in Nursing', 'Nursing license'],
    workEnvironment: ['hospital', 'clinic', 'fast-paced', 'high-pressure'],
    averageSalary: '$60,000 - $100,000',
    growthProspects: 'Consistent demand with stable growth'
  },
  {
    title: 'Marketing Manager',
    category: 'Business',
    description: 'Plan, direct, and coordinate marketing strategies and campaigns for organizations.',
    requiredSkills: ['marketing strategy', 'communication', 'creativity', 'analytical thinking', 'project management'],
    suitableInterests: ['business', 'creative', 'social', 'commercial', 'entrepreneurial'],
    suitablePersonalityTraits: ['creative', 'strategic', 'outgoing', 'persuasive'],
    educationRequirements: ['Bachelor\'s degree in Marketing, Business, or related field'],
    workEnvironment: ['office-based', 'collaborative', 'fast-paced', 'diverse'],
    averageSalary: '$65,000 - $120,000',
    growthProspects: 'Steady growth with evolving digital landscape'
  },
  {
    title: 'Graphic Designer',
    category: 'Creative Arts',
    description: 'Create visual concepts to communicate ideas that inspire, inform, and captivate consumers.',
    requiredSkills: ['visual design', 'creativity', 'software proficiency', 'typography', 'layout design'],
    suitableInterests: ['creative', 'artistic', 'visual', 'expressive', 'entertainment'],
    suitablePersonalityTraits: ['creative', 'detail-oriented', 'patient', 'adaptable'],
    educationRequirements: ['Bachelor\'s degree in Graphic Design or related field', 'Portfolio of work'],
    workEnvironment: ['studio', 'agency', 'freelance', 'remote'],
    averageSalary: '$45,000 - $85,000',
    growthProspects: 'Moderate growth with focus on digital media'
  },
  {
    title: 'Financial Analyst',
    category: 'Finance',
    description: 'Analyze financial data, prepare reports, and make recommendations to help businesses and individuals make investment decisions.',
    requiredSkills: ['financial analysis', 'data interpretation', 'research', 'reporting', 'critical thinking'],
    suitableInterests: ['analytical', 'data-driven', 'business', 'systematic'],
    suitablePersonalityTraits: ['detail-oriented', 'analytical', 'organized', 'logical'],
    educationRequirements: ['Bachelor\'s degree in Finance, Economics, or related field', 'MBA or CFA preferred'],
    workEnvironment: ['office-based', 'structured', 'corporate'],
    averageSalary: '$65,000 - $110,000',
    growthProspects: 'Stable growth with increasing complexity of financial markets'
  },
  {
    title: 'Teacher',
    category: 'Education',
    description: 'Instruct students, prepare lesson plans, evaluate student performance, and create a positive learning environment.',
    requiredSkills: ['instruction', 'communication', 'patience', 'organization', 'adaptability'],
    suitableInterests: ['educational', 'helping', 'social', 'supportive'],
    suitablePersonalityTraits: ['patient', 'empathetic', 'organized', 'adaptable'],
    educationRequirements: ['Bachelor\'s degree in Education or subject area', 'Teaching certification'],
    workEnvironment: ['school', 'classroom', 'structured', 'interactive'],
    averageSalary: '$40,000 - $75,000',
    growthProspects: 'Steady demand with emphasis on specialized subjects'
  },
  {
    title: 'UX/UI Designer',
    category: 'Technology',
    description: 'Design user interfaces and experiences for websites, applications, and other digital products.',
    requiredSkills: ['user research', 'wireframing', 'prototyping', 'visual design', 'usability testing'],
    suitableInterests: ['creative', 'technical', 'visual', 'technological', 'innovation'],
    suitablePersonalityTraits: ['creative', 'empathetic', 'detail-oriented', 'analytical'],
    educationRequirements: ['Bachelor\'s degree in Design, HCI, or related field', 'Portfolio of work'],
    workEnvironment: ['tech company', 'agency', 'remote', 'collaborative'],
    averageSalary: '$70,000 - $110,000',
    growthProspects: 'High growth with increasing focus on user experience'
  },
  {
    title: 'Project Manager',
    category: 'Business',
    description: 'Plan, execute, and close projects, ensuring they are completed on time, within budget, and meeting requirements.',
    requiredSkills: ['planning', 'organization', 'leadership', 'communication', 'risk management'],
    suitableInterests: ['organizational', 'managerial', 'administrative', 'business'],
    suitablePersonalityTraits: ['organized', 'leadership', 'adaptable', 'decisive'],
    educationRequirements: ['Bachelor\'s degree in Business or related field', 'PMP certification'],
    workEnvironment: ['office-based', 'collaborative', 'structured', 'diverse'],
    averageSalary: '$70,000 - $120,000',
    growthProspects: 'Stable growth across multiple industries'
  },
  {
    title: 'Social Worker',
    category: 'Social Services',
    description: 'Help people solve and cope with problems in their everyday lives, connecting them with services and providing support.',
    requiredSkills: ['counseling', 'empathy', 'communication', 'case management', 'advocacy'],
    suitableInterests: ['helping', 'social', 'supportive', 'social-service'],
    suitablePersonalityTraits: ['empathetic', 'patient', 'resilient', 'compassionate'],
    educationRequirements: ['Bachelor\'s or Master\'s degree in Social Work', 'Social Work license'],
    workEnvironment: ['community center', 'healthcare facility', 'school', 'government agency'],
    averageSalary: '$45,000 - $75,000',
    growthProspects: 'Steady growth with increasing social needs'
  },
  {
    title: 'Human Resources Specialist',
    category: 'Business',
    description: 'Recruit, screen, interview, and place workers, handling employee relations, compensation, benefits, and training.',
    requiredSkills: ['recruitment', 'interviewing', 'conflict resolution', 'organization', 'communication'],
    suitableInterests: ['administrative', 'social', 'business', 'interpersonal'],
    suitablePersonalityTraits: ['organized', 'empathetic', 'diplomatic', 'detail-oriented'],
    educationRequirements: ['Bachelor\'s degree in Human Resources, Business, or related field'],
    workEnvironment: ['office-based', 'corporate', 'structured'],
    averageSalary: '$50,000 - $85,000',
    growthProspects: 'Stable growth across all industries'
  },
  {
    title: 'Mechanical Engineer',
    category: 'Engineering',
    description: 'Design, develop, build, and test mechanical devices, tools, engines, and machines.',
    requiredSkills: ['mechanical design', 'problem-solving', 'mathematics', 'technical drawing', 'analysis'],
    suitableInterests: ['engineering', 'technical', 'mechanical', 'practical', 'hands-on'],
    suitablePersonalityTraits: ['detail-oriented', 'analytical', 'systematic', 'creative'],
    educationRequirements: ['Bachelor\'s degree in Mechanical Engineering'],
    workEnvironment: ['office', 'manufacturing plant', 'laboratory', 'field work'],
    averageSalary: '$70,000 - $110,000',
    growthProspects: 'Stable growth with emphasis on sustainable technologies'
  },
  {
    title: 'Clinical Psychologist',
    category: 'Healthcare',
    description: 'Diagnose and treat mental, emotional, and behavioral disorders through observation, assessment, and therapy.',
    requiredSkills: ['psychological assessment', 'therapy', 'empathy', 'communication', 'analysis'],
    suitableInterests: ['healthcare', 'helping', 'social', 'supportive', 'research'],
    suitablePersonalityTraits: ['empathetic', 'patient', 'analytical', 'ethical'],
    educationRequirements: ['Doctorate in Psychology', 'Psychology license'],
    workEnvironment: ['private practice', 'hospital', 'clinic', 'academic setting'],
    averageSalary: '$70,000 - $130,000',
    growthProspects: 'Strong growth with increasing focus on mental health'
  },
  {
    title: 'Digital Marketing Specialist',
    category: 'Marketing',
    description: 'Create and implement online marketing strategies through SEO, social media, email marketing, and other digital channels.',
    requiredSkills: ['SEO', 'social media marketing', 'content creation', 'analytics', 'strategy development'],
    suitableInterests: ['business', 'creative', 'technological', 'commercial', 'digital'],
    suitablePersonalityTraits: ['creative', 'analytical', 'adaptable', 'strategic'],
    educationRequirements: ['Bachelor\'s degree in Marketing, Communications, or related field'],
    workEnvironment: ['agency', 'corporate', 'remote', 'fast-paced'],
    averageSalary: '$50,000 - $90,000',
    growthProspects: 'Rapid growth with expanding digital landscape'
  },
  {
    title: 'Environmental Scientist',
    category: 'Science',
    description: 'Study environmental problems and develop solutions to protect the environment and human health.',
    requiredSkills: ['research', 'data analysis', 'scientific methodology', 'environmental sampling', 'reporting'],
    suitableInterests: ['research', 'scientific', 'environmental', 'analytical'],
    suitablePersonalityTraits: ['detail-oriented', 'analytical', 'persistent', 'ethical'],
    educationRequirements: ['Bachelor\'s or Master\'s degree in Environmental Science or related field'],
    workEnvironment: ['field work', 'laboratory', 'office', 'government agency'],
    averageSalary: '$55,000 - $90,000',
    growthProspects: 'Growing field with increasing environmental concerns'
  }
];

// Seed function
async function seedCareers() {
  try {
    // Clear existing data
    await Career.deleteMany({});
    
    // Insert new career data
    await Career.insertMany(careers);
    
    console.log('Career data successfully seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding careers:', err);
    process.exit(1);
  }
}

// Run the seed function
seedCareers();