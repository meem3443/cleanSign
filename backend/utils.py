def generate_mermaid_chart(analyzed_clauses):
    """
    UI 디자인 시스템의 색상(다크모드 배지)과 FontAwesome 아이콘을 반영한 차트 생성기
    """
    mermaid_code = ["graph TD"]
    
    # 1. 스타일 정의 (배지 스타일: 테두리 없음, 형광 텍스트)
    styles = [
        # 시작 노드: 남색 배경
        "    classDef startClass fill:#172554,stroke:none,color:#eff6ff,font-weight:bold,font-size:20px;",

        # 🔴 위급 (Critical): 어두운 와인색 배경 + 밝은 빨강 텍스트/아이콘
        "    classDef riskCritical fill:#450a0a,stroke:none,color:#fca5a5,font-weight:bold,font-size:18px;",

        # 🟠 경고 (Warning): 어두운 갈색 배경 + 밝은 주황 텍스트/아이콘
        "    classDef riskWarning fill:#431407,stroke:none,color:#fdba74,font-weight:bold,font-size:18px;",

        # 🟢 솔루션 (Solution): 어두운 초록 배경 + 형광 연두 텍스트/아이콘 (방패)
        "    classDef solutionClass fill:#052e16,stroke:none,color:#86efac,font-weight:bold,font-size:18px;",

        # 일반 조항: 어두운 회색 배경
        "    classDef clauseClass fill:#374151,stroke:none,color:#f3f4f6,font-size:16px;"
    ]
    mermaid_code.extend(styles)
    
    # 2. 시작 노드 (아이콘: 파일 계약서)
    # fa: 문법은 텍스트 맨 앞에 와야 합니다.
    mermaid_code.append("    START[\"fa:fa-file-contract 계약 검토 시작\"]:::startClass")
    
    idx = 1
    has_risk = False

    for item in analyzed_clauses:
        if item.get('risk_type') == 'safe':
            continue

        has_risk = True
        
        # 데이터 추출
        raw_trigger = item.get('risk_trigger', '조항 확인')
        raw_summary = item.get('summary', '특약사항')
        loss = item.get('expected_loss', 0)
        raw_solution = item.get('solution', '협의 필요')
        risk_level = item.get('risk_level', 'Critical')

        # 텍스트 길이 제한
        if len(raw_solution) > 30:
            raw_solution = raw_solution[:30] + "..."

        # 텍스트 정제 (clean_text 함수는 외부에 있다고 가정)
        # 만약 clean_text가 없다면 단순히 str() 변환으로 대체하세요.
        clean_trigger = f"{idx}. {raw_trigger}"
        clean_summary = raw_summary
        
        # 3. 노드 텍스트 구성 (FontAwesome 적용)
        # - Risk: fa-triangle-exclamation (주의 삼각형)
        # - Solution: fa-shield-alt (방패)
        
        risk_text = f"fa:fa-triangle-exclamation 위험 감지<br/>예상 손실: -{int(loss):,}원"
        sol_text = f"fa:fa-shield-alt 솔루션 (Action Plan)<br/>{raw_solution}"

        # 노드 ID 설정
        node_clause = f"Clause{idx}"
        node_risk = f"Risk{idx}"
        node_sol = f"Sol{idx}"

        # 위험 레벨에 따른 클래스 분기
        risk_class = "riskCritical" if risk_level == "Critical" else "riskWarning"

        # 4. 차트 조립
        # 일반 조항 노드에는 fa-magnifying-glass (돋보기) 아이콘 추가 (선택사항)
        mermaid_code.append(f'    START -->|"{clean_trigger}"| {node_clause}["fa:fa-search {clean_summary}"]:::clauseClass')
        mermaid_code.append(f'    {node_clause} --> {node_risk}["{risk_text}"]:::{risk_class}')
        mermaid_code.append(f'    {node_risk} --> {node_sol}["{sol_text}"]:::solutionClass')
        
        idx += 1

    if not has_risk:
        mermaid_code.append("    START --> SAFE[\"fa:fa-check-circle 모든 조항이 안전합니다\"]:::solutionClass")

    return "\n".join(mermaid_code)