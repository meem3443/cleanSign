// src/components/home/FileUploader.tsx
import React, { useRef } from "react";
import { UploadCloud } from "lucide-react";

export default function FileUploader(props: {
  onFileSelect: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      props.onFileSelect(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-xl mx-auto text-center mt-10 animate-fade-in-up">
      <h1 className="text-4xl font-extrabold mb-6 leading-tight text-slate-900 dark:text-white">
        계약서에 숨겨진 <br />
        <span className="text-red-500 dark:text-red-400">독소조항</span>을
        찾아드립니다.
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">
        보증금 미반환, 과도한 수리비 청구 등<br />
        위험 요소를 AI가 3초 만에 진단합니다.
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
  );
}
