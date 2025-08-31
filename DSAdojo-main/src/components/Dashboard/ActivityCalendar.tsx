import React from 'react';
import { activityData } from '../../data/mockData';

const ActivityCalendar: React.FC = () => {
  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-100 dark:bg-gray-800';
      case 1: return 'bg-green-200 dark:bg-green-800';
      case 2: return 'bg-green-300 dark:bg-green-700';
      case 3: return 'bg-green-500 dark:bg-green-600';
      default: return 'bg-green-600 dark:bg-green-500';
    }
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Learning Activity</h3>
      
      <div className="space-y-2">
        {/* Month labels */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
          {months.map((month, index) => (
            <span key={month} className={index % 2 === 0 ? 'block' : 'hidden sm:block'}>
              {month}
            </span>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-53 gap-1">
          {activityData.slice(-371).map((day, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-sm ${getActivityColor(day.level)} hover:ring-2 hover:ring-green-400 dark:hover:ring-green-500 cursor-pointer transition-all`}
              title={`${day.date}: ${day.count} activities`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-4">
          <span>Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCalendar;