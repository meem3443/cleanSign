import { Navigate } from "@tanstack/react-router";
import { useThemeStore } from "@/store/themeStore";
import { useFileAnalysis } from "@/hooks/useFileAnalysis";
import FileUploader from "@/component/home/FileUploader";
import AnalysisLoader from "@/component/home/AnalysisLoader";

export default function HomePage() {
  const { isDark } = useThemeStore();
  const { data, step, fileName, startAnalysis } = useFileAnalysis();

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
        <main className="max-w-6xl mx-auto px-4 py-10">
          {step === "upload" && <FileUploader onFileSelect={startAnalysis} />}

          {step === "analyzing" && <AnalysisLoader fileName={fileName} />}

          {step === "result" && <Navigate to="/result" />}
        </main>
      </div>
    </div>
  );
}
