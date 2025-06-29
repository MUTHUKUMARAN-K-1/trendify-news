import { TechCategory } from '../types/news';

export interface CategoryConfig {
  id: TechCategory;
  name: string;
  keywords: string[];
  icon: string;
}

export const techCategories: CategoryConfig[] = [
  {
    id: 'all',
    name: 'All News',
    keywords: ['technology', 'tech', 'software', 'programming'],
    icon: 'Globe'
  },
  {
    id: 'web-development',
    name: 'Web Development',
    keywords: ['react', 'vue', 'angular', 'javascript', 'typescript', 'web development'],
    icon: 'Code'
  },
  {
    id: 'artificial-intelligence',
    name: 'AI',
    keywords: ['artificial intelligence', 'AI', 'GPT', 'OpenAI', 'ChatGPT'],
    icon: 'Brain'
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    keywords: ['machine learning', 'ML', 'neural networks', 'tensorflow', 'pytorch'],
    icon: 'Cpu'
  },
  {
    id: 'data-science',
    name: 'Data Science',
    keywords: ['data science', 'analytics', 'big data', 'python', 'data analysis'],
    icon: 'BarChart3'
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    keywords: ['blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'web3'],
    icon: 'Link'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    keywords: ['cybersecurity', 'security', 'hacking', 'privacy', 'encryption'],
    icon: 'Shield'
  },
  {
    id: 'mobile-development',
    name: 'Mobile Dev',
    keywords: ['mobile development', 'iOS', 'Android', 'React Native', 'Flutter'],
    icon: 'Smartphone'
  },
  {
    id: 'devops',
    name: 'DevOps',
    keywords: ['devops', 'docker', 'kubernetes', 'CI/CD', 'deployment'],
    icon: 'Settings'
  },
  {
    id: 'cloud-computing',
    name: 'Cloud',
    keywords: ['cloud computing', 'AWS', 'Azure', 'Google Cloud', 'serverless'],
    icon: 'Cloud'
  }
];

export const getCategoryByKeyword = (title: string, description: string): TechCategory => {
  const content = `${title} ${description}`.toLowerCase();
  
  for (const category of techCategories.slice(1)) { // Skip 'all'
    if (category.keywords.some(keyword => content.includes(keyword.toLowerCase()))) {
      return category.id;
    }
  }
  
  return 'all';
};