import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Flame, Trophy } from 'lucide-react';
import { LeaderboardUser } from '../../types';

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  currentUserId?: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ users, currentUserId }) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-orange-500" />;
    return <span className="text-gray-500 dark:text-gray-400 font-medium">#{rank}</span>;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Weekly Leaderboard</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Top performers this week</p>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              user.id === currentUserId ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8">
                {getRankIcon(user.rank)}
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-lg">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Flame className="w-3 h-3" />
                      <span>{user.streak} day streak</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-1 text-lg font-semibold text-gray-900 dark:text-white">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span>{user.xp.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">XP</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          Keep learning to climb the leaderboard! 🚀
        </p>
      </div>
    </div>
  );
};

export default LeaderboardTable;