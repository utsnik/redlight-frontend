import { ReactNode } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="p-4 flex justify-between items-center">
        <h2 className="text-gray-900 dark:text-gray-100 text-xl font-semibold">
          Redlight Dashboard
        </h2>
        <button
          aria-label="Toggle Dark Mode"
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/40 transition"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-200" />}
        </button>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

