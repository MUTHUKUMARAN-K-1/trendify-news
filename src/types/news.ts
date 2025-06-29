export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface NewsResponse {
  totalArticles: number;
  articles: NewsArticle[];
}

export type TechCategory = 
  | 'all'
  | 'web-development'
  | 'artificial-intelligence'
  | 'machine-learning'
  | 'data-science'
  | 'blockchain'
  | 'cybersecurity'
  | 'mobile-development'
  | 'devops'
  | 'cloud-computing';