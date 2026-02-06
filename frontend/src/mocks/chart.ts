export const MOCK_MERMAID_CHART = `
graph TD
  %% --- 노드 및 흐름 정의 ---
  Start["계약 검토 시작"] --> Check1{"제 5조 3항 확인"}
  
  %% 1. Risk 노드: fa-triangle-exclamation (유지)
  Check1 -- "원상복구 의무" --> Risk1["fa:fa-triangle-exclamation 위험: 과도한 수리비 청구<br/>(예상손실: 200만원)"]
  
  %% 2. Solve 노드: fa-shield-alt (요청하신 방패 아이콘으로 변경)
  Risk1 --> Solve1["fa:fa-shield-alt 대처: '통상 마모 제외' 특약"]
  
  Check1 -- "특약 있음" --> Safe1["안전"]
  
  Start --> Check2{"제 11조 해지권"}
  Check2 -- "임대인 임의 해지" --> Risk2["fa:fa-triangle-exclamation 위험: 이사비용 및 중개수수료<br/>(예상손실: 500만원)"]
  Risk2 --> Solve2["fa:fa-shield-alt 대처: 법적 효력 없음 통보"]

  %% --- 다크 모드 배지 스타일 (유지) ---
  classDef risk fill:#450a0a,stroke:none,color:#fca5a5,font-weight:bold
  classDef safe fill:#052e16,stroke:none,color:#86efac,font-weight:bold
  classDef neutral fill:#374151,stroke:none,color:#f3f4f6
  classDef start fill:#172554,stroke:none,color:#eff6ff,font-weight:bold

  %% --- 클래스 적용 ---
  class Risk1,Risk2 risk
  class Solve1,Solve2,Safe1 safe
  class Check1,Check2 neutral
  class Start start
`;
