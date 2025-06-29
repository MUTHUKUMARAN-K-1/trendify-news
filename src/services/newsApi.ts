import axios from 'axios';
import { NewsResponse, TechCategory } from '../types/news';
import { techCategories } from '../utils/categories';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

// Cache configuration
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes for production
const cache = new Map<string, { data: NewsResponse; timestamp: number }>();

// Mock data for fallback when API is unavailable
const mockArticles = [
  {
    title: "Revolutionary AI Breakthrough Changes Software Development Forever",
    description: "New artificial intelligence tools are transforming how developers write code, making programming more accessible and efficient than ever before.",
    content: "The latest developments in AI-powered coding assistants are revolutionizing the software development landscape. These tools can now generate complex code, debug applications, and even suggest architectural improvements, significantly reducing development time and improving code quality.",
    url: "https://example.com/ai-breakthrough",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    publishedAt: new Date().toISOString(),
    source: {
      name: "Tech Today",
      url: "https://example.com"
    }
  },
  {
    title: "Web Development Trends Shaping 2025: What Developers Need to Know",
    description: "From new JavaScript frameworks to advanced CSS features, discover the technologies that will define web development in 2025.",
    content: "The web development landscape continues to evolve rapidly. New frameworks, improved performance optimization techniques, and enhanced user experience patterns are setting the stage for the next generation of web applications.",
    url: "https://example.com/web-trends-2025",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: {
      name: "Dev Weekly",
      url: "https://example.com"
    }
  },
  {
    title: "Cybersecurity Alert: New Threats Target Cloud Infrastructure",
    description: "Security experts warn of sophisticated attacks targeting cloud-based applications and recommend immediate protective measures.",
    content: "Recent cybersecurity incidents have highlighted vulnerabilities in cloud infrastructure. Organizations are urged to implement enhanced security protocols and regular security audits to protect their digital assets.",
    url: "https://example.com/cybersecurity-alert",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: {
      name: "Security Now",
      url: "https://example.com"
    }
  },
  {
    title: "Machine Learning Models Now 90% More Efficient with New Algorithm",
    description: "Researchers develop groundbreaking optimization technique that dramatically reduces computational requirements for ML training.",
    content: "A team of researchers has developed a new algorithm that significantly improves the efficiency of machine learning model training. This breakthrough could make advanced AI more accessible to smaller organizations and reduce the environmental impact of large-scale ML operations.",
    url: "https://example.com/ml-efficiency",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: {
      name: "AI Research",
      url: "https://example.com"
    }
  },
  {
    title: "Blockchain Technology Revolutionizes Supply Chain Management",
    description: "Major corporations adopt blockchain solutions to improve transparency and traceability in global supply chains.",
    content: "Leading companies are implementing blockchain technology to create more transparent and efficient supply chains. This technology enables real-time tracking of products from manufacture to delivery, reducing fraud and improving consumer confidence.",
    url: "https://example.com/blockchain-supply-chain",
    image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: {
      name: "Blockchain Today",
      url: "https://example.com"
    }
  },
  {
    title: "Mobile App Development: Flutter vs React Native in 2025",
    description: "Comprehensive comparison of the two leading cross-platform mobile development frameworks and their latest features.",
    content: "As mobile development continues to evolve, developers are choosing between Flutter and React Native for cross-platform applications. Both frameworks have introduced significant improvements in performance, developer experience, and platform integration.",
    url: "https://example.com/flutter-vs-react-native",
    image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: {
      name: "Mobile Dev",
      url: "https://example.com"
    }
  },
  {
    title: "Cloud Computing Costs Drop 40% with New Serverless Architecture",
    description: "Companies report significant savings by migrating to advanced serverless computing platforms and optimized resource management.",
    content: "The latest generation of serverless computing platforms is delivering unprecedented cost savings for businesses. Advanced auto-scaling and resource optimization features are helping companies reduce their cloud infrastructure costs while improving performance.",
    url: "https://example.com/serverless-savings",
    image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: {
      name: "Cloud Weekly",
      url: "https://example.com"
    }
  },
  {
    title: "Data Science Tools Get Major Updates: Python Libraries Enhanced",
    description: "Popular data science libraries receive significant performance improvements and new features for advanced analytics.",
    content: "The data science community celebrates major updates to essential Python libraries. These improvements include faster processing speeds, enhanced visualization capabilities, and better integration with machine learning workflows.",
    url: "https://example.com/data-science-updates",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    source: {
      name: "Data Science Daily",
      url: "https://example.com"
    }
  }
];

class NewsService {
  private getCacheKey(endpoint: string, params: Record<string, string>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return `${endpoint}?${sortedParams}`;
  }

