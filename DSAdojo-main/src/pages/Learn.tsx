import React from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteMenu from '../components/Common/InfiniteMenu';
import { getDataStructureCategories } from '../data/mockData';
import { createTitleImage } from '../utils/imageUtils';
import { useUser } from '../context/UserContext';

const Learn: React.FC = () => {
  const navigate = useNavigate();
  const { preferredLanguage } = useUser();

  // Convert data structure categories to the format expected by InfiniteMenu
  // Pass the preferred language to filter categories appropriately
  const categories = getDataStructureCategories(preferredLanguage);
  const menuItems = categories.map((category) => {
    const image = createTitleImage(category.title, category.color, '#FFFFFF', 400);
    
    // Show "Coming Soon" for categories marked as such
    const description = category.isComingSoon 
      ? 'Coming Soon' 
      : `${category.completedQuestions}/${category.totalQuestions} completed`;
    
    return {
      image,
      link: `/learn/${category.id}`,
      title: category.title,
      description
    };
  });

  return (
    <div className="w-full h-full">
      <InfiniteMenu items={menuItems} onItemClick={(item) => {
        if (!item.link.includes('coming-soon')) {
          navigate(item.link);
        }
      }} />
    </div>
  );
};

export default Learn;