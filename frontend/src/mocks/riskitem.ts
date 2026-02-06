import { type RiskItem } from "@/types/RiskItem";

export const MOCK_RISKS: RiskItem[] = [
  {
    id: 1,
    article: "제 5조 3항 (원상복구)",
    content:
      '임차인은 퇴거 시 모든 시설물을 입주 당시 상태로 "완벽하게" 복구해야 한다.',
    riskLevel: "High",
    potentialLoss: "약 2,000,000원",
    reason:
      "벽지 변색이나 바닥 찍힘 등 자연스러운 노후화까지 세입자에게 수리비를 청구할 수 있는 조항입니다.",
    solution:
      '특약 사항에 "단, 일상적인 사용으로 인한 자연 마모와 손상은 원상복구 의무에서 제외한다" 문구를 추가하세요.',
  },
  {
    id: 2,
    article: "제 11조 (계약 해지)",
    content: "임대인은 1개월 전 통보로 조건 없이 계약을 해지할 수 있다.",
    riskLevel: "Critical",
    potentialLoss: "약 5,000,000원",
    reason:
      "갑작스러운 이사로 인한 이사 비용, 부동산 중개 수수료, 그리고 다음 집을 구할 때까지의 거주 불안정 비용이 발생합니다.",
    solution:
      "주택임대차보호법 제6조에 위반되므로 무효입니다. 해당 조항 삭제를 강력히 요청하세요.",
  },
];
