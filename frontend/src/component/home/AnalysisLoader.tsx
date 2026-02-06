import { useState, useEffect } from "react";
import { FileText, Search, ShieldAlert, CheckCircle2 } from "lucide-react";

const LOADING_MESSAGES = [
  { text: "계약서 파일의 텍스트를 추출하고 있습니다...", icon: FileText },
  { text: "법률 데이터베이스와 대조 작업을 진행 중입니다...", icon: Search },
  { text: "잠재적인 독소 조항을 탐지하고 있습니다...", icon: ShieldAlert },
  { text: "분석 결과를 요약하고 있습니다...", icon: CheckCircle2 },
];

export default function AnalysisLoader({
  fileName,
}: {
  fileName: string | null;
}) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = prev < 70 ? Math.random() * 5 : Math.random() * 2;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 900);

    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
    };
  }, []);

  const CurrentIcon = LOADING_MESSAGES[msgIndex].icon;

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative mb-10 group">
        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
        <div className="relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700">
          <CurrentIcon className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-bounce-slight transition-all duration-300" />
        </div>

        <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-scan"></div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
        AI가{" "}
        <span className="text-blue-600 dark:text-blue-400">'{fileName}'</span>를
        <br />
        면밀히 분석하고 있습니다
      </h2>

      <div className="w-full max-w-sm bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-6 overflow-hidden">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="h-8 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium animate-fade-in-up key={msgIndex}">
          {LOADING_MESSAGES[msgIndex].text}
        </p>
      </div>
    </div>
  );
}
