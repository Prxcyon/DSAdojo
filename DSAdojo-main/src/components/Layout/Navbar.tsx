import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Flame, Crown, Menu, X, Sun, Moon } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import logo from '../../../logo.png';
import homeIcon from '../../../assets/home.png';
import learnIcon from '../../../assets/learn.png';
import challengesIcon from '../../../assets/challenges.png';
import leaderboardIcon from '../../../assets/leadearboard.png';
import profileIcon from '../../../assets/profile.png';
import heartIcon from '../../../assets/heart.png';
import crownIcon from '../../../assets/crowns.png';
import streakIcon from '../../../assets/streak.png';

// Add a global event for lesson leave modal
const triggerLessonLeaveModal = () => {
  const event = new CustomEvent('showLessonLeaveModal');
  window.dispatchEvent(event);
};

const Navbar: React.FC = () => {
  const { user, isDarkMode, toggleDarkMode } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper to check if user is in a lesson (mid-session)
  const isInLesson = location.pathname.startsWith('/learn/') && location.pathname.split('/').length === 4;

  const navItems = [
    { path: '/learn', label: 'Learn', icon: <img src={learnIcon} alt="Learn" className="w-9 h-9 min-w-[2.25rem] mr-2" /> },
    { path: '/challenges', label: 'Challenges', icon: <img src={challengesIcon} alt="Challenges" className="w-9 h-9 min-w-[2.25rem] mr-2" /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <img src={leaderboardIcon} alt="Leaderboard" className="w-9 h-9 min-w-[2.25rem] mr-2" /> },
    { path: '/profile', label: 'Profile', icon: <img src={profileIcon} alt="Profile" className="w-9 h-9 min-w-[2.25rem] mr-2" /> }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (isInLesson) {
      e.preventDefault();
      triggerLessonLeaveModal();
      return;
    }
    navigate(path);
  };

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name (Home) */}
          <Link to="/" className="flex items-center space-x-4 mr-10">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain rounded-lg shadow" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">DSAdojo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Stats and Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <img src={heartIcon} alt="Heart" className="w-9 h-9 min-w-[2.25rem] mr-2" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">{user?.hearts}</span>
              </div>
              <div className="flex items-center space-x-1">
                <img src={streakIcon} alt="Streak" className="w-9 h-9 min-w-[2.25rem] mr-2" />
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{user?.streak}</span>
              </div>
              <div className="flex items-center space-x-1">
                <img src={crownIcon} alt="Crown" className="w-9 h-9 min-w-[2.25rem] mr-2" />
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{user?.crowns}</span>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  handleNavClick(e, item.path);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${
                  isActive(item.path) 
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;