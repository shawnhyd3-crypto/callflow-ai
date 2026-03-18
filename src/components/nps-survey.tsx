'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from './ui/toast';

const DISMISS_KEY = 'nps-survey-dismissed';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export function NPSSurvey() {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    // Check if user has dismissed the survey
    const lastDismissed = localStorage.getItem(DISMISS_KEY);
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed);
      if (Date.now() - dismissedTime < DISMISS_DURATION) {
        return;
      }
    }

    // Show survey after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (score === null) {
      addToast('Please select a score', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'nps',
          score,
          comment: comment || null,
          page: window.location.pathname,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      addToast('Thank you for your feedback!', 'success');
      handleDismiss();
    } catch (error) {
      addToast('Failed to submit feedback', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
      <div className="card border border-slate-800 w-full max-w-md bg-slate-900">
        <div className="p-6">
          {/* Close button */}
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-100">
              How are we doing?
            </h2>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-300 transition-colors"
              aria-label="Close survey"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Question */}
          <p className="text-slate-300 mb-6">
            How likely are you to recommend CallFlow AI to a friend or colleague?
          </p>

          {/* Score buttons */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => setScore(num)}
                className={`py-2 px-2 rounded text-sm font-semibold transition-colors ${
                  score === num
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Score labels */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
            <span>Not likely</span>
            <span>Very likely</span>
          </div>

          {/* Comment textarea */}
          <div className="mb-6">
            <label className="label text-sm mb-2">
              Additional feedback (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what we could improve..."
              className="input resize-none text-sm"
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDismiss}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors disabled:opacity-50 text-sm font-medium"
            >
              Later
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || score === null}
              className="flex-1 btn btn-primary text-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
