"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Signal {
  signal_name: string;
  score: number;
  explanation: string;
}

export default function DailySignalsList() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadSignals() {
    setLoading(true);
    const { data, error } = await supabase
      .from("daily_signals")
      .select("signal_name, score, explanation")
      .eq("user_id", process.env.NEXT_PUBLIC_USER_ID)
      .eq("date", new Date().toISOString().slice(0, 10))
      .order("signal_name");
    if (!error && data) setSignals(data as Signal[]);
    setLoading(false);
  }

  useEffect(() => {
    loadSignals();
    // subscribe to INSERTs if you want real-time
  }, []);

  if (loading) return <p>Loading signals…</p>;
  if (signals.length === 0) return <p>No signals logged yet today.</p>;

  return (
    <div className="space-y-2">
      {signals.map((s) => (
        <div
          key={s.signal_name}
          className="p-4 bg-white/10 rounded-xl backdrop-blur-md flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-white">{s.signal_name}</p>
            <p className="text-gray-300 text-sm">{s.explanation}</p>
          </div>
          <span className="text-xl font-bold text-white">{s.score}</span>
        </div>
      ))}
    </div>
  );
}
