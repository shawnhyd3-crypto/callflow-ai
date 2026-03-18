import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getAllCategories, getArticlesByCategory } from '@/lib/help-articles';

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = getAllCategories();

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden lg:flex lg:w-64 border-r border-slate-800 bg-slate-900/50 flex-col p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
            Categories
          </h2>
          <nav className="space-y-2">
            {categories.map((category) => {
              const articles = getArticlesByCategory(category);
              return (
                <div key={category} className="space-y-2">
                  <Link
                    href={`/help?category=${encodeURIComponent(category)}`}
                    className="text-sm font-medium text-slate-300 hover:text-primary-400 transition-colors block"
                  >
                    {category}
                  </Link>
                  <div className="space-y-1 pl-4">
                    {articles.slice(0, 3).map((article) => (
                      <Link
                        key={article.slug}
                        href={`/help/${article.slug}`}
                        className="text-xs text-slate-500 hover:text-slate-400 transition-colors block truncate"
                      >
                        {article.title}
                      </Link>
                    ))}
                    {articles.length > 3 && (
                      <p className="text-xs text-slate-600 italic mt-2">
                        +{articles.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Help widget */}
        <div className="mt-auto pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500 mb-3">Still need help?</p>
          <Link
            href="/contact"
            className="btn btn-primary text-sm w-full text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
