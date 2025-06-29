import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { NewsList } from './components/NewsList';
import { ArticleViewer } from './components/ArticleViewer';
import { ApiKeySetup } from './components/ApiKeySetup';
import { newsService } from './services/newsApi';
import { NewsArticle, TechCategory } from './types/news';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadNews();
  }, [selectedCategory]);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await newsService.getNewsByCategory(selectedCategory);
      setArticles(response.articles);
      
      if (response.articles.length === 0) {
        setError('No articles found for this category. Try a different category or search term.');
      }
    } catch (err: any) {
      console.error('Error loading news:', err);
      setError('Unable to load news at the moment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadNews();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await newsService.searchNews(searchQuery);
      setArticles(response.articles);
      
      if (response.articles.length === 0) {
        setError(`No articles found for "${searchQuery}". Try different search terms.`);
      }
    } catch (err: any) {
      console.error('Error searching news:', err);
      setError('Unable to search news at the moment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadNews();
    setIsRefreshing(false);
  };

  const handleCategoryChange = (category: TechCategory) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when changing category
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleBackToNews = () => {
    setSelectedArticle(null);
  };

  const handleApiSetupClose = () => {
    setShowApiSetup(false);
    setError(null);
  };

  const handleApiSetupRetry = async () => {
    setShowApiSetup(false);
    setError(null);
    await loadNews();
  };

  if (showApiSetup) {
    return (
      <ApiKeySetup 
        onClose={handleApiSetupClose}
        onRetry={handleApiSetupRetry}
      />
    );
  }

  if (selectedArticle) {
    return (
      <ArticleViewer
        article={selectedArticle}
        onBack={handleBackToNews}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stay Ahead with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Tech Trends
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest in technology, from AI breakthroughs to web development innovations. 
            Your daily dose of tech news, curated and simplified.
          </p>
          
          {/* Live indicator */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Live News Feed</span>
            </div>
          </div>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <NewsList
          articles={articles}
          loading={loading}
          error={error}
          onArticleClick={handleArticleClick}
          onRetry={loadNews}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-400 mt-2">
              © 2025 Trendify. All rights reserved.
            </p>
            <button
              onClick={() => setShowApiSetup(true)}
              className="text-blue-600 hover:text-blue-700 text-sm mt-2 underline"
            >
              Configure API Key
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;