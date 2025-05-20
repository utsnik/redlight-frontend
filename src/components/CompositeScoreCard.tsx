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

  // Fetch the latest composite score
  async function fetchLatest() {
    try {
      setLoading(true);
      const { data: score, error } = await supabase
        .from("composite_scores")
        .select("score, label, date, created_at")
        .eq("user_id", process.env.NEXT_PUBLIC_USER_ID)
        .order("date", { ascending: false })
        .limit(1)
        .single();

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

    // using Supabase v2 realtime channel
    const channel = supabase
      .channel("public:composite_scores")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "composite_scores",
          filter: `user_id=eq.${process.env.NEXT_PUBLIC_USER_ID}`
        },
        () => {
          fetchLatest();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getBgColor = (label: string) => {
    switch (label) {
      case "RED":
        return "bg-red-600";
      case "ORANGE":
        return "bg-yellow-500";
      case "GREEN":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div
        className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center ${
          data ? getBgColor(data.label) : "bg-gray-600"
        } text-white`}
      >
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-200">{error}</p>}
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
