'use client';

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useToast } from './ui/toast';

const FEEDBACK_TYPES = [
  { id: 'feedback', label: 'Feedback' },
  { id: 'bug', label: 'Bug Report' },
  { id: 'feature', label: 'Feature Request' },
];

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('feedback');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async () => {
    if (!message.trim()) {
      addToast('Please enter a message', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          comment: message,
          page: window.location.pathname,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      addToast('Thank you for your feedback!', 'success');
      setMessage('');
      setType('feedback');
      setIsOpen(false);
    } catch (error) {
      addToast('Failed to submit feedback', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-accent-500 text-white hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Open feedback form"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageSquare className="h-5 w-5" />
        )}
      </button>

      {/* Feedback panel */}
      {isOpen && (
        <div className="fixed bottom-32 right-4 z-40 w-80 card border border-slate-800 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-6">
            <h3 className="font-semibold text-slate-100 mb-4">Send us feedback</h3>

            {/* Type dropdown */}
            <div className="mb-4">
              <label className="label text-xs mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input w-full text-sm"
                disabled={isSubmitting}
              >
                {FEEDBACK_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message textarea */}
            <div className="mb-4">
              <label className="label text-xs mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's on your mind..."
                className="input resize-none text-sm"
                rows={4}
                disabled={isSubmitting}
              />
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !message.trim()}
              className="btn btn-primary w-full flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
