from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import json
from dotenv import load_dotenv

# [수정됨] gemini_api에서 새로운 함수 3개 가져오기
from gemini_api import extract_standard_contract_data, analyze_risk_types, generate_solutions
from risk_calculator import get_conservative_loss
from utils import generate_mermaid_chart

load_dotenv()
API_KEY = os.environ.get('API_KEY')

app = FastAPI()

# CORS 설정
origins = ["http://localhost:5173", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_contract(file: UploadFile = File(...)):
    temp_file_path = f"temp_{file.filename}"
    
    try:
        # 파일 저장
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        print(f"📂 분석 시작: {file.filename}")

        # === Step 1: OCR 데이터 추출 ===
        print("🚀 1단계: OCR 텍스트 추출 중...")
        extracted_data = extract_standard_contract_data(temp_file_path, API_KEY)
        
        if not extracted_data: 
            raise HTTPException(status_code=500, detail="OCR 추출 실패")

        financials = extracted_data.get('financials', {})
        deposit = financials.get('deposit', 0)
        monthly_rent = financials.get('monthly_rent', 0)
        raw_clauses = extracted_data.get('raw_clauses', [])

        # === Step 2: [Agent 1] 위험 유형 분석 ===
        print("🚀 2단계: 위험 유형 분석 중 (Agent 1)...")
        # raw_clauses(문자열 리스트)를 넣어서 분석 결과(JSON 리스트)를 받음
        risk_analysis_result = analyze_risk_types(raw_clauses, API_KEY)

        # === Step 3: [Agent 2] 솔루션 생성 ===
        print("🚀 3단계: 대처법 생성 중 (Agent 2)...")
        # Agent 1의 분석 결과를 넣어서 솔루션(JSON 리스트)을 받음
        solutions_result = generate_solutions(risk_analysis_result, API_KEY)

        # === Step 4: 데이터 병합 및 비용 계산 ===
        print("🚀 4단계: 최종 리포트 생성 중...")
        
        final_clauses = []
        total_potential_loss = 0
        toxic_count = 0

        # Agent 1(분석)과 Agent 2(솔루션) 결과 합치기
        # 두 리스트는 순서가 같다고 가정합니다.
        for i, analysis_item in enumerate(risk_analysis_result):
            # 솔루션 가져오기 (인덱스 에러 방지)
            if i < len(solutions_result):
                sol_item = solutions_result[i]
            else:
                sol_item = {"solution": "AI 응답 지연으로 솔루션을 생성하지 못했습니다."}

            # 두 딕셔너리 병합 (분석 내용 + 솔루션)
            merged_item = {**analysis_item, **sol_item}
            
            risk_type = merged_item.get('risk_type', 'safe')
            
            if risk_type == 'safe':
                merged_item['expected_loss'] = 0
            else:
                toxic_count += 1
                # Python 계산 로직 적용
                loss = get_conservative_loss(risk_type, deposit, monthly_rent)
                merged_item['expected_loss'] = loss
                total_potential_loss += loss
            
            final_clauses.append(merged_item)

        # === Step 5: Mermaid 차트 생성 ===
        mermaid_code = generate_mermaid_chart(final_clauses)

        print(f"✅ 완료: 독소조항 {toxic_count}개, 총 위험액 {total_potential_loss:,}원")

        return {
            "summary": {
                "toxic_count": toxic_count,
                "total_loss": total_potential_loss,
                "deposit": deposit,
                "monthly_rent": monthly_rent
            },
            "mermaid_chart": mermaid_code,
            "analyzed_clauses": final_clauses
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
        
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)