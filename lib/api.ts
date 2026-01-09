import { Post } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  // Добавим дополнительные поля для демонстрации
  tags?: string[];
  reactions?: number;
  views?: number;
}

export interface FilterOptions {
  search: string;
  userId?: number;
  sortBy: 'newest' | 'popular' | 'alphabetical';
}

export async function getPosts(): Promise<Post[]> {
  // Добавляем дополнительные поля для демонстрации фильтрации
  const response = await fetch(`${API_URL}/posts`);
  const posts: Post[] = await response.json();
  
  return posts.map(post => ({
    ...post,
    tags: ['tech', 'news', 'blog'].slice(0, Math.floor(Math.random() * 3) + 1),
    reactions: Math.floor(Math.random() * 100),
    views: Math.floor(Math.random() * 1000),
  }));
}

export async function getPostById(id: number): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${id}`);
  const post: Post = await response.json();
  return {
    ...post,
    tags: ['tech', 'news', 'blog'].slice(0, Math.floor(Math.random() * 3) + 1),
    reactions: Math.floor(Math.random() * 100),
    views: Math.floor(Math.random() * 1000),
  };
}