import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { supabase } from '@/lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CompositeScore {
  date: string
  score: number
  label: 'GREEN' | 'ORANGE' | 'RED'
}

const TodayOverview: NextPage = () => {
  const [scores, setScores] = useState<CompositeScore[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true)

      // 1) Make sure we have the user
      const user = supabase.auth.user?.()
      if (!user) {
        console.warn('No user logged in, skipping dashboard fetch')
        setLoading(false)
        return
      }

      // 2) Fetch last 7 scores
      const { data, error } = await supabase
        .from<CompositeScore>('composite_scores')
        .select('date,score,label')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(7)

      if (error) {
        console.error('Error fetching composite scores:', error)
      } else if (data) {
        setScores(data.reverse())   // oldest first
      }
      setLoading(false)
    }

    fetchScores()
  }, [])

  const latest = scores[scores.length - 1]

  const getBadgeVariant = (label: string) => {
    switch (label) {
      case 'GREEN': return 'success'
      case 'ORANGE': return 'warning'
      case 'RED': return 'destructive'
      default: return 'default'
    }
  }

  return (
    <div className="p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>📈 Today's Composite Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div>Loading...</div>
          ) : latest ? (
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{latest.score}</span>
                <Badge variant={getBadgeVariant(latest.label)}>
                  {latest.label}
                </Badge>
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
        </CardContent>
      </Card>
    </div>
  )
}

export default TodayOverview
