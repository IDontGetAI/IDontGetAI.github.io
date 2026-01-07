# 如何添加远程 GitHub 笔记 (无头 CMS 模式)

本指南介绍如何将您 GitHub 仓库中的 Markdown 文件动态加载到网站中。
得益于全新的 **`RemoteNoteLayout`** 组件，添加新笔记现在变得极其简单。

## 第一步：准备 GitHub 链接

1.  **打开您的 GitHub 仓库**，找到您想展示的 Markdown 文件。
2.  **获取 Raw 链接**：
    *   在文件页面右上角找到 **"Raw"** 按钮，点击它。
    *   复制浏览器地址栏中的 URL。
    *   示例：`https://raw.githubusercontent.com/IDontGetAI/Notebook_AI/main/01.../01...md`

## 第二步：创建笔记页面

在 `src/pages/notes/` 目录下创建新文件，例如 `MyNewNote.tsx`。

**只需复制粘贴以下 15 行代码：**

```tsx
import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";

// 1. 填入您的 Raw 链接
const RAW_URL = "https://raw.githubusercontent.com/您的用户名/仓库名/main/路径/笔记.md";

export default function MyNewNote() {
  return (
    <RemoteNoteLayout
      title="页面标题"           // 例如：Linear Algebra
      subtitle="副标题/描述"     // 例如：笔记：线性空间与变换
      rawUrl={RAW_URL}
      backLink="/math"          // 返回按钮跳转的路径
      backLabel="返回数学主页"   // 返回按钮的文字
    />
  );
}
```

**您不需要关心：**
*   图片路径修正 (Base URL) —— 组件会自动处理。
*   加载动画与错误处理 —— 组件内置了。
*   页面布局与背景 —— 组件统一了风格。

## 第三步：注册路由

打开 `src/App.tsx`，添加两行代码：

1.  **导入页面**：
    ```tsx
    import MyNewNote from "@/pages/notes/MyNewNote";
    ```
2.  **添加路由**：
    ```tsx
    <Route path="/notes/my-new-note" component={MyNewNote} />
    ```

## 第四步：部署

运行 `npm run deploy`。
以后您只需在 GitHub 上编辑 Markdown 文件，网站内容就会自动更新！
