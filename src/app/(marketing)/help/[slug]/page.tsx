'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import {
  getArticleBySlug,
  getPreviousArticle,
  getNextArticle,
} from '@/lib/help-articles';
import { useToast } from '@/components/ui/toast';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function HelpArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);
  const prevArticle = getPreviousArticle(params.slug);
  const nextArticle = getNextArticle(params.slug);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const { addToast } = useToast();

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-100 mb-2">
            Article not found
          </h1>
          <p className="text-slate-400 mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link href="/help" className="btn btn-primary">
            Back to Help Center
          </Link>
        </div>
      </div>
    );
  }

  const handleHelpful = async (isHelpful: boolean) => {
    setHelpful(isHelpful);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'help',
          score: isHelpful ? 10 : 0,
          comment: comment || null,
          page: `/help/${article.slug}`,
        }),
      });
      addToast(
        isHelpful
          ? 'Thank you! Glad we could help'
          : 'Thanks for letting us know. We\'ll improve this article',
        'success'
      );
    } catch (error) {
      addToast('Failed to submit feedback', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header with breadcrumb */}
      <div className="bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/help" className="hover:text-primary-400 transition-colors">
              Help Center
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-primary-400">{article.category}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-300">{article.title}</span>
          </nav>

          <h1 className="text-4xl font-bold text-slate-100">{article.title}</h1>
          <p className="text-slate-400 mt-3">
            Category: <span className="text-slate-300">{article.category}</span>
          </p>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="card border border-slate-800 p-8 mb-12">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              '--tw-prose-body': '#e2e8f0',
              '--tw-prose-headings': '#f1f5f9',
              '--tw-prose-lead': '#cbd5e1',
              '--tw-prose-links': '#60a5fa',
              '--tw-prose-bold': '#f1f5f9',
              '--tw-prose-counters': '#cbd5e1',
              '--tw-prose-bullets': '#64748b',
              '--tw-prose-hr': '#334155',
              '--tw-prose-quotes': '#cbd5e1',
              '--tw-prose-quote-borders': '#475569',
              '--tw-prose-captions': '#94a3b8',
              '--tw-prose-code': '#f1f5f9',
              '--tw-prose-pre-code': '#e2e8f0',
              '--tw-prose-pre-bg': '#1e293b',
              '--tw-prose-th-borders': '#475569',
              '--tw-prose-td-borders': '#334155',
              '--tw-prose-kbd': '#f1f5f9',
              '--tw-prose-kbd-shadows': '0 0 0 1px rgb(15 23 42 / var(--tw-space-divide-opacity))',
              '--tw-prose-hr': '#334155',
              '--tw-prose-table': '#e2e8f0',
            } as React.CSSProperties}
          />

          {/* Styling for prose content */}
          <style>{`
            .prose h2 {
              font-size: 1.875rem;
              font-weight: 700;
              margin-top: 2rem;
              margin-bottom: 1rem;
              color: #f1f5f9;
            }
            .prose h3 {
              font-size: 1.25rem;
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
              color: #e2e8f0;
            }
            .prose p {
              margin-bottom: 1rem;
              color: #cbd5e1;
            }
            .prose ul, .prose ol {
              margin-bottom: 1rem;
              padding-left: 1.5rem;
            }
            .prose li {
              margin-bottom: 0.5rem;
              color: #cbd5e1;
            }
            .prose ul li::marker {
              color: #64748b;
            }
            .prose ol li::marker {
              color: #64748b;
            }
            .prose code {
              background-color: #1e293b;
              color: #60a5fa;
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
              font-family: 'Monaco', 'Courier', monospace;
            }
            .prose blockquote {
              border-left-color: #475569;
              color: #cbd5e1;
            }
          `}</style>
        </div>

        {/* Was this helpful? */}
        <div className="card border border-slate-800 p-8 mb-12">
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              Was this article helpful?
            </h3>

            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => handleHelpful(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                  helpful === true
                    ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                    : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                Yes
              </button>
              <button
                onClick={() => handleHelpful(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                  helpful === false
                    ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                    : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <ThumbsDown className="h-4 w-4" />
                No
              </button>
            </div>

            {helpful !== null && (
              <div className="mb-4">
                <label className="label text-sm mb-2">
                  Help us improve (optional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What could we improve about this article?"
                  className="input resize-none text-sm"
                  rows={3}
                />
              </div>
            )}
          </div>
        </div>

        {/* Previous/Next navigation */}
        {(prevArticle || nextArticle) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {prevArticle ? (
              <Link
                href={`/help/${prevArticle.slug}`}
                className="card border border-slate-800 p-6 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all group"
              >
                <div className="flex items-center gap-2 text-primary-400 text-sm mb-2 group-hover:translate-x-0 -translate-x-1 transition-transform">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </div>
                <h3 className="font-semibold text-slate-100 group-hover:text-primary-400 transition-colors">
                  {prevArticle.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link
                href={`/help/${nextArticle.slug}`}
                className="card border border-slate-800 p-6 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all group text-right"
              >
                <div className="flex items-center justify-end gap-2 text-primary-400 text-sm mb-2 group-hover:translate-x-1 translate-x-0 transition-transform">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-slate-100 group-hover:text-primary-400 transition-colors">
                  {nextArticle.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

        {/* Back to help center */}
        <div className="text-center">
          <Link href="/help" className="text-primary-400 hover:text-primary-300 transition-colors flex items-center justify-center gap-2 inline-block">
            <ChevronLeft className="h-4 w-4" />
            Back to Help Center
          </Link>
        </div>
      </div>
    </div>
  );
}
