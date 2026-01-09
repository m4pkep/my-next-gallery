import { getPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import { Post } from '@/lib/types';

export default async function Home() {
  // Получаем посты на сервере (SSR)
  const posts = await getPosts();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Post Gallery
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through our collection of posts. Filter by user, search by title, or sort by popularity.
          </p>
        </div>

        {/* Компонент для поиска (клиентский) */}
        <div className="mb-8">
          <SearchBar value="" onChange={() => {}} />
        </div>

        {/* Фильтры (клиентский компонент) */}
        <FilterPanel onFilterChange={() => {}} />

        {/* Сетка постов */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              All Posts ({posts.length})
            </h2>
          </div>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No posts found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Статистика */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {posts.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Posts
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {new Set(posts.map(p => p.userId)).size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Unique Users
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(posts.reduce((acc, p) => acc + (p.reactions || 0), 0) / posts.length)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Reactions
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {Math.round(posts.reduce((acc, p) => acc + (p.views || 0), 0) / posts.length)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Views
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}