import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Trophy, Target, Calendar, Crown, Flame, BookOpen, Code } from 'lucide-react';
import { useUser } from '../context/UserContext';
import ActivityCalendar from '../components/Dashboard/ActivityCalendar';
import Achievements from '../components/Common/Achievements';
import levelIcon from '../../assets/level.png';
import streakIcon from '../../assets/streak.png';
import challengesIcon from '../../assets/challenges.png';
import crownIcon from '../../assets/crowns.png';
import pythonImg from '../../assets/python.png';
import javaImg from '../../assets/java.png';
import cppImg from '../../assets/cpp.png';
import { useAchievementsModal } from '../components/Common/Achievements';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, preferredLanguage, updatePreferredLanguage } = useUser();
  const { open, openModal, closeModal } = useAchievementsModal();
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [newPhoto, setNewPhoto] = React.useState<File | null>(null);
  const [newPassword, setNewPassword] = React.useState('');
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [changingPassword, setChangingPassword] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState('');
  const navigate = useNavigate();

  const profileStats = [
    { label: 'Total XP', value: user?.xp.toLocaleString() || '0', icon: <img src={levelIcon} alt="Level" className="w-7 h-7 min-w-[1.75rem]" /> },
    { label: 'Current Streak', value: `${user?.streak || 0} days`, icon: <img src={streakIcon} alt="Streak" className="w-7 h-7 min-w-[1.75rem]" /> },
    { label: 'Crowns Earned', value: user?.crowns || 0, icon: <img src={crownIcon} alt="Crown" className="w-7 h-7 min-w-[1.75rem]" /> },
    { label: 'Lessons Completed', value: user?.languageProgress.reduce((acc, lang) => acc + lang.lessonsCompleted, 0) || 0, icon: <img src={challengesIcon} alt="Challenges" className="w-7 h-7 min-w-[1.75rem]" /> }
  ];

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'python': return '🐍';
      case 'java': return '☕';
      case 'cpp': return '⚡';
      default: return '💻';
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'python': return 'from-green-400 to-green-600';
      case 'java': return 'from-yellow-400 to-yellow-600';
      case 'cpp': return 'from-blue-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getLanguageDisplayName = (language: string) => {
    switch (language) {
      case 'python': return 'Python';
      case 'java': return 'Java';
      case 'cpp': return 'C++';
      default: return language;
    }
  };

  const getLanguageImage = (language: string) => {
    switch (language) {
      case 'python': return pythonImg;
      case 'java': return javaImg;
      case 'cpp': return cppImg;
      default: return '';
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDialogClose = () => {
    setShowEditDialog(false);
    setNewPhoto(null);
    setNewPassword('');
    setPreviewUrl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/', { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-200 dark:bg-[#111113]">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#18181b] rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.username}</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{user?.email}</p>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  Level {user?.level}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Joined {new Date(user?.joinDate || '').toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setShowEditDialog(true)}
            >
              <Settings className="w-4 h-4" />
              <span>Edit Profile</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-600 transition-colors"
              onClick={handleSignOut}
            >
              <span>Sign Out</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Edit Profile Dialog */}
      {showEditDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#18181b] rounded-xl shadow-xl max-w-md w-full mx-4 p-8 relative">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit Profile</h2>
            <form className="space-y-6" onSubmit={e => { e.preventDefault(); setShowEditDialog(false); setChangingPassword(false); setOldPassword(''); setNewPassword(''); }}>
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Photo</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl text-gray-400 dark:text-gray-500">{user?.username.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <label className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                    Choose from media
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </label>
                </div>
              </div>
              {/* Change Password */}
              <div>
                {!changingPassword ? (
                  <button
                    type="button"
                    onClick={() => setChangingPassword(true)}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Change Password
                  </button>
                ) : (
                  <>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Old Password</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white mb-3"
                      placeholder="Enter old password"
                    />
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter new password"
                    />
                    <div className="flex justify-end space-x-3 pt-2">
                      <button type="button" onClick={() => { setChangingPassword(false); setOldPassword(''); setNewPassword(''); }} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
                      <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save Changes</button>
                    </div>
                  </>
                )}
              </div>
              {!changingPassword && (
                <div className="flex justify-end space-x-3 pt-2">
                  <button type="button" onClick={handleDialogClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save Changes</button>
                </div>
              )}
            </form>
            <button onClick={handleDialogClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl">&times;</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats and Progress */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {profileStats.map((stat, index) => (
              <div key={stat.label} className="bg-white dark:bg-[#18181b] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Language Preference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-[#18181b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Code className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferred Programming Language</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['python', 'java', 'cpp'] as const).map((language) => (
                <motion.button
                  key={language}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updatePreferredLanguage(language)}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200
                    ${preferredLanguage === language
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {preferredLanguage === language && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <img src={getLanguageImage(language)} alt={getLanguageDisplayName(language)} className="w-12 h-12 object-contain" />
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                      {getLanguageDisplayName(language)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.languageProgress.find(p => p.language === language)?.lessonsCompleted || 0} lessons
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <span className="font-medium">Current selection:</span> {getLanguageDisplayName(preferredLanguage)}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                This will filter lessons and challenges to show content for your preferred language.
              </p>
            </div>
          </motion.div>

          {/* Language Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#18181b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Language Progress</h3>
            <div className="space-y-6">
              {user?.languageProgress.map((progress) => (
                <div key={progress.language} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br">
                        <img src={getLanguageImage(progress.language)} alt={getLanguageDisplayName(progress.language)} className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {getLanguageDisplayName(progress.language)}
                          {progress.language === preferredLanguage && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{progress.lessonsCompleted} lessons completed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">{progress.totalXp} XP</p>
                      <div className="flex items-center space-x-1">
                        <Crown className="w-3 h-3 text-yellow-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{progress.crowns}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getLanguageColor(progress.language)}`}
                      style={{ width: `${Math.min((progress.lessonsCompleted / 20) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ActivityCalendar />
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-[#18181b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
            <Achievements userLevel={user?.level} userStreak={user?.streak} userAchievements={user?.achievements} mode="sidebar" onClose={openModal} />
            {open && (
              <Achievements userLevel={user?.level} userStreak={user?.streak} userAchievements={user?.achievements} modal onClose={closeModal} />
            )}
          </motion.div>

          {/* Daily Goal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-[#18181b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Goal</h3>
              <Target className="w-5 h-5 text-green-500" />
            </div>
            
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user?.dailyGoal}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">XP per day</p>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3">
                <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" style={{ width: '70%' }} />
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">35 / {user?.dailyGoal} XP today</p>
            </div>
          </motion.div>

          {/* Pro Upgrade */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white"
          >
            <h3 className="text-lg font-semibold mb-2">Upgrade to Pro</h3>
            <p className="text-sm opacity-90 mb-4">
              Unlock unlimited hearts, advanced features, and personalized learning paths.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Upgrade Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;