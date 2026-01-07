import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";

// Remote GitHub Note Configuration
const RAW_URL = "https://raw.githubusercontent.com/IDontGetAI/Notebook_AI/main/01%20%20Mathematical%20Basic/02%20%20Analysis/01%20%20%E6%95%B0%E5%88%97%E6%9E%81%E9%99%90.md";

export default function MathAnalysisNote() {
  return (
    <RemoteNoteLayout
      title="Mathematical Analysis"
      subtitle="笔记：数列极限 (Remote)"
      rawUrl={RAW_URL}
      backLink="/math"
      backLabel="返回数学主页"
    />
  );
}
