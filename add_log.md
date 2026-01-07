# 如何添加感悟/日志 (Logs/Insights)

本指南介绍如何添加一个新的感悟页面。感悟页面本质上和笔记页面一样，都是从 GitHub 加载 Markdown，但通常用于记录随笔、思考或读后感。

## 1. 准备 GitHub 链接
同笔记一样，获取您的 Markdown 文件的 **Raw URL**。

## 2. 创建页面文件
在 `src/pages/logs/{学科}/` 目录下创建一个新的 `.tsx` 文件。
例如：`src/pages/logs/philosophy/FreeWill.tsx`

复制以下模板并修改：

```tsx
import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";

const RAW_URL = "https://raw.githubusercontent.com/IDontGetAI/Philosophy/main/path/to/freewill.md";

export default function FreeWill() {
  return (
    <RemoteNoteLayout
      title="Free Will"              // 标题
      subtitle="感悟：自由意志是幻觉吗？" // 副标题
      rawUrl={RAW_URL}
      backLink="/philosophy"         // 返回路径
      backLabel="返回哲学主页"
    />
  );
}
```

## 3. 注册路由
打开 `src/App.tsx`：

1.  **导入组件**：
    ```tsx
    import FreeWill from "@/pages/logs/philosophy/FreeWill";
    ```
2.  **添加路由**：
    ```tsx
    <Route path="/logs/philosophy/free-will" component={FreeWill} />
    ```

## 4. 添加入口链接
打开对应的学科主页文件（例如 `src/pages/Philosophy.tsx`），在 `insights` 数据中添加链接：

```tsx
const insights: InsightItem[] = [
  {
    title: "自由意志是幻觉吗？",
    content: "Libet 实验显示......（这里写简短摘要，不超过3行）",
    date: "2025-10-31",
    link: "/logs/philosophy/free-will" // <--- 这里对应 App.tsx 中的 path
  },
  // ...
];
```

## 5. 部署
运行 `npm run deploy`。
