// app/page.tsx
import { Card } from "@/components/Card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <Card className="max-w-sm text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Hello, Redlight!
        </h1>
        <p className="text-gray-300">
          Your sexy dashboard is brewing…
        </p>
      </Card>
    </div>
  );
}
