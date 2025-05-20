// src/app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { supabase } from '@/lib/supabaseClient';

interface CompositeScore {
  date: string;
  score: number;
  label: 'GREEN' | 'ORANGE' | 'RED';
}

export default function TodayOverview() {
  const [scores, setScores] = useState<CompositeScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      const user = supabase.auth.user?.();
      if (!user) {
        console.warn('No user logged in, skipping dashboard fetch');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from<CompositeScore>('composite_scores')
        .select('date,score,label')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(7);

      if (error) {
        console.error('Error fetching composite scores:', error);
      } else if (data) {
        setScores(data.reverse()); // oldest first
      }
      setLoading(false);
    };

    fetchScores();
  }, []);

  const latest = scores[scores.length - 1];

  const badgeClass = (label: CompositeScore['label']) => {
    switch (label) {
      case 'GREEN':
        return 'bg-green-100 text-green-800';
      case 'ORANGE':
        return 'bg-yellow-100 text-yellow-800';
      case 'RED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📈 Today's Composite Score</h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading…</div>
        ) : latest ? (
          <div className="space-y-6">
            {/* Score + Badge */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">{latest.score}</span>
              <span
                className={`${badgeClass(latest.label)} px-2 py-1 rounded-full text-sm font-medium`}
              >
                {latest.label}
              </span>
            </div>

            {/* Sparkline */}
            <div style={{ width: '100%', height: 100 }}>
              <ResponsiveContainer>
                <LineChart data={scores}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip
                    cursor={false}
                    formatter={(value: number) => [`${value}`, 'Score']}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="currentColor"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No data available for today.
          </div>
        )}
      </div>
    </div>
  );
}
