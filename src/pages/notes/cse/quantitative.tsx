import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";

const RAW_URL =
  "https://raw.githubusercontent.com/IDontGetAI/Civil/refs/heads/main/03_%E6%95%B0%E9%87%8F%E5%85%B3%E7%B3%BB/01_%E6%95%B0%E9%87%8F%E5%85%B3%E7%B3%BB%E6%8B%BF%E5%88%86%E7%A8%B3%E7%A8%B3%E7%8F%AD.md";

export default function Quantitative() {
  return (
    <RemoteNoteLayout
      title="1.数量关系拿分稳稳班"
      subtitle="从 GitHub 动态加载笔记"
      rawUrl={RAW_URL}
      backLink="/cse"
      backLabel="返回公考页"
    />
  );
}
