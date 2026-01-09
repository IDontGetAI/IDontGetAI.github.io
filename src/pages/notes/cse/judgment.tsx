import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";

const RAW_URL =
  "https://raw.githubusercontent.com/IDontGetAI/Civil/refs/heads/main/02_%E5%88%A4%E6%96%AD%E6%8E%A8%E7%90%86/01_%E5%88%A4%E6%96%AD%E6%8E%A8%E7%90%86%E7%B2%BE%E8%AE%B2%E7%B2%BE%E7%82%BC%E7%A8%8B%E6%B0%B8%E4%B9%90.md";

export default function Judgment() {
  return (
    <RemoteNoteLayout
      title="1.判断精讲精练"
      subtitle="从 GitHub 动态加载笔记"
      rawUrl={RAW_URL}
      backLink="/cse"
      backLabel="返回公考页"
    />
  );
}
