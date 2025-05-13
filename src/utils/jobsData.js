// Mock data for job listings
const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    salary: "$80,000 - $110,000",
    experience: "2-4 years",
    posted: "2 days ago",
    description: "Exciting opportunity for a frontend developer with React experience to join our innovative team. You'll be working on cutting-edge web applications used by millions of users worldwide.",
    responsibilities: [
      "Develop responsive web applications using React",
      "Collaborate with UX/UI designers to implement modern interfaces",
      "Optimize applications for maximum performance",
      "Write clean, maintainable code and perform code reviews"
    ],
    requirements: [
      "2+ years of experience with React",
      "Strong knowledge of JavaScript, HTML5, and CSS3",
      "Experience with state management (Redux, Context API)",
      "Familiarity with modern build tools (Webpack, Vite)"
    ],
    tags: ["React", "JavaScript", "Tailwind CSS", "Redux"]
  },
  {
    id: 2,
    title: "Marketing Intern",
    company: "GrowthMedia",
    location: "New York, NY",
    type: "Internship",
    salary: "$20-25/hour",
    experience: "Entry level",
    posted: "1 week ago",
    description: "Learn digital marketing strategies while working with industry professionals. Great opportunity for marketing students looking to gain real-world experience.",
    responsibilities: [
      "Assist in social media campaign planning and execution",
      "Create content for various marketing channels",
      "Help analyze marketing metrics and prepare reports",
      "Support the marketing team in day-to-day activities"
    ],
    requirements: [
      "Currently pursuing a degree in Marketing or related field",
      "Strong written and verbal communication skills",
      "Basic knowledge of social media platforms",
      "Creativity and eagerness to learn"
    ],
    tags: ["Marketing", "Social Media", "Content Creation", "Internship"]
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "AnalyticsAI",
    location: "Hybrid",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    experience: "3-5 years",
    posted: "3 days ago",
    description: "Join our team to develop machine learning models for predictive analytics. You'll be working on fascinating problems in various domains including finance and healthcare.",
    responsibilities: [
      "Develop and implement machine learning models",
      "Process and analyze large datasets",
      "Collaborate with engineers and product managers",
      "Present findings to stakeholders"
    ],
    requirements: [
      "MS or PhD in Computer Science, Statistics, or related field",
      "3+ years of experience in data science",
      "Strong programming skills in Python",
      "Experience with ML frameworks (TensorFlow, PyTorch)"
    ],
    tags: ["Python", "ML", "Data Analysis", "AI"]
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "ServerStack",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    experience: "3-6 years",
    posted: "1 week ago",
    description: "We're looking for a backend developer to help build robust APIs and services. Join a fast-growing startup with a focus on developer tools.",
    responsibilities: [
      "Design and develop scalable backend systems",
      "Build and maintain RESTful APIs",
      "Implement database schemas and optimize queries",
      "Work with DevOps to deploy and monitor services"
    ],
    requirements: [
      "Experience with Node.js, Python, or Java",
      "Knowledge of database systems (SQL and NoSQL)",
      "Understanding of microservice architecture",
      "Experience with cloud platforms (AWS, GCP, Azure)"
    ],
    tags: ["Node.js", "Python", "API", "Database"]
  },
  {
    id: 5,
    title: "UX/UI Designer",
    company: "DesignMinds",
    location: "Remote",
    type: "Contract",
    salary: "$60-80/hour",
    experience: "2-5 years",
    posted: "5 days ago",
    description: "Contract opportunity for a talented UX/UI designer to help create intuitive and beautiful interfaces for our mobile and web applications.",
    responsibilities: [
      "Create wireframes, prototypes, and mockups",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Maintain design systems and documentation"
    ],
    requirements: [
      "Portfolio demonstrating UX/UI design skills",
      "Experience with Figma, Sketch, or Adobe XD",
      "Understanding of design principles and accessibility",
      "Ability to translate user needs into design solutions"
    ],
    tags: ["UX", "UI", "Figma", "Design", "Contract"]
  },
  {
    id: 6,
    title: "Product Management Intern",
    company: "ProductLabs",
    location: "Boston, MA",
    type: "Internship",
    salary: "$25-30/hour",
    experience: "Student",
    posted: "2 weeks ago",
    description: "Exciting internship opportunity for students interested in product management. Learn how products are developed from conception to launch.",
    responsibilities: [
      "Assist in defining product requirements",
      "Conduct market research and competitor analysis",
      "Help prioritize features and create roadmaps",
      "Work with cross-functional teams"
    ],
    requirements: [
      "Currently pursuing a degree in Business, Computer Science, or related field",
      "Strong analytical and problem-solving skills",
      "Excellent communication abilities",
      "Interest in technology and product development"
    ],
    tags: ["Product Management", "Business", "Internship", "Strategy"]
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Remote",
    type: "Full-time",
    salary: "$115,000 - $140,000",
    experience: "4-7 years",
    posted: "3 days ago",
    description: "Join our DevOps team to build and maintain cloud infrastructure. You'll help ensure our systems are scalable, secure, and highly available.",
    responsibilities: [
      "Implement CI/CD pipelines",
      "Manage cloud infrastructure (AWS/GCP)",
      "Automate deployment and monitoring",
      "Collaborate with development teams on infrastructure needs"
    ],
    requirements: [
      "Experience with cloud platforms (AWS, GCP, Azure)",
      "Knowledge of containerization (Docker, Kubernetes)",
      "Experience with infrastructure as code (Terraform, CloudFormation)",
      "Understanding of networking and security concepts"
    ],
    tags: ["DevOps", "AWS", "CI/CD", "Kubernetes"]
  }
];

export default jobsData;