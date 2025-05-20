import CompositeScoreCard from "@/components/CompositeScoreCard";
import DailySignalsList from "@/components/DailySignalsList";

export default function HomePage() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      <CompositeScoreCard />
      <h3 className="text-white text-xl font-semibold">Today's Signals</h3>
      <DailySignalsList />
    </div>
  );
}
