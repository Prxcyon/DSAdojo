import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Users, 
  Zap, 
  CheckCircle, 
  Star,
  ArrowRight,
  Menu,
  X,
  Play,
  Award,
  TrendingUp,
  Brain,
  Sun,
  Moon,
  Bot
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Gamified Learning That Keeps You Hooked",
      description: "DSAdojo turns complex coding topics into interactive lessons, XP challenges, and badge-based progress — just like Duolingo. You'll actually want to come back every day."
    },
    {
      icon: <Brain className="w-8 h-8 text-green-500" />,
      title: "Master DSA, One Concept at a Time",
      description: "Structured into levels (Arrays → Stacks → Graphs...), DSAdojo helps you build a rock-solid foundation step-by-step with MCQs, code challenges, output prediction, and fill-in-the-blank formats."
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "Track Progress with Streaks, Crowns, and Skill Tree",
      description: "Stay motivated with visual streak counters, unlockable crowns, and a DSA roadmap. Your journey from \"Algorithm Apprentice\" to \"Graph Guru\" is visible, measurable, and rewarding."
    },
    {
      icon: <Bot className="w-8 h-8 text-purple-500" />,
      title: "AI-Driven Feedback & Motivation",
      description: "With personalized voice encouragements (via ElevenLabs), Tavus video feedback, and GPT-powered hints, you're never stuck — it's like having a mentor in your pocket."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Start Your Journey",
      description: "Create your profile and take our quick assessment to find your starting point"
    },
    {
      number: "02", 
      title: "Learn & Practice",
      description: "Work through interactive lessons, solve coding challenges, and build your skills"
    },
    {
      number: "03",
      title: "Track Progress",
      description: "Monitor your daily streaks, XP gains, and unlock new achievements"
    },
    {
      number: "04",
      title: "Master DSA",
      description: "Become interview-ready with comprehensive DSA knowledge and problem-solving skills"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="DSAdojo Logo" 
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">DSAdojo</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">How it Works</a>
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>

            <button 
              className="md:hidden text-gray-900 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-gray-600 dark:text-gray-300">Features</a>
              <a href="#how-it-works" className="block py-2 text-gray-600 dark:text-gray-300">How it Works</a>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600 dark:text-gray-300">Dark Mode</span>
                <button 
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
              <button className="block w-full bg-blue-600 text-white py-2 rounded-lg mt-2">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  <span>Learn DSA the Fun Way</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Master Data Structures & Algorithms
                  <span className="text-blue-600"> Like a Game</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Transform your coding skills with our gamified learning platform. 
                  Earn XP, unlock achievements, and become interview-ready through 
                  interactive challenges and visual explanations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Learning Free</span>
                </button>
                <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-colors flex items-center justify-center space-x-2">
                  <span>Watch Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img 
                  src={isDarkMode ? "/image copy.png" : "/image.png"} 
                  alt="DSAdojo Dashboard Preview" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm transform rotate-12">
                Live Dashboard!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose DSAdojo?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We've reimagined how you learn data structures and algorithms, 
              making it engaging, effective, and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How DSAdojo Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our proven 4-step approach helps you master DSA concepts 
              efficiently and enjoyably.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center border border-gray-100 dark:border-gray-700">
                  <div className="text-4xl font-bold text-blue-600 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-300 dark:text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="/logo.png" 
                  alt="DSAdojo Logo" 
                  className="w-10 h-10 rounded-lg"
                />
                <span className="text-xl font-bold">DSAdojo</span>
              </div>
              <p className="text-gray-400 dark:text-gray-500 max-w-md">
                Making data structures and algorithms accessible and fun for everyone.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <a 
                href="https://bolt.new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                <Zap className="w-4 h-4" />
                <span>Built with Bolt</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>&copy; 2025 DSAdojo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;