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
      {/* 1) Existing “latest score” card */}
      <CompositeScoreCard />

      {/* 2) 7-day composite score sparkline */}
      <CompositeScoreChart />

      {/* 3) Put/Call ratio widget */}
      <PutCallRatioCard />

      {/* 4) Today’s signals list */}
      <div>
        <h3 className="text-white text-xl font-semibold mb-2">
          Today's Signals
        </h3>
        <DailySignalsList />
      </div>

      {/* 5) daisyUI test card */}
<div className="p-8">
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">DaisyUI Test</h2>
      <p>If this card is styled, you’re all set.</p>
      <button className="btn btn-accent mt-4">Test Button</button>
    </div>
  </div>
</div>

  );
}
