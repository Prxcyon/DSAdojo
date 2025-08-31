import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, BookOpen, Target } from 'lucide-react';
import { getDataStructureCategories } from '../data/mockData';
import { useUser } from '../context/UserContext';
import LessonCard from '../components/Learn/LessonCard';
import challengesIcon from '../../assets/challenges.png';

const DataStructureCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { preferredLanguage } = useUser();

  // Pass the preferred language to get filtered categories
  const categories = getDataStructureCategories(preferredLanguage);
  const category = categories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category Not Found</h1>
          <button
            onClick={() => navigate('/learn')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Learning
          </button>
        </div>
      </div>
    );
  }

  const handleLessonClick = (lessonId: string) => {
    navigate(`/learn/${categoryId}/${lessonId}`);
  };

  const completionPercentage = category.totalQuestions > 0 
    ? Math.round((category.completedQuestions / category.totalQuestions) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-[#111113]">
      {/* Header */}
      <div className="bg-white dark:bg-[#18181b] border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4"
          >
            <button
              onClick={() => navigate('/learn')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{category.title}</h1>
                  <p className="text-gray-600 dark:text-gray-300">Master the fundamentals step by step</p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {completionPercentage}% Complete
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-[#18181b] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Lessons</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{category.lessons.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#18181b] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Questions</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.completedQuestions}/{category.totalQuestions}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#18181b] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <img src={challengesIcon} alt="Challenges" className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total XP</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.lessons.reduce((sum, lesson) => sum + lesson.xpReward, 0)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lessons Path */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-[#18181b] rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Learning Path</h2>
          
          {category.lessons.length > 0 ? (
            <div className="max-w-2xl mx-auto space-y-8">
              {category.lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  onClick={() => handleLessonClick(lesson.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Lessons Available</h3>
              <p className="text-gray-600 dark:text-gray-400">Lessons for this category are coming soon!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DataStructureCategoryPage;