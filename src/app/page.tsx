// src/app/page.tsx
"use client";

import CompositeScoreCard from "@/components/CompositeScoreCard";
import CompositeScoreChart from "@/components/CompositeScoreChart";
import PutCallRatioCard from "@/components/PutCallRatioCard";
import DailySignalsList from "@/components/DailySignalsList";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 space-y-12">
      {/* 1) Center the main score card */}
      <div className="flex justify-center">
        <CompositeScoreCard />
      </div>

      {/* 2) Two-column grid for chart and ratio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CompositeScoreChart />
        <PutCallRatioCard />
      </div>

      {/* 3) Today’s signals */}
      <section>
        <h3 className="text-4xl font-extrabold mb-6">Today's Signals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DailySignalsList />
        </div>
      </section>
    </div>
  );
}
