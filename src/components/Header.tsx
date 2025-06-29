import React, { useState } from 'react';
import { Search, TrendingUp, Menu, X, RefreshCw } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  onSearchChange, 
  onSearch, 
  onRefresh,
  isRefreshing = false 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleRefresh = () => {
    if (onRefresh && !isRefreshing) {
      onRefresh();
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-xl shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Trendify
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Tech News Hub</p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search trending tech news..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 font-medium"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {onRefresh && (
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium">
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="w-full mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search trending tech news..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 font-medium"
                >
                  Search
                </button>
              </div>
            </form>
            
            {/* Mobile Refresh Button */}
            {onRefresh && (
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium">
                  {isRefreshing ? 'Refreshing...' : 'Refresh News'}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};