export interface RiskItem {
  id: number;
  article: string;
  content: string;
  riskLevel: "Critical" | "High" | "Medium";
  potentialLoss: string;
  reason: string;
  solution: string;
}
