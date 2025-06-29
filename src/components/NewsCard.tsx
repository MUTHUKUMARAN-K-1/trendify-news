import React from 'react';
import { Clock, ExternalLink, Calendar } from 'lucide-react';
import { NewsArticle } from '../types/news';

interface NewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <article className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
      <div onClick={onClick} className="block">
        {/* Image */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Source and Date */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {article.source.name}
              </span>
            </div>
            <div className="flex items-center text-gray-500 text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(article.publishedAt)}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {article.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-gray-500 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {formatTime(article.publishedAt)}
            </div>
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-200">
              Read more
              <ExternalLink className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};