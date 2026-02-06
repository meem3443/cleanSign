import mimetypes
import os
import json
from google import genai
from google.genai import types

# 모델 설정
COMMON_MODEL = "gemini-flash-lite-latest" # 혹은 사용 중인 모델명

def get_client(api_key):
    return genai.Client(api_key=api_key)

# =========================================================
# 1. [OCR Agent] 영어 프롬프트 적용
# =========================================================
def extract_standard_contract_data(file_path, api_key):
    client = get_client(api_key)
    # OCR은 Vision 성능이 중요하므로 2.0 Flash Exp 또는 Pro 권장
    

    mime_type, _ = mimetypes.guess_type(file_path)
    if not mime_type:
        ext = os.path.splitext(file_path)[1].lower()
        if ext == ".pdf": mime_type = "application/pdf"
        elif ext in [".jpg", ".jpeg"]: mime_type = "image/jpeg"
        elif ext == ".png": mime_type = "image/png"
        else: mime_type = "application/pdf"
            
    print(f"   ℹ️ [OCR] File Type: {mime_type}") 

    # [최적화] 영어 프롬프트 + 간결한 지시
    prompt = """
    Analyze this Korean real estate lease agreement image.
    Extract the following data accurately.
    
    1. Financials (Integers only, unit: KRW):
       - Deposit
       - Monthly Rent (0 if none)
       - Maintenance Fee (0 if none)
    
    2. Special Terms:
       - Extract all text from the '[특약사항]' section verbatim.
       - Split into a list if numbered or separated by newlines.
       - Include handwritten text.
    """

    with open(file_path, "rb") as f:
        file_data = f.read()

    try:
        response = client.models.generate_content(
            model=COMMON_MODEL,
            contents=[
                types.Part.from_bytes(data=file_data, mime_type=mime_type),
                prompt
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema={
                    "type": "OBJECT",
                    "properties": {
                        "financials": {
                            "type": "OBJECT",
                            "properties": {
                                "deposit": {"type": "INTEGER"},
                                "monthly_rent": {"type": "INTEGER"},
                                "maintenance_fee": {"type": "INTEGER"}
                            }
                        },
                        "raw_clauses": {
                            "type": "ARRAY",
                            "items": {"type": "STRING"}
                        }
                    }
                }
            )
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"❌ OCR Error: {e}")
        return None

# =========================================================
# 2. [Agent 1] 위험 분석 (영어 지시 + Safe 제외)
# =========================================================
def analyze_risk_types(clauses_list, api_key):
    client = get_client(api_key)
    
    if not clauses_list:
        return []

    # [최적화] 영어 지시문 + 명확한 제외 조건
    prompt = f"""
    Analyze the provided list of lease clauses.
    Identify ONLY 'toxic' or 'risky' clauses for the tenant.

    [STRICT RULES]
    1. EXCLUDE any clause where 'risk_type' is 'safe'. Do NOT output them.
    2. Classify 'risk_type' into: cleaning, repair, termination, deposit_return, pet, other.
    3. Output 'summary' and 'risk_trigger' in KOREAN.

    [Clauses]
    {json.dumps(clauses_list, ensure_ascii=False)}
    """

    try:
        response = client.models.generate_content(
            model=COMMON_MODEL,
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema={
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "original_text": {"type": "STRING"},
                            "risk_type": {"type": "STRING", "enum": ["cleaning", "repair", "termination", "deposit_return", "pet", "other"]}, # safe 제거됨
                            "severity": {"type": "INTEGER"},
                            "summary": {"type": "STRING"},
                            "risk_trigger": {"type": "STRING"}
                        }
                    }
                }
            )
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"❌ Agent 1 Error: {e}")
        return []

# =========================================================
# 3. [Agent 2] 솔루션 생성 (영어 지시 + 한국어 출력)
# =========================================================
def generate_solutions(analyzed_risks, api_key):
    client = get_client(api_key)
    
    if not analyzed_risks:
        return []
    
    # [최적화] 영어 지시문 + Output in Korean
    prompt = f"""
    You are a legal consultant protecting the tenant.
    Provide actionable solutions for the provided risky clauses.

    [Instructions]
    1. Suggest specific contract revisions, legal grounds, or negotiation tactics.
    2. MUST WRITE the 'solution' in KOREAN.

    [Risky Clauses]
    {json.dumps(analyzed_risks, ensure_ascii=False)}
    """

    try:
        response = client.models.generate_content(
            model=COMMON_MODEL,
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema={
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "solution": {"type": "STRING"}
                        }
                    }
                }
            )
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"❌ Agent 2 Error: {e}")
        return []