import React from 'react';
import { ArrowLeft, ExternalLink, Clock, Calendar, Share2 } from 'lucide-react';
import { NewsArticle } from '../types/news';

interface ArticleViewerProps {
  article: NewsArticle;
  onBack: () => void;
}

export const ArticleViewer: React.FC<ArticleViewerProps> = ({ article, onBack }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(article.url);
      alert('Article URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to News</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
              
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm font-medium">Read Original</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 md:h-96">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Source Badge */}
            <div className="absolute top-6 left-6">
              <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                {article.source.name}
              </span>
            </div>
          </div>

          {/* Article Header */}
          <div className="p-8">
            <div className="flex items-center space-x-6 text-gray-500 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{formatTime(article.publishedAt)}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-blue-500 pl-6 italic">
              {article.description}
            </p>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-4">
                {article.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="text-base leading-7">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Read the Full Article
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Continue reading on {article.source.name} for the complete story and latest updates.
                  </p>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  <span>Read More</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};