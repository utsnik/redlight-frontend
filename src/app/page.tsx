"use client";

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { supabase } from '@/lib/supabaseClient'

interface CompositeScore {
  date: string
  score: number
  label: 'GREEN' | 'ORANGE' | 'RED'
}

const TodayOverview = () => {
  const [scores, setScores] = useState<CompositeScore[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true)
      const user = supabase.auth.user?.()
      if (!user) {
        console.warn('No user logged in, skipping fetch')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from<CompositeScore>('composite_scores')
        .select('date,score,label')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(7)

      if (error) {
        console.error('Error fetching composite scores:', error)
      } else if (data) {
        setScores(data.reverse()) // oldest first for chart
      }
      setLoading(false)
    }

    fetchScores()
  }, [])

  const latest = scores[scores.length - 1]

  const badgeClasses = (label: string) => {
    switch (label) {
      case 'GREEN': return 'bg-green-100 text-green-800'
      case 'ORANGE': return 'bg-yellow-100 text-yellow-800'
      case 'RED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📈 Today's Composite Score</h2>

        {loading ? (
          <div>Loading...</div>
        ) : latest ? (
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{latest.score}</span>
              <span className={\`px-2 py-1 rounded-full text-sm font-medium ${badgeClasses(latest.label)}\`}>
                {latest.label}
              </span>
            </div>

            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={scores}>
                <XAxis dataKey="date" hide />
                <YAxis domain={[0, 100]} hide />
                <Tooltip formatter={(value: number) => `${value}`} />
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
        ) : (
          <div>No data available for today.</div>
        )}
      </div>
    </div>
  )
}

export default TodayOverview
