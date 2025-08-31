import React, { useState } from 'react';
import { Trophy, Flame, BookOpen, Star, Shield, Brain, Code, Target, Crown, Medal, Users, Calendar } from 'lucide-react';
import streakIcon from '../../../assets/streak.png';
import levelIcon from '../../../assets/level.png';
import challengesIcon from '../../../assets/challenges.png';

// Achievement data (static for now, can be moved to a data file)
const LEVEL_ACHIEVEMENTS = [
  { level: 1, title: "Algorithm Apprentice", flair: "Just getting started!", icon: <Trophy className="w-6 h-6 text-yellow-500" /> },
  { level: 2, title: "Code Novice", flair: "You're warming up the compiler 🔥", icon: <img src={streakIcon} alt="Streak" className="w-6 h-6" /> },
  { level: 3, title: "Loop Learner", flair: "You've found your rhythm 🌀", icon: <BookOpen className="w-6 h-6 text-blue-500" /> },
  { level: 4, title: "Stack Scholar", flair: "You're stacking up knowledge ☁️", icon: <Star className="w-6 h-6 text-yellow-400" /> },
  { level: 5, title: "Binary Boss", flair: "You see the world in 0s and 1s", icon: <Code className="w-6 h-6 text-gray-700 dark:text-gray-200" /> },
  { level: 6, title: "Recursion Raider", flair: "You fear no infinite loops", icon: <Brain className="w-6 h-6 text-purple-500" /> },
  { level: 7, title: "Graph Guru", flair: "You're well-connected 😎", icon: <Users className="w-6 h-6 text-blue-400" /> },
  { level: 8, title: "Tree Tactician", flair: "You've mastered roots, branches, and leaves 🌳", icon: <BookOpen className="w-6 h-6 text-green-600" /> },
  { level: 9, title: "Heap Hero", flair: "Priority is your middle name!", icon: <Crown className="w-6 h-6 text-yellow-600" /> },
  { level: 10, title: "Algorithm Architect", flair: "You see patterns where others see code 💡", icon: <Medal className="w-6 h-6 text-indigo-500" /> },
];

const STREAK_ACHIEVEMENTS = [
  { streak: 3, title: "Focused Coder", desc: "Getting into the groove", icon: <img src={streakIcon} alt="Streak" className="w-6 h-6" /> },
  { streak: 7, title: "Debugger Streaker", desc: "One week, zero bugs 🐛", icon: <Shield className="w-6 h-6 text-green-500" /> },
  { streak: 14, title: "Consistency Captain", desc: "The grind is real ⚙️", icon: <Star className="w-6 h-6 text-yellow-400" /> },
  { streak: 30, title: "Daily Devotee", desc: "You've unlocked true dedication 🗓️", icon: <Calendar className="w-6 h-6 text-blue-500" /> },
  { streak: 50, title: "Legendary Loopster", desc: "Infinite loops of discipline 🔁", icon: <Trophy className="w-6 h-6 text-yellow-500" /> },
];

const QUIZ_ACHIEVEMENTS = [
  { type: "5/5", title: "Precision Coder", desc: "All test cases passed, no sweat 😌", icon: <img src={challengesIcon} alt="Challenges" className="w-6 h-6" /> },
  { type: "fastest", title: "Code Sprinter", desc: "Fastest fingers in the IDE ⚡", icon: <img src={streakIcon} alt="Streak" className="w-6 h-6" /> },
  { type: "no-hints", title: "Hintless Hero", desc: "You like it raw 🍝", icon: <Shield className="w-6 h-6 text-blue-500" /> },
  { type: "10-done", title: "Problem-Slaying Prodigy", desc: "Nothing stands in your way", icon: <Trophy className="w-6 h-6 text-yellow-500" /> },
  { type: "25-done", title: "Master of Patterns", desc: "You cracked the code behind the code 🔐", icon: <Star className="w-6 h-6 text-yellow-400" /> },
];

const TOPIC_ACHIEVEMENTS = [
  { topic: "Arrays", title: "Array Ace", desc: "You've unboxed the basics 📦", icon: <BookOpen className="w-6 h-6 text-green-600" /> },
  { topic: "Strings", title: "String Sorcerer", desc: "Conqueror of characters ✨", icon: <BookOpen className="w-6 h-6 text-pink-500" /> },
  { topic: "Linked Lists", title: "Link Lord", desc: "Node by node, you've ruled them all 🔗", icon: <BookOpen className="w-6 h-6 text-blue-400" /> },
  { topic: "Trees", title: "Tree Whisperer", desc: "You speak fluent recursion 🌲", icon: <BookOpen className="w-6 h-6 text-green-700" /> },
  { topic: "Graphs", title: "The Pathfinder", desc: "You never get lost 🧭", icon: <BookOpen className="w-6 h-6 text-indigo-500" /> },
  { topic: "Dynamic Prog.", title: "DP Dynamo", desc: "Optimal from every subpath 🧬", icon: <BookOpen className="w-6 h-6 text-purple-500" /> },
];

