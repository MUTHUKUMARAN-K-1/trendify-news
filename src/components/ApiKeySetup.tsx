import React, { useState } from 'react';
import { Key, ExternalLink, X, CheckCircle, AlertCircle } from 'lucide-react';

interface ApiKeySetupProps {
  onClose: () => void;
  onRetry: () => void;
}

export const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onClose, onRetry }) => {
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    onClose();
    onRetry();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Setup GNews API</h2>
              <p className="text-gray-600">Get real-time tech news</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className={`border rounded-xl p-6 ${step >= 1 ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
            <div className="flex items-start space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Get Your Free API Key</h3>
                <p className="text-gray-600 mb-4">
                  Sign up for a free GNews API account to access real-time tech news.
                </p>
                <a
                  href="https://gnews.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => setStep(2)}
                >
                  <span>Get API Key</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`border rounded-xl p-6 ${step >= 2 ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
            <div className="flex items-start space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Add Environment Variable</h3>
                <p className="text-gray-600 mb-4">
                  Create a <code className="bg-gray-200 px-2 py-1 rounded text-sm">.env</code> file in your project root and add:
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                  VITE_GNEWS_API_KEY=your_api_key_here
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`border rounded-xl p-6 ${step >= 3 ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
            <div className="flex items-start space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step >= 3 ? <CheckCircle className="h-5 w-5" /> : '3'}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Restart Development Server</h3>
                <p className="text-gray-600 mb-4">
                  Restart your development server to load the new environment variable.
                </p>
                <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm mb-4">
                  npm run dev
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <AlertCircle className="h-4 w-4" />
              <span>Free tier: 100 requests/day</span>
            </div>
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 font-medium"
            >
              Continue with Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};