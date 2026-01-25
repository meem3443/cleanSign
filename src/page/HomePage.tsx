import React, { useState, useEffect, useRef } from "react";
import {
  UploadCloud,
  AlertTriangle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  CornerDownRight,
  Coins,
  AlertOctagon,
} from "lucide-react";
import { MermaidChart } from "@/component/mermaid/chart";
import { MOCK_RISKS } from "@/mocks/riskitem";
import { MOCK_MERMAID_CHART } from "@/mocks/chart";
import { useThemeStore } from "@/store/themeStore";

type AnalysisStep = "upload" | "analyzing" | "result";

const TOTAL_POTENTIAL_LOSS = "7,000,000";

export default function HomePage() {
  const [step, setStep] = useState<AnalysisStep>("upload");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isDark } = useThemeStore();

  const processFileAnalysis = (file: File) => {
    if (file && step === "upload") {
      setFileName(file.name);
      setStep("analyzing");

      setTimeout(() => {
        setStep("result");
      }, 2500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFileAnalysis(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      setFileName(null);
    };
  }, []);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
        <main className="max-w-6xl mx-auto px-4 py-10">
          {step === "upload" && (
            <div className="max-w-xl mx-auto text-center mt-10 animate-fade-in-up">
              <h1 className="text-4xl font-extrabold mb-6 leading-tight text-slate-900 dark:text-white">
                계약서에 숨겨진 <br />
                <span className="text-red-500 dark:text-red-400">독소조항</span>
                을 찾아드립니다.
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">
                보증금 미반환, 과도한 수리비 청구 등<br />
                나도 모르게 사인할 뻔한 위험 요소를 AI가 분석합니다.
              </p>

              <div className="relative group w-full max-w-md mx-auto">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 bg-white dark:bg-slate-900 transition-all duration-300 group-hover:border-blue-500 dark:group-hover:border-blue-400 group-hover:bg-blue-50/50 dark:group-hover:bg-slate-800 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">
                    PDF 계약서 업로드
                  </h3>
                  <p className="text-sm text-slate-400 mt-2">
                    클릭하거나 파일을 이곳에 놓으세요
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === "analyzing" && (
            <div className="max-w-xl mx-auto text-center flex flex-col items-center justify-center py-20">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
                <div className="relative bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg">
                  <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                AI가 '{fileName}'를 분석 중입니다
              </h2>
              <div className="space-y-2 text-slate-500 dark:text-slate-400 text-sm">
                <p>⚖️ 법률 데이터베이스 대조 중...</p>
                <p>💰 잠재적 손실 금액 계산 중...</p>
                <p>🎨 시각화 차트 생성 중...</p>
              </div>
            </div>
          )}

          {/* --- VIEW 3: RESULT --- */}
          {step === "result" && (
            <div className="animate-fade-in space-y-8">
              {/* 3.1 Total Risk Dashboard */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-300">
                <div>
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    발견된 총 위험 요소
                  </h2>
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="text-red-500 dark:text-red-400 w-6 h-6" />
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">
                      {MOCK_RISKS.length}건
                    </span>
                  </div>
                </div>

                <div className="h-px w-full md:w-px md:h-16 bg-slate-200 dark:bg-slate-700"></div>

                <div className="flex-1 w-full">
                  <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    이 계약대로 진행 시 예상 손실액
                  </h2>
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <Coins className="w-8 h-8 fill-red-100 dark:fill-red-900/30" />
                    <span className="text-4xl font-extrabold tracking-tight">
                      -{TOTAL_POTENTIAL_LOSS}원
                    </span>
                  </div>
                  <p className="text-sm text-red-400 mt-1 font-medium">
                    * 최악의 상황 발생 시 추정되는 금액입니다.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setStep("upload");
                    setFileName(null);
                  }}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-colors text-sm whitespace-nowrap cursor-pointer"
                >
                  다시 검사하기
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* 3.2 Mermaid Visualization */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                      <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                      위험 흐름도 (Flowchart)
                    </h3>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex-1 min-h-125 flex flex-col transition-colors duration-300">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-100 dark:bg-red-900 border border-red-400 rounded-sm"></div>{" "}
                        위험 발생
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-100 dark:bg-green-900 border border-green-500 rounded-sm"></div>{" "}
                        대처 완료
                      </div>
                    </div>
                    <MermaidChart chart={MOCK_MERMAID_CHART} isDark={isDark} />
                  </div>
                </div>

                {/* 3.3 Detailed Cards */}
                <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                    상세 솔루션
                  </h3>

                  <div
                    className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4"
                    style={{ maxHeight: "600px" }}
                  >
                    {MOCK_RISKS.map((risk) => (
                      <div
                        key={risk.id}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                      >
                        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start gap-2">
                          <div>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold mb-1
                              ${
                                risk.riskLevel === "Critical"
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                  : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                              }`}
                            >
                              <AlertTriangle className="w-3 h-3" />{" "}
                              {risk.riskLevel} Risk
                            </span>
                            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-lg leading-tight">
                              {risk.article}
                            </h4>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                              예상 손실
                            </span>
                            <span className="text-red-600 dark:text-red-400 font-bold text-sm bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
                              -{risk.potentialLoss}
                            </span>
                          </div>
                        </div>

                        <div className="p-5 space-y-5">
                          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 italic relative">
                            <span className="absolute top-2 left-2 text-slate-300 dark:text-slate-600 text-2xl font-serif">
                              "
                            </span>
                            <p className="relative z-10 px-2">{risk.content}</p>
                          </div>

                          <div>
                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <ArrowRight className="w-3 h-3" /> 위험 요인
                            </h5>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                              {risk.reason}
                            </p>
                          </div>

                          <div className="bg-green-50/80 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-4">
                            <h5 className="text-sm font-bold text-green-800 dark:text-green-400 mb-2 flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                              솔루션 (Action Plan)
                            </h5>
                            <div className="flex gap-2">
                              <CornerDownRight className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                              <p className="text-sm text-green-900 dark:text-green-200 leading-relaxed font-semibold">
                                {risk.solution}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
