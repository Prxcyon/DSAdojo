import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, subtitle }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-white dark:bg-gray-950 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md dark:hover:shadow-lg transition-all`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center justify-center">
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { className: 'w-14 h-14' }) : icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;