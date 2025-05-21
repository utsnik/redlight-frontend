// src/app/page.tsx
"use client";

import CompositeScoreCard from "../src/components/CompositeScoreCard";
import CompositeScoreChart from "../src/components/CompositeScoreChart";
import PutCallRatioCard from "../src/components/PutCallRatioCard";
import DailySignalsList from "../src/components/DailySignalsList";

export default function DashboardPage() {
  return (
    <main className="container mx-auto p-6 space-y-12">
      {/* 1) Center your main score */}
      <div className="flex justify-center">
        <CompositeScoreCard />
      </div>

      {/* 2) Two-column grid for sparkline + ratio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CompositeScoreChart />
        <PutCallRatioCard />
      </div>

      {/* 3) Today’s signals */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Today's Signals</h2>
        <DailySignalsList />
      </section>
    </main>
  );
}
