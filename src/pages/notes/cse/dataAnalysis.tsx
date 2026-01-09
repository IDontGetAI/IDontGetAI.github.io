import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";

const RAW_URL =
  "https://raw.githubusercontent.com/IDontGetAI/Civil/main/04%20%20%E8%B5%84%E6%96%99%E5%88%86%E6%9E%90/01%20%20%E8%B5%84%E6%96%99%E5%88%86%E6%9E%90%E7%90%86%E8%AE%BA%E5%AE%9E%E6%88%98%E7%8F%AD.md";

export default function DataAnalysis() {
  return (
    <RemoteNoteLayout
      title="1.资料分析理论实战班"
      subtitle="从 GitHub 动态加载笔记"
      rawUrl={RAW_URL}
      backLink="/cse"
      backLabel="返回公考页"
    />
  );
}
