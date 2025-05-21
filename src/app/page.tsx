// src/app/page.tsx
"use client";

import CompositeScoreCard from "@/components/CompositeScoreCard";
import DailySignalsList from "@/components/DailySignalsList";
import {
  CompositeScoreChart,
  PutCallRatioCard,
} from "@/components/RedlightWidgets";

export default function HomePage() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      {/* 1) Your original latest composite score card */}
      <CompositeScoreCard />

      {/* 2) Your 7-day composite score sparkline */}
      <CompositeScoreChart />

      {/* 3) Your put/call ratio widget */}
      <PutCallRatioCard />

      {/* 4) Today's signals list */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">Today's Signals</h3>
        <DailySignalsList />
      </div>
    </div>
  );
}
