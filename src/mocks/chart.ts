export const MOCK_MERMAID_CHART = `
graph TD
  Start["계약 검토 시작"] --> Check1{"제 5조 3항 확인"}
  Check1 -- "원상복구 의무" --> Risk1["🚨 위험: 과도한 수리비 청구<br/>(예상손실: 200만원)"]
  Risk1 --> Solve1["✅ 대처: '통상 마모 제외' 특약"]
  Check1 -- "특약 있음" --> Safe1["안전"]
  Start --> Check2{"제 11조 해지권"}
  Check2 -- "임대인 임의 해지" --> Risk2["🚨 위험: 이사비용 및 중개수수료<br/>(예상손실: 500만원)"]
  Risk2 --> Solve2["✅ 대처: 법적 효력 없음 통보"]
  classDef risk fill:#fecaca,stroke:#ef4444,stroke-width:2px,color:#7f1d1d
  classDef safe fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#14532d
  classDef neutral fill:#ffffff,stroke:#94a3b8,stroke-width:1px,color:#1e293b
  class Risk1,Risk2 risk
  class Solve1,Solve2,Safe1 safe
  class Start,Check1,Check2 neutral
`;
