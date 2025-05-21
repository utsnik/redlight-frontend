// src/components/PutCallRatioCard.tsx
"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { supabase } from "@/lib/supabaseClient";

interface PutCallRatio {
  date: string;
  ratio: number;
}

export default function PutCallRatioCard() {
  const [data, setData] = useState<PutCallRatio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: rows, error } = await supabase
        .from<PutCallRatio>("put_call_ratios")
        .select("date,ratio")
        .eq("user_id", process.env.NEXT_PUBLIC_USER_ID)
        .order("date", { ascending: false })
        .limit(7);
      if (!error && rows) setData(rows.reverse());
      setLoading(false);
    }
    fetchData();
  }, []);

  const latest = data[data.length - 1];

  return (
    <div className="card bg-base-100 shadow-lg rounded-2xl overflow-hidden">
      <div className="card-body p-6">
        <h3 className="card-title">Put/Call Ratio</h3>
        {loading ? (
          <progress className="progress w-full"></progress>
        ) : !latest ? (
          <p className="text-gray-500">No data.</p>
        ) : (
          <>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold">{latest.ratio.toFixed(2)}</span>
              <span className="text-sm text-gray-500">as of {latest.date}</span>
            </div>
            <div className="w-full h-24">
              <ResponsiveContainer>
                <LineChart data={data}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={[0, "auto"]} hide />
                  <Tooltip formatter={(value: number) => value.toFixed(2)} />
                  <Line
                    type="monotone"
                    dataKey="ratio"
                    stroke="currentColor"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
