export interface User {
  id: string;
  username: string;
  email: string;
  level: number;
  xp: number;
  streak: number;
  hearts: number;
  crowns: number;
  isPro: boolean;
  achievements: Achievement[];
  languageProgress: LanguageProgress[];
  dailyGoal: number;
  joinDate: string;
  preferredLanguage: 'python' | 'java' | 'cpp';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  xpReward: number;
}

export interface LanguageProgress {
  language: 'python' | 'cpp' | 'java';
  unitsCompleted: number;
  lessonsCompleted: number;
  totalXp: number;
  streak: number;
  crowns: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'practice' | 'challenge' | 'quiz';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  language: 'python' | 'cpp' | 'java';
  unit: string;
  content: LessonContent;
  isCompleted: boolean;
  isLocked: boolean;
  crownLevel: number;
}

export interface LessonContent {
  explanation: string;
  codeExample?: string;
  questions: Question[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'code-completion' | 'drag-drop' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | number | number[];
  explanation: string;
  code?: string;
  blanks?: string[];
  items?: string[];
  correctOrder?: number[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  xpReward: number;
  timeLimit?: number;
  language: 'python' | 'cpp' | 'javascript' | 'both';
  isCompleted: boolean;
  link: string;
}

export interface LeaderboardUser {
  id: string;
  username: string;
  xp: number;
  streak: number;
  rank: number;
  avatar: string;
}

export interface DataStructureCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  totalQuestions: number;
  completedQuestions: number;
  lessons: Lesson[];
  isComingSoon?: boolean;
}