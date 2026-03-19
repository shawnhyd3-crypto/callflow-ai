export const dynamic = 'force-dynamic'

'use client';

import { useEffect, useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface FeedbackItem {
  id: string;
  type: string;
  score?: number | null;
  comment?: string | null;
  page?: string | null;
  createdAt: string;
  userId?: string | null;
}

interface FeedbackResponse {
  feedback: FeedbackItem[];
  averageNps: number | null;
  total: number;
  npsCount: number;
}

export default function FeedbackAdminPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [averageNps, setAverageNps] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { addToast } = useToast();

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterType !== 'all') {
        params.append('type', filterType);
      }
      if (startDate) {
        params.append('startDate', startDate);
      }
      if (endDate) {
        params.append('endDate', endDate);
      }

      const response = await fetch(`/api/feedback?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }

      const data: FeedbackResponse = await response.json();
      setFeedback(data.feedback);
      setAverageNps(data.averageNps);
    } catch (error) {
      addToast('Failed to load feedback', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleFilter = () => {
    fetchFeedback();
  };

  // Calculate NPS distribution
  const npsDistribution = Array.from({ length: 11 }, (_, i) => ({
    score: i,
    count: feedback.filter((f) => f.score === i).length,
  }));

  const maxCount = Math.max(...npsDistribution.map((d) => d.count), 1);

  const typeStats = feedback.reduce(
    (acc, f) => {
      acc[f.type] = (acc[f.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100">Feedback</h1>
          <p className="text-slate-400 mt-2">Manage and analyze customer feedback</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card border border-slate-800 p-6">
            <p className="text-slate-400 text-sm mb-2">Total Feedback</p>
            <p className="text-3xl font-bold text-slate-100">{feedback.length}</p>
          </div>

          <div className="card border border-slate-800 p-6">
            <p className="text-slate-400 text-sm mb-2">Average NPS</p>
            <p className="text-3xl font-bold text-primary-400">
              {averageNps ?? '-'}
            </p>
          </div>

          <div className="card border border-slate-800 p-6">
            <p className="text-slate-400 text-sm mb-2">Bug Reports</p>
            <p className="text-3xl font-bold text-red-400">
              {typeStats['bug'] || 0}
            </p>
          </div>

          <div className="card border border-slate-800 p-6">
            <p className="text-slate-400 text-sm mb-2">Feature Requests</p>
            <p className="text-3xl font-bold text-accent-400">
              {typeStats['feature'] || 0}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card border border-slate-800 mb-8 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-slate-400" />
            <h2 className="font-semibold text-slate-100">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="label text-sm mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input w-full text-sm"
              >
                <option value="all">All Types</option>
                <option value="nps">NPS Survey</option>
                <option value="feedback">Feedback</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="help">Help Article</option>
              </select>
            </div>

            <div>
              <label className="label text-sm mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input w-full text-sm"
              />
            </div>

            <div>
              <label className="label text-sm mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input w-full text-sm"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleFilter}
                disabled={isLoading}
                className="btn btn-primary w-full disabled:opacity-50"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* NPS Distribution Chart */}
        {feedback.some((f) => f.score !== null) && (
          <div className="card border border-slate-800 mb-8 p-6">
            <h2 className="font-semibold text-slate-100 mb-4">NPS Score Distribution</h2>
            <div className="space-y-3">
              {npsDistribution.map((item) => (
                <div key={item.score} className="flex items-center gap-3">
                  <div className="w-8 text-sm font-medium text-slate-400">
                    {item.score}
                  </div>
                  <div className="flex-1 bg-slate-800 h-8 rounded relative overflow-hidden">
                    {item.count > 0 && (
                      <div
                        className={`h-full transition-all ${
                          item.score >= 9
                            ? 'bg-green-500/50'
                            : item.score >= 7
                              ? 'bg-blue-500/50'
                              : 'bg-red-500/50'
                        }`}
                        style={{ width: `${(item.count / maxCount) * 100}%` }}
                      />
                    )}
                    <span className="absolute inset-0 flex items-center justify-end pr-3 text-xs text-slate-300 font-medium">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback list */}
        <div className="card border border-slate-800">
          <div className="p-6">
            <h2 className="font-semibold text-slate-100 mb-4">Recent Feedback</h2>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-slate-400">Loading feedback...</p>
              </div>
            ) : feedback.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">No feedback yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-800 rounded-lg p-4 hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            item.type === 'nps'
                              ? 'bg-blue-500/20 text-blue-400'
                              : item.type === 'bug'
                                ? 'bg-red-500/20 text-red-400'
                                : item.type === 'feature'
                                  ? 'bg-accent-500/20 text-accent-400'
                                  : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                        {item.score !== null && item.score !== undefined && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-slate-700 text-slate-300">
                            Score: {item.score}/10
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {item.comment && (
                      <p className="text-slate-300 text-sm mb-2">{item.comment}</p>
                    )}

                    {item.page && (
                      <p className="text-xs text-slate-500">
                        From: <span className="text-slate-400">{item.page}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
