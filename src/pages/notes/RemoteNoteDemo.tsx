import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";

// 示例：引用 Facebook React 仓库的 README
const TARGET_URL = "https://raw.githubusercontent.com/facebook/react/main/README.md";

export default function RemoteNoteDemo() {
  return (
    <RemoteNoteLayout
      title="Remote Note Demo"
      subtitle="从 GitHub 动态加载笔记"
      rawUrl={TARGET_URL}
      backLink="/tools"
      backLabel="返回工具页"
    />
  );
}
