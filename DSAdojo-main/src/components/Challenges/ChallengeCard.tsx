import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Trophy, CheckCircle, ExternalLink } from 'lucide-react';
import { Challenge } from '../../types';

interface ChallengeCardProps {
  challenge: Challenge;
  onStart: (challenge: Challenge) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onStart }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
      case 'hard': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg dark:hover:shadow-xl transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{challenge.title}</h3>
            {challenge.isCompleted && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{challenge.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
            {challenge.difficulty}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            {challenge.category}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          {challenge.timeLimit && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{challenge.timeLimit}min</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4" />
            <span>{challenge.xpReward} XP</span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onStart(challenge)}
        className="w-full py-3 px-4 rounded-lg font-medium transition-colors bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 flex items-center justify-center space-x-2"
      >
        <span>Solve on LeetCode</span>
        <ExternalLink className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

export default ChallengeCard;