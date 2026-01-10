# 📄 如何添加 PDF 到网站 (小白保姆级教程)

本教程教你如何添加 PDF（支持 GitHub 和普通网站）。

---

## 🛠️ 第一步：获取 PDF 链接

### 情况 A：PDF 在 GitHub 上 (超级简单)
1. 打开 GitHub 上的 PDF 文件页面。
2. **直接复制浏览器地址栏里的链接**。
   * 就像这样：`https://github.com/IDontGetAI/Civil/blob/main/shenlun.pdf`
   * **不需要** 去找什么 Raw 按钮了，系统会自动帮你处理！😎

### 情况 B：PDF 在普通网站上
1. 直接复制以 `.pdf` 结尾的网址。
   * 例如：`https://example.com/books/guide.pdf`

---

## ✂️ 第二步：使用“万能代码”

请直接复制下面的代码块。你只需要修改 **中文部分**。

```javascript
{ 
  title: "这里写标题 (例如: 线性代数讲义)", 
  url: `/pdf-viewer?src=${encodeURIComponent("这里粘贴你的PDF链接")}&title=这里再写一遍标题&back=/对应的页面英文名&backLabel=返回按钮文字`, 
  type: "Book" 
},
```

### 📝 填空说明：
1. **这里粘贴你的PDF链接**：把第一步复制的链接粘贴进去。
   * **⚠️ 注意**：必须保留外面的双引号 `""` 和 `encodeURIComponent(...)`。
2. **对应的页面英文名**：
   * 公考页填：`/cse`
   * AI 页填：`/ai`
   * 物理页填：`/physics`
   * 数学页填：`/math`
3. **返回按钮文字**：例如 "返回公考页" 或 "Back"。

---

## 📝 第三步：粘贴到文件里

1. 找到对应的学科文件（例如 `src/pages/cse.tsx`）。
2. 搜索 `const resources`。
3. 找到 `links: [` 这一行。
4. 把改好的代码，**粘贴到 `links: [` 的下面**。

### 举个栗子 🌰

假设我要添加一本《申论秘籍》：

**修改前：**
```javascript
links: [
  { title: "某某视频", url: "...", type: "Video" }
]
```

**修改后（加入了新代码）：**
```javascript
links: [
  { 
    title: "申论秘籍 (PDF)", 
    url: `/pdf-viewer?src=${encodeURIComponent("https://github.com/IDontGetAI/Civil/blob/main/shenlun.pdf")}&title=申论秘籍&back=/cse&backLabel=返回`, 
    type: "Book" 
  },
  { title: "某某视频", url: "...", type: "Video" }
]
```
