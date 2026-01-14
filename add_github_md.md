# 📝 添加 Markdown 笔记指南

本指南介绍如何在学科页面中引用 GitHub 上的 Markdown 笔记。

---

## 核心原理

网站使用内置的 `MarkdownViewer` 组件来渲染 Markdown。你不需要将 `.md` 文件直接放入 `src` 目录，而是通过 URL 参数引用远程文件。

## 操作步骤

### 1. 获取 Markdown 链接
在 GitHub 上找到你想展示的笔记文件（例如 `notes.md`），直接复制浏览器地址栏的 URL。
*   **支持格式**: `https://github.com/User/Repo/blob/main/path/to/notes.md`
*   **无需 Raw**: 系统会自动转换 Blob 链接为 Raw 链接。

### 2. 构造配置对象
打开对应的页面配置文件（如 `src/pages/AI.tsx`），在 `notes` 或 `items` 列表中添加以下对象。

**请务必严格遵守以下格式（每个属性占一行）：**

```typescript
{
  title: "笔记标题 (显示在卡片上)",
  url: `/note-viewer?src=${encodeURIComponent("你的GitHub链接")}&title=页面内标题&back=/ai&backLabel=返回",
},
```

### 3. 参数详解

| 参数 | 说明 | 示例 |
| :--- | :--- | :--- |
| `src` | **[必填]** 笔记的远程 URL，必须使用 `encodeURIComponent` 包裹。 | `encodeURIComponent("https://...")` |
| `title` | **[可选]** 阅读器顶部显示的标题。 | `&title=深度学习基础` |
| `back` | **[可选]** 返回按钮跳转的路由。 | `&back=/ai` |
| `backLabel` | **[可选]** 返回按钮的文字。 | `&backLabel=返回AI主页` |

---

## ✅ 示例代码

假设你想在 AI 页面添加一篇关于 Transformer 的笔记：

```typescript
// src/pages/AI.tsx

const notes: ContentData<NoteItem> = [
  // ... 其他笔记
  {
    title: "Transformer 架构详解",
    content: "深入理解 Attention Is All You Need 论文细节。",
    tags: ["NLP", "Deep Learning"],
    link: `/note-viewer?src=${encodeURIComponent("https://github.com/MyRepo/Notes/blob/main/transformer.md")}&title=Transformer详解&back=/ai`,
  },
];
```
