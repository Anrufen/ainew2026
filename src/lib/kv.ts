import mockData from '../data/mock_news.json';

export interface NewsData {
  version: string;
  highlights: {
    id: number;
    tag: string;
    category: string;
    symbols: string[];
    title: string;
    summary: string;
    hotness: number;
    sources: string[];
  }[];
  content_ideas: {
    topic: string;
    channels: {
      wechat: string;
      video: string;
      article: string;
    };
  }[];
  stock_analysis: {
    ticker: string;
    sentiment: string;
    logic: string;
    details: string;
  }[];
  perspectives: {
    role: string;
    items: string[];
  }[];
}

export async function getLatestNews(env?: any): Promise<NewsData> {
  // logic to fetch from Cloudflare KV if env is provided, else fallback to mock
  if (env?.NEWS_KV) {
    const data = await env.NEWS_KV.get('latest', { type: 'json' });
    if (data) return data;
  }
  
  // Fallback to local mock data for development
  return mockData as NewsData;
}

export async function getNewsByVersion(version: string, env?: any): Promise<NewsData | null> {
  if (env?.NEWS_KV) {
    return await env.NEWS_KV.get(`version:${version}`, { type: 'json' });
  }
  
  // For development, we only have one mock version
  if (version === mockData.version) {
    return mockData as NewsData;
  }
  
  return null;
}
