import React from 'react';
import { TechCategory } from '../types/news';
import { techCategories } from '../utils/categories';
import * as LucideIcons from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: TechCategory;
  onCategoryChange: (category: TechCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {techCategories.map((category) => {
          const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.Globe;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 group hover:scale-105
                ${isSelected 
                  ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-teal-50 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }
              `}
            >
              <div className={`
                p-2 rounded-lg mb-2 transition-all duration-200
                ${isSelected 
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                }
              `}>
                <IconComponent className="h-5 w-5" />
              </div>
              <span className={`
                text-sm font-medium text-center transition-colors duration-200
                ${isSelected ? 'text-blue-700' : 'text-gray-700'}
              `}>
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};