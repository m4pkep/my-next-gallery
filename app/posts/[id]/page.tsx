import { getPostById, getPosts } from '@/lib/api';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPostById(parseInt(id));
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Кнопка назад */}
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to all posts
        </Link>

        {/* Пост */}
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Заголовок */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium">
                <UserIcon className="h-4 w-4 mr-2" />
                User #{post.userId}
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Post #{post.id}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag) => (
                <span 
                  key={tag} 
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Контент */}
          <div className="p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                {post.body}
              </p>
            </div>

            {/* Статистика */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Post Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {post.reactions || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Reactions
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {post.views || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Views
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {post.tags?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tags
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}