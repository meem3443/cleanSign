import { MermaidChart } from "@/component/mermaid/chart";
import { MOCK_RISKS } from "@/mocks/riskitem";
import { useThemeStore } from "@/store/themeStore";
import {
  AlertOctagon,
  Coins,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CornerDownRight,
} from "lucide-react";

import { useLocation } from "@tanstack/react-router";
// import { MOCK_MERMAID_CHART } from "@/mocks/chart";

interface AnalysisClause {
  summary: string;
  risk_type: string;
  severity: number;
  original_text: string;
  expected_loss: number;
  solution: string;
  risk_trigger: string;
}

interface AnalysisResult {
  summary: {
    toxic_count: number;
    total_loss: number;
    deposit: number;
    monthly_rent: number;
  };
  mermaid_chart: string;
  analyzed_clauses: AnalysisClause[];
}

export function ResultPage() {
  const { isDark } = useThemeStore();

  const location = useLocation();

  const resultData = location.state as unknown as AnalysisResult;

  return (
    <div className="animate-fade-in space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-300">
        <div>
          <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-1">
            발견된 총 위험 요소
          </h2>
          <div className="flex items-center gap-2">
            <AlertOctagon className="text-red-500 dark:text-red-400 w-6 h-6" />
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              {resultData?.summary.toxic_count}건
            </span>
          </div>
        </div>

        <div className="h-px w-full md:w-px md:h-16 bg-slate-200 dark:bg-slate-700"></div>

        <div className="flex-1 w-full">
          <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-1">
            이 계약대로 진행 시 잠재 예상 손실액
          </h2>
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <Coins className="w-8 h-8 fill-red-100 dark:fill-red-900/30" />
            <span className="text-4xl font-extrabold tracking-tight">
              -{resultData?.summary.total_loss.toLocaleString()}원
            </span>
          </div>
          <p className="text-sm text-red-400 mt-1 font-medium">
            * 최악의 상황 발생 시 추정되는 금액입니다.
          </p>
        </div>

        <button
          onClick={() => {}}
          className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-colors text-sm whitespace-nowrap cursor-pointer"
        >
          다시 검사하기
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
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
            <div className="w-full h-full">
              <MermaidChart chart={resultData.mermaid_chart} isDark={isDark} />
            </div>
          </div>
        </div>

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
                      <AlertTriangle className="w-3 h-3" /> {risk.riskLevel}{" "}
                      Risk
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
  );
}
