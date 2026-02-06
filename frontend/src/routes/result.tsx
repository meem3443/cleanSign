import { createFileRoute } from "@tanstack/react-router";
import { ResultPage } from "@/page/ResultPage";

export const Route = createFileRoute("/result")({
  component: ResultPage,
});
