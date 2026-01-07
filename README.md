# IDontGetAI | 个人数字思维空间

![Project Banner](src/assets/hero.jpeg)

这是一个基于 **React** 和 **Vite** 构建的现代化个人知识库网站。
采用 **"Cognitive Glitch" (认知故障)** 设计风格，结合黑客终端美学与抽象哲学元素，旨在展示跨学科的学习笔记与思维模型。

## 🚀 技术栈

*   **核心框架**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **UI 系统**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
*   **路由**: [wouter](https://github.com/molefrog/wouter) (Hash 模式，完美兼容 GitHub Pages)
*   **动画**: Framer Motion + Tailwind Animate
*   **图标**: Lucide React

## 📂 目录结构

```
idontgetai-website/
├── src/
│   ├── pages/              # 页面内容（在此处修改文字和数据）
│   │   ├── Home.tsx        # 主页 (黑客档案)
│   │   ├── AI.tsx          # 人工智能
│   │   ├── Math.tsx        # 数学
│   │   ├── Physics.tsx     # 物理
│   │   ├── Humanities.tsx  # 人文社科
│   │   ├── Philosophy.tsx  # 哲学
│   │   ├── Psychology.tsx  # 心理学
│   │   ├── Economics.tsx   # 经济学
│   │   └── Tools.tsx       # 工具库
│   ├── components/         # UI 组件
│   │   ├── TerminalNavbar.tsx  # 顶部终端导航
│   │   └── ...
│   └── assets/             # 背景图片资源
├── public/                 # 静态资源
├── package.json            # 项目配置
└── DEPLOY.md               # 详细部署指南
```

## 🛠️ 本地开发

1.  **安装依赖**:
    ```bash
    npm install
    ```

2.  **启动开发服务器**:
    ```bash
    npm run dev
    ```
    打开浏览器访问 `http://localhost:5173` 即可预览。

## 📝 内容管理

网站采用**数据驱动**的架构。要修改内容，无需懂复杂的 React 代码，只需编辑对应页面的**数据数组**。

**示例：添加一条新的 AI 笔记**
1. 打开 `src/pages/AI.tsx`
2. 找到 `const notes = [...]` 数组。
3. 按照现有格式添加新对象：
   ```typescript
   {
     title: "新笔记标题",
     content: "笔记内容...",
     date: "2026-01-01",
     tags: ["Tag1", "Tag2"]
   },
   ```
4. 保存文件，网站会自动更新。

## 🚢 部署上线

本项目已配置自动化脚本，支持一键部署到 GitHub Pages。
详情请阅读根目录下的 [**DEPLOY.md**](./DEPLOY.md) 文件。

## ✨ v5.0 版本特性

1.  **原生 Markdown 引擎**:
    *   集成 `markdown-it` + `markdown-it-texmath` + `highlight.js`。
    *   支持 LaTeX 数学公式 (`$E=mc^2$`) 和代码高亮。
    *   支持 Typora 主题样式 (Cogito)。

2.  **无头 CMS 模式 (Remote Notes)**:
    *   支持直接从 GitHub 仓库加载 Markdown 文件。
    *   只需更新 GitHub 笔记库，网站内容自动同步。
    *   详见 [**add_note.md**](./add_note.md)。

3.  **极简历史时间轴**:
    *   各学科页面新增 Minimalist History 板块，展示学科发展里程碑。

4.  **沉浸式阅读体验**:
    *   笔记详情页采用磨砂玻璃风格 + 极简暗色背景，提供专注的阅读环境。
