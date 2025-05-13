import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Home({ darkMode }) {
  // Get icons as components
  const BriefcaseIcon = getIcon('Briefcase');
  const GraduationCapIcon = getIcon('GraduationCap');
  const BuildingIcon = getIcon('Building');
  const SearchIcon = getIcon('Search');
  const ArrowRightIcon = getIcon('ArrowRight');
  const CheckCircleIcon = getIcon('CheckCircle');
  
  const navigate = useNavigate();

  // Sample featured job openings
  const [featuredJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      type: "Full-time",
      posted: "2 days ago",
      description: "Exciting opportunity for a frontend developer with React experience to join our innovative team.",
      tags: ["React", "JavaScript", "Tailwind CSS"]
    },
    {
      id: 2,
      title: "Marketing Intern",
      company: "GrowthMedia",
      location: "New York, NY",
      type: "Internship",
      posted: "1 week ago",
      description: "Learn digital marketing strategies while working with industry professionals.",
      tags: ["Marketing", "Social Media", "Content Creation"]
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "AnalyticsAI",
      location: "Hybrid",
      type: "Full-time",
      posted: "3 days ago",
      description: "Join our team to develop machine learning models for predictive analytics.",
      tags: ["Python", "ML", "Data Analysis"]
    }
  ]);

  // Stats
  const stats = [
    { number: "500+", label: "Companies", icon: BuildingIcon },
    { number: "1,200+", label: "Job Listings", icon: BriefcaseIcon },
    { number: "10,000+", label: "Students", icon: GraduationCapIcon }
  ];

  // Features
  const features = [
    {
      title: "Profile Creation",
      description: "Create your student profile highlighting your skills, education, and experience."
    },
    {
      title: "Job Search",
      description: "Browse and filter through hundreds of job and internship opportunities."
    },
    {
      title: "Direct Applications",
      description: "Apply directly to positions through our streamlined application process."
    },
    {
      title: "Company Connections",
      description: "Connect with top companies looking for talented students like you."
    }
  ];

  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent/10 dark:from-primary-dark/10 dark:to-accent/10 -z-10"></div>
        <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-accent/30 dark:bg-accent/20 rounded-full blur-3xl top-0 right-0 -translate-y-1/2 translate-x-1/2 -z-10"></div>
        <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-primary/30 dark:bg-primary/20 rounded-full blur-3xl bottom-0 left-0 translate-y-1/2 -translate-x-1/2 -z-10"></div>
        
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <motion.h1 
                className="font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-surface-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Connect with <span className="text-primary">Career</span> Opportunities
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-surface-700 dark:text-surface-300 max-w-2xl mx-auto md:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                CareerBridge helps students discover and apply for the perfect job or internship while connecting companies with top talent.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button 
                  className="btn-primary flex items-center justify-center gap-2 py-3 px-6 text-base"
                  onClick={() => navigate('/jobs')}
                >
                  Find Jobs <ArrowRightIcon className="h-5 w-5" />
                </button>
                <button 
                  className="btn-outline flex items-center justify-center gap-2 py-3 px-6 text-base"
                  onClick={() => navigate('/employers')}
                > 
                  For Employers
                </button>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Students finding career opportunities" 
                className="w-full h-auto object-cover rounded-xl shadow-soft"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="card flex flex-col items-center text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-surface-900 dark:text-white">{stat.number}</h3>
                <p className="text-surface-600 dark:text-surface-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="py-8 md:py-16 bg-surface-100 dark:bg-surface-800/50 rounded-3xl mx-4">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Find Your Perfect Opportunity</h2>
            <p className="max-w-2xl mx-auto text-lg text-surface-600 dark:text-surface-400">
              Our job search feature helps you discover and apply for positions that match your skills and career goals.
            </p>
          </div>
          
          <MainFeature darkMode={darkMode} />
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Opportunities</h2>
              <p className="text-surface-600 dark:text-surface-400 mt-2">Explore our latest job and internship listings</p>
            </div>
            <button 
              className="flex items-center gap-2 text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
              onClick={() => navigate('/opportunities')}
            >
              View all opportunities
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <motion.div 
                key={job.id}
                className="card group hover:shadow-soft transition-all duration-300 border-2 hover:border-primary dark:hover:border-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <span className="tag bg-primary/10 text-primary">
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center text-surface-600 dark:text-surface-400">
                      <BuildingIcon className="h-4 w-4 mr-2" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center text-surface-600 dark:text-surface-400 mt-1">
                      <BriefcaseIcon className="h-4 w-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-surface-700 dark:text-surface-300 mb-4">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="tag bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-surface-200 dark:border-surface-700">
                    <span className="text-sm text-surface-500 dark:text-surface-400">
                      {job.posted}
                    </span>
                    <button 
                      className="text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium flex items-center gap-1"
                      onClick={() => toast.success(`Applied to ${job.title} at ${job.company}!`)}
                    >
                      Apply now
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-3xl mx-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CareerBridge?</h2>
            <p className="max-w-2xl mx-auto text-surface-600 dark:text-surface-400">
              We provide a comprehensive platform to help students and companies connect seamlessly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mt-1 bg-white dark:bg-surface-800 shadow-soft dark:shadow-none w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-surface-200 dark:border-surface-700">
                  <CheckCircleIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-surface-600 dark:text-surface-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="card overflow-hidden">
            <div className="relative p-6 md:p-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/10 dark:to-accent/10"></div>
              <div className="absolute w-64 h-64 rounded-full bg-accent/30 blur-3xl -top-32 -right-32"></div>
              <div className="absolute w-64 h-64 rounded-full bg-primary/30 blur-3xl -bottom-32 -left-32"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your career journey?</h2>
                  <p className="text-surface-700 dark:text-surface-300 max-w-xl">
                    Join thousands of students who have found their dream opportunities through CareerBridge.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    className="btn-primary py-3 px-6"
                    onClick={() => toast.success("Student registration coming soon!")}
                  >
                    Get Started
                  </button>
                  <button 
                    className="btn-outline py-3 px-6"
                    onClick={() => toast.info("You can browse jobs without registering")}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;