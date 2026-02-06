// src/hooks/useFileAnalysis.ts
import { useState, useCallback } from "react";
// TanStack Router의 useNavigate 가져오기
import { useNavigate } from "@tanstack/react-router";

export type AnalysisStep = "upload" | "analyzing" | "result";

export const useFileAnalysis = () => {
  const [step, setStep] = useState<AnalysisStep>("upload");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // TanStack Router 네비게이터
  const navigate = useNavigate();

  const startAnalysis = useCallback(
    async (file: File) => {
      setFileName(file.name);
      setStep("analyzing");
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/analyze", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();

        // [핵심 변경] 데이터를 state에 담아 라우팅 이동
        // URL에는 표시되지 않고, 도착한 페이지에서만 읽을 수 있습니다.
        await navigate({
          to: "/result",
          state: data, // 여기에 분석 결과 JSON 통째로 넣기
        });

        // 성공하면 Hook 내부 상태는 더 이상 필요 없으므로 리셋하거나 유지
        setStep("result");
      } catch (err: any) {
        console.error("Analysis failed:", err);
        setError(err.message || "분석 중 오류가 발생했습니다.");
        setStep("upload");
        alert("파일 분석에 실패했습니다. 다시 시도해주세요.");
      }
    },
    [navigate],
  );

  return {
    step,
    fileName,
    error,
    startAnalysis,
  };
};
