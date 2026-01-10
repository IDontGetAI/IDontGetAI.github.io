# 📝 如何添加 GitHub 笔记 (详细教程)

这个教程教你如何把 GitHub 上的 Markdown (`.md`) 文件变成网站里的一篇漂亮笔记。

需要动三个地方：
1.  **新建一个文件** (用来显示笔记)
2.  **修改 `App.tsx`** (告诉网站有这个新页面)
3.  **修改学科页** (把入口链接加进去)

别怕，按步骤来，全是复制粘贴！

---

## 🛠️ 第一步：获取笔记的 Raw 链接

1. 在 GitHub 上找到你的 `.md` 笔记文件。
2. 点击文件右上角的 **"Raw"** 按钮。
3. 复制浏览器地址栏里的链接。
   * 链接应该是以 `https://raw.githubusercontent.com/...` 开头的。

---

## 📄 第二步：新建笔记页面文件

1. 在 `src/pages/notes/` 文件夹里，找到对应的学科文件夹（比如 `cse` 是公考，`ai` 是人工智能）。
2. **复制**一个现有的文件（例如 `dataAnalysis.tsx`），并**重命名**为你的新文件名（只能用英文，例如 `myNewNote.tsx`）。
3. 打开这个新文件，把里面的内容**全部删掉**，粘贴下面的代码：

```tsx
import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";

// 👇 1. 把这里换成你第一步复制的链接
const RAW_URL = "https://raw.githubusercontent.com/.../你的笔记.md";

// 👇 2. 把 MyNewNote 改成你的文件名字 (首字母大写，不要后缀)
export default function MyNewNote() {
  return (
    <RemoteNoteLayout
      title="这里写笔记的大标题"
      subtitle="这里写副标题 (可选)"
      rawUrl={RAW_URL}
      backLink="/cse"       // 👈 3. 返回哪里？公考填 /cse，AI填 /ai
      backLabel="返回公考页" // 👈 4. 按钮文字
    />
  );
}
```

---

## 🛣️ 第三步：注册路由 (告诉网站有新页面)

1. 打开 `src/App.tsx` 文件。
2. 头部引入新页面：
   * 找到一大堆 `import` 的地方，加一行：
   ```tsx
   import MyNewNote from "@/pages/notes/cse/myNewNote"; // 👈 记得改路径和名字
   ```
3. 底部注册路径：
   * 向下滚动，找到 `<Switch>` 标签包裹的一堆 `<Route ... />`。
   * 在类似的地方加一行：
   ```tsx
   <Route path="/notes/cse/my-new-note" component={MyNewNote} />
   ```
   * **注意**：`/notes/cse/my-new-note` 这个就是你这篇笔记的**网址**，等会要用。

---

## 🔗 第四步：添加入口链接

最后，我们要把这个笔记的入口加到学科目录页里。

1. 打开学科文件（例如 `src/pages/cse.tsx`）。
2. 找到 `const notes` 部分。
3. 在 `links: [` 里添加一行代码：

```javascript
{ title: "显示的标题", url: "/notes/cse/my-new-note" },
```
* **注意**：这里的 `url` 必须和**第三步**里填写的 `path` 一模一样！

---

## ✅ 检查清单

- [ ] Raw 链接是不是以 `raw` 开头？
- [ ] 页面文件名 (`MyNewNote`) 和代码里的函数名 (`function MyNewNote`) 是不是一致？
- [ ] `App.tsx` 里是不是既 `import` 了，又加 `<Route>` 了？
- [ ] 学科页里的链接地址是不是和 `App.tsx` 里的 `path` 一样？

如果都对，刷新网页，你的笔记应该就出现了！🎉
