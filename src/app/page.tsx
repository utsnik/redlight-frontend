// src/app/page.tsx
import CompositeScoreCard from "@/components/CompositeScoreCard";
import CompositeScoreChart from "@/components/CompositeScoreChart";
import DailySignalsList from "@/components/DailySignalsList";

export default function HomePage() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      <CompositeScoreCard />

      <h3 className="text-white text-xl font-semibold">Last 7 Days</h3>
      <CompositeScoreChart />

      <h3 className="text-white text-xl font-semibold">Today's Signals</h3>
      <DailySignalsList />
    </div>
  );
}
