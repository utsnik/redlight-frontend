"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface CompositeScore {
  score: number;
  label: string;
  date: string;
  created_at: string;
}

export default function CompositeScoreCard() {
  const [data, setData] = useState<CompositeScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchLatest() {
    setLoading(true);
    try {
      const { data: score, error } = await supabase
        .from("composite_scores")
        .select("score, label, date, created_at")
        .eq("user_id", process.env.NEXT_PUBLIC_USER_ID)
        .order("created_at", { ascending: false }) // ← newest first
        .limit(1)
        .single();

      console.log("fetched score:", score, "error:", error);
      if (error) throw error;
      setData(score as CompositeScore);
    } catch (err: any) {
      setError(err.message || "Failed to fetch composite score");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLatest();

    const channel = supabase
      .channel('composite-scores-listener')
      .on('postgres_changes', {
        event: 'INSERT',           // or '*' to catch UPDATE/DELETE too
        schema: 'public',
        table:  'composite_scores',
        filter: `user_id=eq.${process.env.NEXT_PUBLIC_USER_ID}`
      }, (payload) => {
        console.log("realtime payload:", payload);
        fetchLatest();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const getBgColor = (label: string) => {
    switch (label) {
      case "RED":    return "bg-red-600";
      case "ORANGE": return "bg-yellow-500";
      case "GREEN":  return "bg-green-600";
      default:       return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className={`
        card bg-primary text-primary-content
        shadow-2xl rounded-3xl overflow-hidden
        p-8 flex flex-col items-center justify-center
      `}>
        {loading && <p>Loading...</p>}
        {error   && <p className="text-red-200">{error}</p>}
        {data && !loading && !error && (
          <>
            <p className="text-lg text-gray-200 mb-1">
              {new Date(data.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-200 mb-4">
              {new Date(data.created_at).toLocaleTimeString()}
            </p>
            <h2 className="text-5xl font-bold tracking-tight">
              {data.score}
            </h2>
            <p className="uppercase mt-2">{data.label}</p>
          </>
        )}
      </div>
    </div>
  );
}
