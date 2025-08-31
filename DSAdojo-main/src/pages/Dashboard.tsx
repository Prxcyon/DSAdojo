import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Flame, Crown, BookOpen, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { useUser } from '../context/UserContext';
import StatsCard from '../components/Dashboard/StatsCard';
import ActivityCalendar from '../components/Dashboard/ActivityCalendar';
import { mockChallenges } from '../data/mockData';
import Achievements from '../components/Common/Achievements';
import { useNavigate } from 'react-router-dom';
import levelIcon from '../../assets/level.png';
import streakIcon from '../../assets/streak.png';
import challengesIcon from '../../assets/challenges.png';
import crownIcon from '../../assets/crowns.png';
import SplitText from '../components/Common/SplitText';
import CountUp from '../components/Common/CountUp';
import { useAchievementsModal } from '../components/Common/Achievements';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { open, openModal, closeModal } = useAchievementsModal();

  const recentChallenges = mockChallenges.slice(0, 3);
  const completedChallenges = mockChallenges.filter(c => c.isCompleted).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-200 dark:bg-[#111113]">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <SplitText
          text={`Welcome back, ${user?.username}! 👋`}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          splitType="chars"
          delay={30}
          duration={0.6}
          ease="power3.out"
        />
        <p className="text-gray-600 dark:text-gray-300">Ready to continue your DSA journey?</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Current Level"
          value={<CountUp to={user?.level || 0} />}
          icon={<img src={levelIcon} alt="Level" className="w-7 h-7 min-w-[1.75rem]" />}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          subtitle={`${user?.xp} XP`}
        />
        <StatsCard
          title="Daily Streak"
          value={<CountUp to={user?.streak || 0} />}
          icon={<img src={streakIcon} alt="Streak" className="w-7 h-7 min-w-[1.75rem]" />}
          color="bg-gradient-to-br from-orange-500 to-red-500"
          subtitle="days"
        />
        <StatsCard
          title="Total Crowns"
          value={<CountUp to={user?.crowns || 0} />}
          icon={<img src={crownIcon} alt="Crown" className="w-7 h-7 min-w-[1.75rem]" />}
          color="bg-gradient-to-br from-yellow-500 to-orange-500"
        />
        <StatsCard
          title="Challenges Done"
          value={<CountUp to={completedChallenges} />}
          icon={<img src={challengesIcon} alt="Challenges" className="w-7 h-7 min-w-[1.75rem]" />}
          color="bg-gradient-to-br from-green-500 to-green-600"
          subtitle={`of ${mockChallenges.length}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Learning Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#18181b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Goal</h3>
              <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">{user?.dailyGoal} XP</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-300">Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">35 / {user?.dailyGoal} XP</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300">
              You're 70% of the way to your daily goal! Keep it up! 🎯
            </p>
          </motion.div>

          {/* Recent Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-[#18181b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommended Challenges</h3>
            <div className="space-y-3">
              {recentChallenges.map((challenge, index) => (
                <div key={challenge.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      challenge.difficulty === 'easy' ? 'bg-green-500' :
                      challenge.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{challenge.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{challenge.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{challenge.xpReward} XP</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
                    >
                      Start
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-[#18181b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                onClick={() => navigate('/learn')}
              >
                <BookOpen className="w-5 h-5" />
                <span>Continue Learning</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                onClick={() => navigate('/challenges')}
              >
                <Target className="w-5 h-5" />
                <span>Take Challenge</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all relative group"
              >
                <Brain className="w-5 h-5" />
                <span>Mock Interview</span>
                <span className="absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap bg-gray-900 text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
                  Upcoming feature: Take live real-time AI interviews!
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-[#18181b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
            <Achievements userLevel={user?.level} userStreak={user?.streak} userAchievements={user?.achievements} mode="sidebar" onClose={openModal} />
            {open && (
              <Achievements userLevel={user?.level} userStreak={user?.streak} userAchievements={user?.achievements} modal onClose={closeModal} />
            )}
          </motion.div>
        </div>
      </div>

      {/* Activity Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <ActivityCalendar />
      </motion.div>
    </div>
  );
};

export default Dashboard;