import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Users } from 'lucide-react';
import { mockLeaderboard } from '../data/mockData';
import LeaderboardTable from '../components/Leaderboard/LeaderboardTable';

const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  const timeframes = [
    { id: 'weekly' as const, label: 'This Week', icon: <Trophy className="w-4 h-4" /> },
    { id: 'monthly' as const, label: 'This Month', icon: <Medal className="w-4 h-4" /> },
    { id: 'alltime' as const, label: 'All Time', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-200 dark:bg-[#111113]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Leaderboard</h1>
        <p className="text-gray-600 dark:text-gray-300">See how you stack up against other learners</p>
      </motion.div>

      {/* Timeframe Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white dark:bg-[#18181b] rounded-xl p-2 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex space-x-1">
            {timeframes.map((tf) => (
              <motion.button
                key={tf.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTimeframe(tf.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  timeframe === tf.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {tf.icon}
                <span className="font-medium">{tf.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 mb-8"
      >
        <div className="flex justify-center items-end space-x-8">
          {mockLeaderboard.slice(0, 3).map((user, index) => {
            const positions = [1, 0, 2]; // Second, First, Third
            const heights = ['h-24', 'h-32', 'h-20'];
            const colors = ['bg-gray-400', 'bg-yellow-500', 'bg-orange-500'];
            
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-2">
                    {user.avatar}
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{user.xp.toLocaleString()} XP</p>
                </div>
                <div className={`${heights[positions[index]]} ${colors[positions[index]]} rounded-t-lg flex items-end justify-center pb-2`}>
                  <span className="text-white font-bold text-2xl">{user.rank}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <LeaderboardTable users={mockLeaderboard} currentUserId="1" />
      </motion.div>
    </div>
  );
};

export default Leaderboard;