'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, BookOpen } from 'lucide-react';
import {
  getAllCategories,
  getArticlesByCategory,
  HELP_ARTICLES,
} from '@/lib/help-articles';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getAllCategories();

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return HELP_ARTICLES;
    }

    const query = searchQuery.toLowerCase();
    return HELP_ARTICLES.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const categoryStats = useMemo(() => {
    return categories.map((category) => ({
      category,
      count: HELP_ARTICLES.filter((a) => a.category === category).length,
    }));
  }, [categories]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900/50 to-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">
            Help Center
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Find answers and learn how to get the most out of CallFlow AI
          </p>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input w-full pl-12 text-base"
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">
              Search Results
            </h2>
            <p className="text-slate-400 mb-6">
              Found {filteredArticles.length} article
              {filteredArticles.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </p>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/help/${article.slug}`}
                    className="card border border-slate-800 p-6 hover:border-slate-700 hover:bg-slate-900/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-100 group-hover:text-primary-400 transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {article.content.replace(/<[^>]*>/g, '').substring(0, 100)}
                      ...
                    </p>
                    <div className="flex items-center gap-2 text-primary-400 text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">
                  No articles found for "{searchQuery}"
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Try searching with different keywords
                </p>
              </div>
            )}
          </div>
        )}

        {!searchQuery && (
          <>
            {/* Category grid */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">
                Browse by Category
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryStats.map(({ category, count }) => (
                  <Link
                    key={category}
                    href={`/help?category=${encodeURIComponent(category)}`}
                    className="card border border-slate-800 p-6 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all group cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-primary-400 transition-colors mb-2">
                      {category}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {count} article{count !== 1 ? 's' : ''}
                    </p>
                    <div className="flex items-center gap-2 text-primary-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      View articles <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured articles */}
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-6">
                Popular Articles
              </h2>
              <div className="space-y-4">
                {HELP_ARTICLES.slice(0, 5).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/help/${article.slug}`}
                    className="card border border-slate-800 p-6 hover:border-slate-700 hover:bg-slate-900/50 transition-all group flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs font-medium">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-100 group-hover:text-primary-400 transition-colors">
                        {article.title}
                      </h3>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-600 group-hover:text-primary-400 transition-colors flex-shrink-0 ml-4" />
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
