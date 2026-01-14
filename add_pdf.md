# 📄 添加 PDF 文档指南

本指南介绍如何在学科页面中集成 PDF 阅读功能。

---

## 核心原理

网站使用内置的 `PdfViewer` 组件。它优先使用 `fetch` + `Blob` 方式加载 PDF 以支持下载功能；如果跨域失败，会自动降级使用 `iframe` 直接加载。

## 操作步骤

### 1. 获取 PDF 链接
支持 GitHub 文件链接或普通的 PDF 直链。
*   **GitHub**: `https://github.com/User/Repo/blob/main/book.pdf`
*   **Direct**: `https://course.edu/slides.pdf`

### 2. 构造配置对象
打开对应的页面配置文件（如 `src/pages/Math.tsx`），在 `resources` 列表中添加以下对象。

**请务必严格遵守以下格式（每个属性占一行）：**

```typescript
{
  title: "文档标题",
  url: `/pdf-viewer?src=${encodeURIComponent("你的PDF链接")}&title=预览标题&back=/math`,
  type: "Book",
},
```

### 3. 参数详解

| 参数 | 说明 | 示例 |
| :--- | :--- | :--- |
| `src` | **[必填]** PDF 的 URL，**必须**使用 `encodeURIComponent` 包裹。 | `encodeURIComponent("https://...")` |
| `title` | **[可选]** 预览页顶部标题。 | `&title=线性代数讲义` |
| `back` | **[可选]** 返回按钮跳转的路由。 | `&back=/math` |
| `backLabel` | **[可选]** 返回按钮的文字。 | `&backLabel=Back` |

---

## ✅ 示例代码

假设你想在数学页面添加一本微积分教材：

```typescript
// src/pages/Math.tsx

const resources: ContentData<ResourceItem> = [
  // ... 其他资源
  {
    title: "Thomas' Calculus (PDF)",
    content: "经典的微积分入门教材。",
    links: [
      {
        title: "在线阅读",
        url: `/pdf-viewer?src=${encodeURIComponent("https://github.com/Lib/Books/blob/main/calculus.pdf")}&title=ThomasCalculus&back=/math`,
        type: "Book",
      },
    ],
  },
];
```
