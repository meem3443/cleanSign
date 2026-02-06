import mermaid from "mermaid";
import { useRef, useEffect } from "react";

export const MermaidChart = ({
  chart,
  isDark,
}: {
  chart: string;
  isDark: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "base",
      securityLevel: "loose",
      fontSize: 200, // 기본값은 보통 16px 내외입니다.
      fontFamily: "Pretendard, sans-serif",
      themeVariables: isDark
        ? {
            primaryColor: "#1e293b",
            lineColor: "#94a3b8",
            mainBkg: "#0f172a",
            textColor: "#f1f5f9",
          }
        : {
            primaryColor: "#eff6ff",
            mainBkg: "#ffffff",
            textColor: "#0f172a",
          },
    });

    const renderChart = async () => {
      if (containerRef.current) {
        try {
          const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(uniqueId, chart);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error("Mermaid Rendering Failed", error);
          containerRef.current.innerHTML = `
            <p class="text-red-500 text-sm">Mermaid Error:</p>
            <pre class="text-sm text-gray-700 dark:text-gray-300 p-2 bg-gray-100 dark:bg-gray-700 rounded">${chart}</pre>
          `;
        }
      }
    };

    renderChart();

    // cleanup: DOM 내부 초기화
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [chart, isDark]); // chart와 isDark가 변경될 때만 실행

  return (
    <div
      ref={containerRef}
      className="w-full h-full mermaid flex justify-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-inner border border-slate-100 dark:border-slate-700 overflow-x-auto transition-colors duration-300"
    ></div>
  );
};
