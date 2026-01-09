import { Post } from '@/lib/types';
import Link from 'next/link';
import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link 
      href={`/posts/${post.id}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
            User #{post.userId}
          </span>
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <HeartIcon className="h-5 w-5 mr-1" />
              <span className="text-sm">{post.reactions}</span>
            </div>
            <div className="flex items-center">
              <EyeIcon className="h-5 w-5 mr-1" />
              <span className="text-sm">{post.views}</span>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.body}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}