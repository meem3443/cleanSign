import { CheckCircle, Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

export function Header() {
  const { isDark, toggleTheme } = useThemeStore();
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <CheckCircle className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
            Clean Sign
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            {isDark ? (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-400" />
                <span>Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-orange-400" />
                <span>Light</span>
              </>
            )}
          </button>
          <span className="text-xs font-medium text-slate-300 dark:text-slate-600">
            |
          </span>
          <span className="text-xs font-medium text-slate-400">v0.6</span>
        </div>
      </div>
    </header>
  );
}
