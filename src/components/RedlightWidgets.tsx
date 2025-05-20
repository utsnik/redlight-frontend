// src/app/components/RedlightWidgets.tsx
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
interface SignalItem {
  id: string;
  signal_name: string;
  score: number;
  explanation: string;
}
interface PutCallRatio {
  date: string;
  ratio: number;
}

// 1) Composite Score Chart (last 7 days)
export function CompositeScoreChart() {
  const [scores, setScores] = useState<CompositeScoreItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase
        .from<CompositeScoreItem>("composite_scores")
        .select("date,score")
        .eq("user_id", process.env.NEXT_PUBLIC_USER_ID)
        .order("date", { ascending: false })
        .limit(7);
      if (data) setScores(data.reverse());
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title">Composite Score (7 days)</h3>
        {loading ? (
          <progress className="progress w-full"></progress>
        ) : (
          <div className="w-full h-32">
            <ResponsiveContainer>
              <LineChart data={scores}>
                <XAxis dataKey="date" hide />
                <YAxis domain={[0, "auto"]} hide />
                <Tooltip formatter={(v:number) => v.toFixed(2)} />
                <Line type="monotone" dataKey="score" stroke="currentColor" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

// 2) Daily Signals List
export function DailySignalsListCard() {
  const [signals, setSignals] = useState<SignalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase
        .from<SignalItem>("daily_signals")
        .select("id,signal_name,score,explanation")
        .eq("user_id", process.env.NEXT_PUBLIC_USER_ID)
        .eq("date", today)
        .order("signal_name");
      if (data) setSignals(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-4">
      {loading ? (
        <progress className="progress w-full"></progress>
      ) : signals.length === 0 ? (
        <p className="text-gray-500">No signals for today.</p>
      ) : (
        signals.map(s => (
          <div key={s.id} className="card bg-base-100 shadow">
            <div className="card-body flex justify-between items-center">
              <div>
                <h4 className="card-title">{s.signal_name}</h4>
                <p className="text-sm text-gray-500">{s.explanation}</p>
              </div>
              <span className="badge badge-info text-lg">{s.score}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// 3) Put/Call Ratio Widget (sparkline + latest)
export function PutCallRatioCard() {
  const [data, setData] = useState<PutCallRatio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data: rows } = await supabase
        .from<PutCallRatio>("put_call_ratios")
        .select("date,ratio")
        .eq("user_id", process.env.NEXT_PUBLIC_USER_ID)
        .order("date", { ascending: false })
        .limit(7);
      if (rows) setData(rows.reverse());
      setLoading(false);
    };
    fetch();
  }, []);

  const latest = data[data.length - 1];

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
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
                  <Tooltip formatter={(v:number) => v.toFixed(2)} />
                  <Line type="monotone" dataKey="ratio" stroke="currentColor" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
