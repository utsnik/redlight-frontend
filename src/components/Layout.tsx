import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black">
      <header className="p-4 flex justify-between items-center">
        <h2 className="text-white text-xl font-semibold">Redlight Dashboard</h2>
        {/* Later: dark/light toggle here */}
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