const SPECIAL_ACHIEVEMENTS = [
  { cond: "2am", title: "Midnight Coder", desc: "Sleep is for the weak 🦉", icon: <Star className="w-6 h-6 text-gray-700 dark:text-gray-200" /> },
  { cond: "3x-wrong", title: "Debugging Champ", desc: "Persistence pays off 💪", icon: <Shield className="w-6 h-6 text-green-500" /> },
  { cond: "helped-peer", title: "Community Crusader", desc: "Kindness is algorithmic 🤝", icon: <Users className="w-6 h-6 text-blue-400" /> },
  { cond: "all-daily", title: "Daily Dominator", desc: "Nothing left unchecked 📋", icon: <Calendar className="w-6 h-6 text-blue-500" /> },
  { cond: "one-try", title: "One-Shot Wonder", desc: "You're a natural 🎯", icon: <img src={challengesIcon} alt="Challenges" className="w-6 h-6" /> },
];

interface AchievementsProps {
  userLevel?: number;
  userStreak?: number;
  userAchievements?: { id: string; title: string; description: string; icon: string; unlockedAt: string; }[];
  mode?: 'full' | 'sidebar';
}

export function useAchievementsModal() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return { open, openModal, closeModal };
}

const Achievements: React.FC<AchievementsProps & { modal?: boolean; onClose?: () => void }> = ({ userLevel, userStreak, userAchievements, mode = 'full', modal = false, onClose }) => {
  // Helper to check if unlocked
  const isUnlocked = (type: 'level' | 'streak' | 'quiz' | 'topic' | 'special', key: any) => {
    if (type === 'level') return userLevel && userLevel >= key;
    if (type === 'streak') return userStreak && userStreak >= key;
    // For demo, always return false for others
    return false;
  };

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl p-8 shadow-xl max-w-2xl w-full border border-gray-200 dark:border-gray-800 overflow-y-auto max-h-[90vh] relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl">&times;</button>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">All Achievements</h2>
            {/* Full achievements list below */}
            <div className={mode === 'sidebar' ? '' : 'space-y-8'}>
              {/* Level Achievements */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2 flex items-center"><Trophy className="w-5 h-5 mr-2 text-yellow-500" /> Learning Progress</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {LEVEL_ACHIEVEMENTS.map(a => (
                    <div key={a.level} className={`flex items-center p-3 rounded-lg border ${isUnlocked('level', a.level) ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'}`}>
                      <span className="mr-3">{a.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{a.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{a.flair}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Streak Achievements */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2 flex items-center"><img src={streakIcon} alt="Streak" className="w-5 h-5 mr-2" /> Daily Streak</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STREAK_ACHIEVEMENTS.map(a => (
                    <div key={a.streak} className={`flex items-center p-3 rounded-lg border ${isUnlocked('streak', a.streak) ? 'bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-700' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'}`}>
                      <span className="mr-3">{a.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{a.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Quiz & Challenge Achievements */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2 flex items-center"><img src={challengesIcon} alt="Challenges" className="w-5 h-5 mr-2" /> Quiz & Challenge</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {QUIZ_ACHIEVEMENTS.map(a => (
                    <div key={a.type} className="flex items-center p-3 rounded-lg border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60">
                      <span className="mr-3">{a.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{a.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Topic Mastery Achievements */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2 flex items-center"><BookOpen className="w-5 h-5 mr-2 text-blue-500" /> Topic Mastery</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TOPIC_ACHIEVEMENTS.map(a => (
                    <div key={a.topic} className="flex items-center p-3 rounded-lg border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60">
                      <span className="mr-3">{a.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{a.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Special Achievements */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2 flex items-center"><Shield className="w-5 h-5 mr-2 text-green-500" /> Special Achievements</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SPECIAL_ACHIEVEMENTS.map(a => (
                    <div key={a.cond} className="flex items-center p-3 rounded-lg border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60">
                      <span className="mr-3">{a.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{a.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* User's unlocked achievements (if any) */}
              {userAchievements && userAchievements.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2 flex items-center"><Star className="w-5 h-5 mr-2 text-yellow-400" /> Your Unlocked Achievements</h4>
                  <div className="space-y-2">
                    {userAchievements.map(a => (
                      <div key={a.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                        <span className="text-2xl">{a.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{a.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{a.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Earned {new Date(a.unlockedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!modal && (
        <button onClick={onClose} className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg font-semibold shadow hover:from-yellow-500 hover:to-yellow-600 transition-all">
          <Star className="w-5 h-5 mr-2" /> View All Achievements
        </button>
      )}
    </>
  );
};

export default Achievements; 