  private getCachedData(cacheKey: string): NewsResponse | null {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(cacheKey: string, data: NewsResponse): void {
    cache.set(cacheKey, { data, timestamp: Date.now() });
  }

  private getMockData(category?: TechCategory): NewsResponse {
    let filteredArticles = [...mockArticles];
    
    if (category && category !== 'all') {
      const categoryConfig = techCategories.find(cat => cat.id === category);
      if (categoryConfig) {
        // Filter articles based on category keywords
        filteredArticles = mockArticles.filter(article => {
          const content = `${article.title} ${article.description}`.toLowerCase();
          return categoryConfig.keywords.some(keyword => 
            content.includes(keyword.toLowerCase())
          );
        });
        
        // If no matches, return first few articles
        if (filteredArticles.length === 0) {
          filteredArticles = mockArticles.slice(0, 4);
        }
      }
    }

    return {
      totalArticles: filteredArticles.length,
      articles: filteredArticles
    };
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}): Promise<NewsResponse> {
    // Check cache first
    const cacheKey = this.getCacheKey(endpoint, params);
    const cachedData = this.getCachedData(cacheKey);
    if (cachedData) {
      console.log('Returning cached data for:', cacheKey);
      return cachedData;
    }

    // If no API key is configured, return mock data
    if (!API_KEY || API_KEY === 'your_api_key_here' || API_KEY.trim() === '') {
      console.log('No API key configured, returning mock data');
      const category = params.topic === 'technology' ? 'all' : 
                     Object.keys(params).includes('q') ? this.getCategoryFromQuery(params.q || '') : 'all';
      return this.getMockData(category as TechCategory);
    }

    try {
      const queryParams = new URLSearchParams({
        apikey: API_KEY,
        lang: 'en',
        country: 'us',
        max: '20',
        ...params
      });

      const url = `${BASE_URL}${endpoint}?${queryParams}`;
      
      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;

      // Check for GNews API specific error responses
      if (data.errors && Array.isArray(data.errors)) {
        const errorMessage = data.errors.join('. ');
        console.error('GNews API error response:', data.errors);
        
        // For any API errors, fall back to mock data
        console.log('API error, falling back to mock data');
        const category = params.topic === 'technology' ? 'all' : 
                       Object.keys(params).includes('q') ? this.getCategoryFromQuery(params.q || '') : 'all';
        return this.getMockData(category as TechCategory);
      }

      // Validate and clean the response
      if (!data.articles || !Array.isArray(data.articles)) {
        console.error('Invalid API response structure, falling back to mock data');
        const category = params.topic === 'technology' ? 'all' : 
                       Object.keys(params).includes('q') ? this.getCategoryFromQuery(params.q || '') : 'all';
        return this.getMockData(category as TechCategory);
      }

      // Filter out articles with missing required fields and clean data
      const validArticles = data.articles
        .filter((article: any) => 
          article.title && 
          article.description && 
          article.url && 
          article.image &&
          article.publishedAt &&
          article.source?.name &&
          article.title.trim() !== '' &&
          article.description.trim() !== ''
        )
        .map((article: any) => ({
          title: article.title.trim(),
          description: article.description.trim(),
          content: (article.content || article.description).trim(),
          url: article.url,
          image: article.image,
          publishedAt: article.publishedAt,
          source: {
            name: article.source.name,
            url: article.source.url || article.url
          }
        }))
        .slice(0, 18);

      const result = {
        totalArticles: validArticles.length,
        articles: validArticles
      };

      // Cache the successful response
      this.setCachedData(cacheKey, result);

      return result;

    } catch (error) {
      console.error('GNews API request failed, falling back to mock data:', error);
      
      // Always fall back to mock data on any error
      const category = params.topic === 'technology' ? 'all' : 
                     Object.keys(params).includes('q') ? this.getCategoryFromQuery(params.q || '') : 'all';
      return this.getMockData(category as TechCategory);
    }
  }

  private getCategoryFromQuery(query: string): TechCategory {
    const lowerQuery = query.toLowerCase();
    
    for (const category of techCategories.slice(1)) { // Skip 'all'
      if (category.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()))) {
        return category.id;
      }
    }
    
    return 'all';
  }

  async getTopNews(): Promise<NewsResponse> {
    return this.makeRequest('/top-headlines', {
      topic: 'technology'
    });
  }

  async searchNews(query: string): Promise<NewsResponse> {
    if (!query.trim()) {
      return this.getTopNews();
    }

    // Enhance search query with tech-related terms for better results
    const techTerms = ['technology', 'tech', 'software', 'programming', 'AI', 'machine learning', 'web development'];
    const enhancedQuery = `${query.trim()} (${techTerms.join(' OR ')})`;
    
    return this.makeRequest('/search', {
      q: enhancedQuery,
      sortby: 'relevance'
    });
  }

  async getNewsByCategory(category: TechCategory): Promise<NewsResponse> {
    if (category === 'all') {
      return this.getTopNews();
    }

    const categoryConfig = techCategories.find(cat => cat.id === category);
    if (!categoryConfig) {
      return this.getTopNews();
    }

    // Create a more targeted search query for the category
    const keywords = categoryConfig.keywords.slice(0, 5);
    const query = `(${keywords.join(' OR ')}) AND (technology OR tech OR software)`;
    
    return this.makeRequest('/search', {
      q: query,
      sortby: 'publishedAt'
    });
  }

  // Method to test API connection
  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('/top-headlines', { max: '1', topic: 'technology' });
      return true;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }

  // Method to clear cache
  clearCache(): void {
    cache.clear();
  }

  // Method to get cache status
  getCacheStatus(): { size: number; keys: string[] } {
    return {
      size: cache.size,
      keys: Array.from(cache.keys())
    };
  }
}

export const newsService = new NewsService();