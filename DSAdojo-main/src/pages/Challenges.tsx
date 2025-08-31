import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, ExternalLink, ChevronDown } from 'lucide-react';
import { mockChallenges } from '../data/mockData';
import ChallengeCard from '../components/Challenges/ChallengeCard';
import { Challenge } from '../types';

const CHALLENGES_PER_PAGE = 20;

const Challenges: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const difficulties = ['all', 'easy', 'medium', 'hard'];
  const categories = ['all', 'Array', 'String', 'Linked List', 'Binary Tree', 'Stack & Queue', 'Dynamic Programming', 'Graph', 'Algorithm'];

  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDifficulty && matchesCategory && matchesSearch;
  });

  // Calculate displayed challenges based on current page
  const displayedChallenges = filteredChallenges.slice(0, currentPage * CHALLENGES_PER_PAGE);
  const hasMoreChallenges = displayedChallenges.length < filteredChallenges.length;

  const handleStartChallenge = (challenge: Challenge) => {
    // Open LeetCode problem in a new tab
    window.open(challenge.link, '_blank', 'noopener,noreferrer');
  };

  const loadMoreChallenges = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedDifficulty, selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-200 dark:bg-[#111113]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-2 mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Code Challenges</h1>
          <ExternalLink className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-300">Practice with curated LeetCode problems from Striver's A2Z DSA Sheet</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-white dark:bg-[#18181b] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredChallenges.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredChallenges.length === mockChallenges.length ? 'Total Problems' : 'Filtered Problems'}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#18181b] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {filteredChallenges.filter(c => c.difficulty === 'easy').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Easy</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#18181b] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {filteredChallenges.filter(c => c.difficulty === 'medium').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#18181b] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {filteredChallenges.filter(c => c.difficulty === 'hard').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Hard</p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-[#18181b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Filter buttons */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Filters:</span>
            </div>

            {/* Difficulty filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results info */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {displayedChallenges.length} of {filteredChallenges.length} challenges
            {filteredChallenges.length !== mockChallenges.length && (
              <span className="ml-1">
                (filtered from {mockChallenges.length} total)
              </span>
            )}
          </p>
        </div>
      </motion.div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index % CHALLENGES_PER_PAGE) * 0.05 }}
          >
            <ChallengeCard challenge={challenge} onStart={handleStartChallenge} />
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreChallenges && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={loadMoreChallenges}
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            <span>Load More Challenges</span>
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}

      {/* No results message */}
      {filteredChallenges.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg">No challenges found matching your criteria.</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your filters or search terms.</p>
        </motion.div>
      )}

      {/* End of results message */}
      {!hasMoreChallenges && displayedChallenges.length > 0 && displayedChallenges.length === filteredChallenges.length && filteredChallenges.length > CHALLENGES_PER_PAGE && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 mt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-gray-500 dark:text-gray-400">
            You've reached the end! 🎉 All {filteredChallenges.length} challenges are now displayed.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Challenges;