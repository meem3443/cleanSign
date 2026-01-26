import { useState, useCallback } from "react";

export type AnalysisStep = "upload" | "analyzing" | "result";

export const useFileAnalysis = () => {
  const [step, setStep] = useState<AnalysisStep>("upload");
  const [fileName, setFileName] = useState<string | null>(null);

  const startAnalysis = useCallback((file: File) => {
    setFileName(file.name);
    setStep("analyzing");

    setTimeout(() => {
      setStep("result");
    }, 3500);
  }, []);

  return { step, fileName, startAnalysis };
};
