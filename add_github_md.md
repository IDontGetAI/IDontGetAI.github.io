# 📝 如何添加 GitHub 笔记 (新版·极简)

本教程教你如何添加 GitHub 上的 Markdown 笔记。
方法和添加 PDF 一模一样！

---

## 🛠️ 第一步：获取笔记链接 (超级简单)

1. 在 GitHub 上找到你的 `.md` 笔记文件。
2. **直接复制浏览器地址栏里的链接**。
   * 就像这样：`https://github.com/IDontGetAI/Civil/blob/main/shenlun.md`
   * **不需要** 去找什么 Raw 按钮了，系统会自动帮你处理！😎

---

## ✂️ 第二步：使用“万能代码”

请直接复制下面的代码块。你只需要修改 **中文部分**。

```javascript
{ 
  title: "这里写标题", 
  url: `/note-viewer?src=${encodeURIComponent("这里粘贴你的笔记链接")}&title=这里再写一遍标题&back=/对应的页面英文名&backLabel=返回按钮文字` 
},
```

### 📝 填空说明：
1. **这里粘贴你的笔记链接**：把第一步复制的链接粘贴进去。
   * **⚠️ 注意**：必须保留 `encodeURIComponent("...")`，一定要放在双引号里面。
2. **对应的页面英文名**：
   * 公考页填：`/cse`
   * AI 页填：`/ai`
   * 物理页填：`/physics`
   * 数学页填：`/math`
3. **返回按钮文字**：例如 "返回公考页" 或 "Back"。

---

## 📝 第三步：粘贴到文件里

1. 找到对应的学科文件（例如 `src/pages/cse.tsx`）。
2. 搜索 `const notes`。
3. 找到 `links: [` 这一行。
4. 把改好的代码粘贴进去。

### 举个栗子 🌰

假设我要添加一篇《申论技巧》：

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
    title: "申论技巧", 
    url: `/note-viewer?src=${encodeURIComponent("https://github.com/IDontGetAI/Civil/blob/main/shenlun.md")}&title=申论技巧&back=/cse&backLabel=返回`,
    type: "Book" 
  },
  { title: "某某视频", 
  url: "...", 
  type: "Video" }
]
```

搞定！🎉
