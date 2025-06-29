import React from 'react';
import { NewsCard } from './NewsCard';
import { NewsArticle } from '../types/news';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface NewsListProps {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  onArticleClick: (article: NewsArticle) => void;
  onRetry?: () => void;
}

export const NewsList: React.FC<NewsListProps> = ({
  articles,
  loading,
  error,
  onArticleClick,
  onRetry,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600 text-lg">Loading trending tech news...</p>
        <p className="text-gray-400 text-sm mt-2">Fetching the latest updates</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load News</h3>
        <p className="text-red-600 mb-4">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center space-x-2 mx-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Articles Found</h3>
        <p className="text-gray-500 mb-4">Try adjusting your search terms or category selection.</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center space-x-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Found <span className="font-semibold text-gray-900">{articles.length}</span> articles
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Latest Tech News</span>
        </div>
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <NewsCard
            key={`${article.url}-${index}`}
            article={article}
            onClick={() => onArticleClick(article)}
          />
        ))}
      </div>
    </div>
  );
};