import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";

const RAW_URL =
  "https://raw.githubusercontent.com/IDontGetAI/Civil/refs/heads/main/01%20%20%E8%A8%80%E8%AF%AD%E7%90%86%E8%A7%A3%E4%B8%8E%E8%A1%A8%E8%BE%BE/01%20%20%E9%83%AD%E7%86%99%E8%A8%80%E8%AF%AD%E7%B2%BE%E8%AE%B2%E7%B2%BE%E7%82%BC.md";

export default function Expression() {
  return (
    <RemoteNoteLayout
      title="1.言语精讲精练"
      subtitle="从 GitHub 动态加载笔记"
      rawUrl={RAW_URL}
      backLink="/cse"
      backLabel="返回公考页"
    />
  );
}
