'use client';

import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface FilterPanelProps {
  onFilterChange: (filters: {
    userId?: number;
    sortBy: 'newest' | 'popular' | 'alphabetical';
  }) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [userId, setUserId] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'alphabetical'>('newest');

  const handleApply = () => {
    onFilterChange({
      userId: userId ? parseInt(userId) : undefined,
      sortBy,
    });
  };

  const handleReset = () => {
    setUserId('');
    setSortBy('newest');
    onFilterChange({ userId: undefined, sortBy: 'newest' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <FunnelIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by User ID
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="e.g., 1, 2, 3..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleApply}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}