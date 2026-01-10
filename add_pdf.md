# 📄 如何添加 PDF 到网站 (小白保姆级教程)

本教程包含两种 PDF：
1. **GitHub 上的 PDF** (需要特殊处理)
2. **普通网站的 PDF** (如 icourse.club, stanford.edu 等)

别担心，**方法是完全一样的**！只要按照下面的步骤“填空”即可。

---

## 🛠️ 第一步：获取 PDF 链接

### 情况 A：PDF 在 GitHub 上
1. 打开 GitHub 文件页面。
2. 点击右上角的 **"Raw"** 按钮（或者直接点击 Download 也可以）。
3. 复制浏览器地址栏里的链接。
   * 看起来像这样：`https://raw.githubusercontent.com/.../file.pdf`
   * 或者这样：`https://github.com/.../blob/.../file.pdf` (也没问题，系统会自动处理！)

### 情况 B：PDF 在普通网站上
1. 直接复制以 `.pdf` 结尾的网址。
   * 看起来像这样：`https://example.com/books/guide.pdf`

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
   * 正确示范：`encodeURIComponent("https://raw.github.../file.pdf")`
2. **对应的页面英文名**：
   * 公考页填：`/cse`
   * AI 页填：`/ai`
   * 物理页填：`/physics`
   * 数学页填：`/math`
3. **返回按钮文字**：例如 "返回公考页" 或 "Back"。

---

## 📝 第三步：粘贴到文件里

1. 找到对应的学科文件（例如 `src/pages/cse.tsx`）。
2. 搜索 `const resources`（按 Ctrl+F 搜索）。
3. 找到 `links: [` 这一行。
4. 把第二步改好的代码，**粘贴到 `links: [` 的下面**。

### 举个栗子 🌰

假设我要把一本 GitHub 上的《申论秘籍》加到公考页：

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
    url: `/pdf-viewer?src=${encodeURIComponent("https://github.com/.../shenlun.pdf")}&title=申论秘籍&back=/cse&backLabel=返回`, 
    type: "Book" 
  },
  { title: "某某视频", url: "...", type: "Video" }
]
```

---

## ❓ 常见问题

*   **Q: 链接里有 `%` 这种奇怪的符号怎么办？**
    *   A: 只要这行代码是红色的（在引号里），就没事，直接粘！

*   **Q: 网页打不开了？**
    *   A: 检查一下是不是**少复制了逗号 `,`**？每个 `{ ... },` 后面通常都要有个逗号。

*   **Q: 普通网站的 PDF 能看吗？**
    *   A: 能！这就是这个“万能代码”的厉害之处。就算网站有跨域限制，系统也会自动尝试用直连模式打开。


---

## 🌰 根据你的要求，这里有三个实战示例 (Examples)

你可以直接复制下面的代码，然后放到 `links: [...]` 里面。

### 1. 普通网站 PDF (icourse.club)
**原始链接：** `https://www.icourse.club/uploads/files/193e0e79ccf6ba466e8ea8a5f1218473022773b8.pdf`

```javascript
{ 
  title: "普通网站 PDF 示例", 
  url: `/pdf-viewer?src=${encodeURIComponent("https://www.icourse.club/uploads/files/193e0e79ccf6ba466e8ea8a5f1218473022773b8.pdf")}&title=普通PDF&back=/cse&backLabel=返回`, 
  type: "Book" 
},
```

### 2. GitHub 页面链接 (Blob)
**原始链接：** `https://github.com/IDontGetAI/Civil/blob/main/01_%E8%A8%80%E8%AF%AD%E7%90%86%E8%A7%A3%E4%B8%8E%E8%A1%A8%E8%BE%BE/01_%E9%83%AD%E7%86%99%E8%A8%80%E8%AF%AD%E7%B2%BE%E8%AE%B2%E7%B2%BE%E7%82%BC.pdf`

```javascript
{ 
  title: "GitHub 页面链接示例", 
  url: `/pdf-viewer?src=${encodeURIComponent("https://github.com/IDontGetAI/Civil/blob/main/01_%E8%A8%80%E8%AF%AD%E7%90%86%E8%A7%A3%E4%B8%8E%E8%A1%A8%E8%BE%BE/01_%E9%83%AD%E7%86%99%E8%A8%80%E8%AF%AD%E7%B2%BE%E8%AE%B2%E7%B2%BE%E7%82%BC.pdf")}&title=GitHub页面链接&back=/cse&backLabel=返回`, 
  type: "Book" 
},
```

### 3. GitHub 原始链接 (Raw)
**原始链接：** `https://raw.githubusercontent.com/IDontGetAI/Civil/refs/heads/main/01_%E8%A8%80%E8%AF%AD%E7%90%86%E8%A7%A3%E4%B8%8E%E8%A1%A8%E8%BE%BE/01_%E9%83%AD%E7%86%99%E8%A8%80%E8%AF%AD%E7%B2%BE%E8%AE%B2%E7%B2%BE%E7%82%BC.pdf`

```javascript
{ 
  title: "GitHub Raw 链接示例", 
  url: `/pdf-viewer?src=${encodeURIComponent("https://raw.githubusercontent.com/IDontGetAI/Civil/refs/heads/main/01_%E8%A8%80%E8%AF%AD%E7%90%86%E8%A7%A3%E4%B8%8E%E8%A1%A8%E8%BE%BE/01_%E9%83%AD%E7%86%99%E8%A8%80%E8%AF%AD%E7%B2%BE%E8%AE%B2%E7%B2%BE%E7%82%BC.pdf")}&title=GitHubRaw链接&back=/cse&backLabel=返回`, 
  type: "Book" 
},
```

搞定！🎉
