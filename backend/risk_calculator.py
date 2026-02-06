# backend/risk_calculator.py (새로 생성하거나 main.py에 포함)

def get_conservative_loss(risk_type, deposit, rent):
    """
    [기능 2] 전월세 별 보수적 손실 비용 산정 (L_direct)
    - risk_type: 독소조항 유형 (AI가 분류한 것)
    - deposit: 보증금
    - rent: 월세 (0원이면 전세로 간주)
    """
    
    # 입력값 방어 로직 (0원이면 기본값 적용)
    safe_deposit = deposit if deposit > 0 else 10000000
    safe_rent = rent if rent > 0 else 500000
    
    # 전세 여부 판단
    is_jeonse = (rent == 0)

    # === [핵심] 보수적 산정 기준표 (2025년 기준) ===
    RISK_TABLE = {
        # 1. 청소비: 전/월세 무관하게 특수청소비 명목 2배 청구 가정
        "cleaning": 400000, 

        # 2. 원상복구: 도배/장판/수리비 덤탱이 (월세는 월세비례, 전세는 고정값)
        "repair": max(safe_rent * 2, 1000000) if not is_jeonse else 1500000,

        # 3. 중도해지/위약금: 
        # - 월세: 공실기간 3개월 월세 부담
        # - 전세: 중개수수료(0.4%) + 이사비용 등 위약금 성격
        "termination": (safe_rent * 3) if not is_jeonse else int(safe_deposit * 0.004) + 500000,

        # 4. 보증금 미반환: 1년간 돈이 묶였을 때 법정지연손해금 (연 12%)
        "deposit_return": int(safe_deposit * 0.12),
        
        # 5. 반려동물: 특수청소 + 도배장판 전면교체
        "pet": 3000000,

        # 6. 기타: 통상적인 소액 분쟁 합의금
        "other": 500000
    }

    # 해당 타입의 비용 반환 (없으면 기타 비용 반환)
    return RISK_TABLE.get(risk_type, 500000)