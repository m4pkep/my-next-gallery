'use client';

import { useState } from 'react';
import FilterPanel from '@/components/FilterPanel';
import SearchBar from '@/components/SearchBar';

export default function FilterSection() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    userId: undefined as number | undefined,
    sortBy: 'newest' as 'newest' | 'popular' | 'alphabetical',
  });

  const handleFilterChange = (newFilters: {
    userId?: number;
    sortBy: 'newest' | 'popular' | 'alphabetical';
  }) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  return (
    <>
      <div className="mb-8">
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Search posts by title..."
        />
      </div>
      
      <FilterPanel onFilterChange={handleFilterChange} />
      
      {/* Можно показать активные фильтры */}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Active filters: {filters.userId ? `User #${filters.userId}` : 'All users'}, 
        Sorted by: {filters.sortBy}
      </div>
    </>
  );
}