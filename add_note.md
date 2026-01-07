# 如何添加笔记 (Notes)

本指南介绍如何添加一个新的笔记页面，该页面将自动从 GitHub 加载 Markdown 内容。

## 1. 准备 GitHub 链接
1.  在 GitHub 上打开您的笔记 `.md` 文件。
2.  点击右上角的 **"Raw"** 按钮。
3.  复制浏览器地址栏中的 URL（例如 `https://raw.githubusercontent.com/.../note.md`）。

## 2. 创建页面文件
在 `src/pages/notes/{学科}/` 目录下创建一个新的 `.tsx` 文件。
例如：`src/pages/notes/math/Calculus1.tsx`

复制以下模板并修改：

```tsx
import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";

// 填入您的 GitHub Raw 链接
const RAW_URL = "https://raw.githubusercontent.com/IDontGetAI/Notebook_AI/main/Path/To/Your/Note.md";

export default function Calculus1() {
  return (
    <RemoteNoteLayout
      title="微积分 I"                 // 页面大标题
      subtitle="笔记：极限与连续性"      // 副标题
      rawUrl={RAW_URL}
      backLink="/math"                // 返回按钮跳转的路径 (例如 /math, /physics)
      backLabel="返回数学主页"          // 返回按钮文字
    />
  );
}
```

## 3. 注册路由
打开 `src/App.tsx`：

1.  **导入组件**：
    ```tsx
    import Calculus1 from "@/pages/notes/math/Calculus1";
    ```
2.  **添加路由**：
    ```tsx
    <Route path="/notes/math/calculus-1" component={Calculus1} />
    ```

## 4. 添加入口链接
打开对应的学科主页文件（例如 `src/pages/Math.tsx`），在 `notes` 数据中添加链接：

```tsx
links: [
  { title: "微积分 I", url: "/notes/math/calculus-1" }, // <--- 这里对应 App.tsx 中的 path
  // ...
]
```

## 5. 部署
运行 `npm run deploy` 更新网站。
以后修改笔记内容只需在 GitHub 上编辑 Markdown，网站会自动同步。
