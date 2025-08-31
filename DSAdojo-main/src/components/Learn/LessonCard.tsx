import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, BookOpen, Trophy, Star } from 'lucide-react';
import { Lesson } from '../../types';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  onClick: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, index, onClick }) => {
  const getStatusIcon = () => {
    if (lesson.isLocked) {
      return <Lock className="w-6 h-6 text-gray-400" />;
    }
    if (lesson.isCompleted) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    return <BookOpen className="w-6 h-6 text-blue-500" />;
  };

  const getStatusColor = () => {
    if (lesson.isLocked) return 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600';
    if (lesson.isCompleted) return 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/50';
    return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return '📖';
      case 'practice': return '💻';
      case 'challenge': return '🎯';
      case 'quiz': return '❓';
      default: return '📚';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Connecting line to next lesson */}
      {index > 0 && (
        <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2" />
      )}
      
      <motion.div
        whileHover={lesson.isLocked ? {} : { scale: 1.02, y: -2 }}
        whileTap={lesson.isLocked ? {} : { scale: 0.98 }}
        onClick={lesson.isLocked ? undefined : onClick}
        className={`
          relative p-6 rounded-xl border-2 transition-all duration-200 
          ${getStatusColor()}
          ${lesson.isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer shadow-sm hover:shadow-md dark:hover:shadow-lg'}
          min-h-[200px] flex flex-col justify-between
        `}
      >
        {/* Crown levels indicator */}
        {lesson.crownLevel > 0 && (
          <div className="absolute -top-2 -right-2 flex space-x-1">
            {Array.from({ length: lesson.crownLevel }).map((_, i) => (
              <div key={i} className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Trophy className="w-3 h-3 text-yellow-800" />
              </div>
            ))}
          </div>
        )}

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{lesson.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{lesson.description}</p>
              </div>
            </div>
            <span className="text-2xl">{getTypeIcon(lesson.type)}</span>
          </div>

          {/* Lesson details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                {lesson.difficulty}
              </span>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{lesson.xpReward} XP</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">{lesson.content.questions.length}</span> questions
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              {lesson.isCompleted ? 'Completed' : lesson.isLocked ? 'Locked' : 'Ready to start'}
            </span>
            {lesson.isCompleted && (
              <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Done</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LessonCard;