# 如何添加 PDF 引用 (PDF Reference)

本指南介绍如何在网站中添加一个 PDF 引用链接，使用户可以直接在网页内预览 GitHub 上的 PDF 文件，而无需下载。

## 1. 准备 GitHub 链接

1.  在 GitHub 上找到您想要引用的 PDF 文件。
2.  复制浏览器地址栏中的 URL（支持 `blob` 预览链接或 `raw` 直链）。
    *   例如 (Blob): `https://github.com/IDontGetAI/Civil/blob/main/doc.pdf`
    *   例如 (Raw): `https://raw.githubusercontent.com/IDontGetAI/Civil/main/doc.pdf`

## 2. 构造跳转链接

网站内置了一个通用的 PDF 预览页面 `/pdf`。您需要构造一个带有查询参数的链接跳转到该页面。

**基本格式：**
`/pdf?src={PDF链接}&title={页面标题}&back={返回路径}&backLabel={返回按钮文字}`

建议使用 `encodeURIComponent` 对参数值进行编码，以避免 URL 解析错误。

## 3. 参数说明

| 参数名 | 必填 | 说明 | 默认值 |
| :--- | :--- | :--- | :--- |
| `src` | 是 | PDF 文件的 GitHub 链接 (支持 blob 或 raw 链接) | - |
| `title` | 否 | 预览页面的标题 (显示在浏览器标签页和页面顶部) | "PDF" |
| `back` | 否 | 点击左上角“返回”按钮时跳转的路径 | "/cse" |
| `backLabel` | 否 | “返回”按钮显示的文字 | "返回" |

## 4. 示例代码

在您的组件文件（例如 `src/pages/cse.tsx` 或其他页面）中：

```tsx
// 1. 定义 PDF 链接
const PDF_URL = "https://github.com/IDontGetAI/Civil/blob/main/path/to/file.pdf";

// 2. 构造链接对象 (例如在 links 数组中)
{
  title: "参考书目 PDF",
  // 使用 encodeURIComponent 确保 URL 安全
  url: `/pdf?src=${encodeURIComponent(PDF_URL)}&title=参考书目&back=/cse&backLabel=返回公考页`,
  type: "Book"
}
```

或者在 JSX 中直接使用 `<Link>` 或 `<a>` 标签：

```tsx
import { Link } from "wouter";

<Link href={`/pdf?src=${encodeURIComponent(PDF_URL)}&title=文档预览`}>
  <a className="text-blue-500 hover:underline">点击查看 PDF</a>
</Link>
```

## 5. 部署

运行 `npm run deploy` 更新网站。
