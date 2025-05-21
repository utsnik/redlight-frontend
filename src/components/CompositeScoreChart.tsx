// src/app/components/CompositeScoreChart.tsx
"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/lib/supabaseClient";

interface CompositeScoreItem {
  date: string;
  score: number;
}

export default function CompositeScoreChart() {
  const [scores, setScores] = useState<CompositeScoreItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from<CompositeScoreItem>("composite_scores")
        .select("date,score")
        .eq("user_id", process.env.NEXT_PUBLIC_USER_ID)
        .order("date", { ascending: false })
        .limit(7);

      if (error) {
        console.error("Error fetching composite scores for chart:", error);
      } else if (data) {
        setScores(data.reverse()); // oldest first
      }
      setLoading(false);
    };

    fetchScores();
  }, []);

  return (
    <div className="card bg-base-100 shadow-lg rounded-2xl overflow-hidden">
      <div className="card-body p-6">
        <h3 className="card-title">Last 7 Days</h3>
        {loading ? (
          <progress className="progress w-full"></progress>
        ) : scores.length === 0 ? (
          <p className="text-gray-500">No data to display.</p>
        ) : (
          <div className="w-full h-32">
            <ResponsiveContainer>
              <LineChart data={scores}>
                <XAxis dataKey="date" hide />
                <YAxis domain={[0, "auto"]} hide />
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
        )}
      </div>
    </div>
  );
}
