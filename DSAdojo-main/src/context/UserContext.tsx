import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Achievement, LanguageProgress } from '../types';

interface UserContextType {
  user: User | null;
  updateUser: (updates: Partial<User>) => void;
  addXP: (amount: number) => void;
  useHeart: () => boolean;
  addHeart: () => void;
  updateStreak: () => void;
  addAchievement: (achievement: Achievement) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  preferredLanguage: 'python' | 'java' | 'cpp';
  updatePreferredLanguage: (language: 'python' | 'java' | 'cpp') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const mockUser: User = {
  id: '1',
  username: 'CodeMaster',
  email: 'user@example.com',
  level: 5,
  xp: 1250,
  streak: 7,
  hearts: 8,
  crowns: 12,
  isPro: false,
  preferredLanguage: 'python',
  achievements: [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      unlockedAt: '2024-01-15',
      xpReward: 50
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlockedAt: '2024-01-20',
      xpReward: 100
    }
  ],
  languageProgress: [
    {
      language: 'python',
      unitsCompleted: 3,
      lessonsCompleted: 15,
      totalXp: 750,
      streak: 7,
      crowns: 8
    },
    {
      language: 'cpp',
      unitsCompleted: 2,
      lessonsCompleted: 10,
      totalXp: 500,
      streak: 5,
      crowns: 4
    },
    {
      language: 'javascript',
      unitsCompleted: 1,
      lessonsCompleted: 5,
      totalXp: 250,
      streak: 3,
      crowns: 2
    }
  ],
  dailyGoal: 50,
  joinDate: '2024-01-01'
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(mockUser);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [preferredLanguage, setPreferredLanguage] = useState<'python' | 'java' | 'cpp'>(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return (savedLanguage as 'python' | 'java' | 'cpp') || mockUser.preferredLanguage;
  });

  // Apply dark mode class to document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Update user's preferred language when it changes
  useEffect(() => {
    if (user) {
      setUser(prev => prev ? { ...prev, preferredLanguage } : prev);
    }
  }, [preferredLanguage]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const updatePreferredLanguage = (language: 'python' | 'java' | 'cpp') => {
    setPreferredLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addXP = (amount: number) => {
    if (user) {
      const newXP = user.xp + amount;
      const newLevel = Math.floor(newXP / 300) + 1;
      setUser({ ...user, xp: newXP, level: newLevel });
    }
  };

  const useHeart = (): boolean => {
    if (user && user.hearts > 0) {
      setUser({ ...user, hearts: user.hearts - 1 });
      return true;
    }
    return false;
  };

  const addHeart = () => {
    if (user && user.hearts < 10) {
      setUser({ ...user, hearts: user.hearts + 1 });
    }
  };

  const updateStreak = () => {
    if (user) {
      setUser({ ...user, streak: user.streak + 1 });
    }
  };

  const addAchievement = (achievement: Achievement) => {
    if (user) {
      setUser({ 
        ...user, 
        achievements: [...user.achievements, achievement],
        xp: user.xp + achievement.xpReward
      });
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      addXP,
      useHeart,
      addHeart,
      updateStreak,
      addAchievement,
      isDarkMode,
      toggleDarkMode,
      preferredLanguage,
      updatePreferredLanguage
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};