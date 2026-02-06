// src/routes/__root.tsx
import { Header } from "@/component/common/Header";
import { useThemeStore } from "@/store/themeStore"; 
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  // 상태 구독 (필요한 값만 가져옴)
  const isDark = useThemeStore((state) => state.isDark);

  // *초기 진입 시 시스템 다크모드 감지 로직 (선택사항, 디테일 챙기기)
  useEffect(() => {
    const saved = localStorage.getItem("theme-storage");
    if (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // 저장된 설정이 없으면 시스템 설정을 따라감
      useThemeStore.setState({ isDark: true });
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    // Provider 제거! 그냥 div만 있으면 됨
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
        {/* Header에도 Props 전달 필요 없음 */}
        <Header />

        <main className="max-w-6xl mx-auto px-4 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
