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

网站采用**数据驱动**的架构。要修改内容，无需懂复杂的 React 代码。我们为不同类型的内容准备了详细的**小白保姆级教程**：

*   📄 **添加 PDF 资源** (GitHub/普通链接): [**add_pdf.md**](./add_pdf.md)
*   📝 **添加 GitHub 笔记** (Markdown): [**add_github_md.md**](./add_github_md.md)
*   🧠 **添加每日思考 (Log)**: [**add_log.md**](./add_log.md)
*   📚 **添加远程笔记源**: [**add_note.md**](./add_note.md)

**快速示例：添加一条新的 AI 笔记**
1. 打开 `src/pages/AI.tsx`
2. 找到 `const notes = [...]` 数组。
3. 按照现有格式添加新对象，保存文件即自动更新。

## 🚢 部署上线

本项目已配置自动化脚本，支持一键部署到 GitHub Pages。
详情请阅读根目录下的 [**DEPLOY.md**](./DEPLOY.md) 文件。

## ✨ v6.1 版本特性

1.  **原生 PDF 阅读器集成 (New)**:
    *   **混合加载引擎**: 智能识别 GitHub 链接（自动转 Blob 预览）和普通 PDF 链接（iframe 直连），解决跨域与下载问题。
    *   **沉浸式 UI**: 统一的深色玻璃拟态设计，与主站风格完美融合。
    *   **全平台兼容**: 依托浏览器原生内核，提供极致清晰度和打印/搜索功能。

2.  **增强的内容管理体系**:
    *   新增 `add_github_md.md` 与 `add_pdf.md`，提供“填空式”内容添加体验。
    *   优化路由系统，支持全局 PDF 预览路由 `/pdf-viewer`。

3.  **原生 Markdown 引擎**:
    *   集成 `markdown-it` + `markdown-it-texmath` + `highlight.js`。
    *   支持 LaTeX 数学公式 (`$E=mc^2$`) 和代码高亮。
    *   支持 Typora 主题样式 (Cogito)。

4.  **无头 CMS 模式 (Remote Notes)**:
    *   支持直接从 GitHub 仓库加载 Markdown 文件。
    *   只需更新 GitHub 笔记库，网站内容自动同步。

5.  **极简历史时间轴**:
    *   各学科页面新增 Minimalist History 板块，展示学科发展里程碑。




## Copyright / 版权声明

**Copyright (c) 2026 IDontGetAI. All Rights Reserved.**

The source code, design, and content in this repository are the intellectual property of the owner.
* **Permitted Use:** You may view this code for educational or personal evaluation purposes only.
* **Prohibited Use:** Reproduction, modification, distribution, or use of this code for commercial purposes without prior written permission is strictly prohibited.

**版权所有 (c) 2026 IDontGetAI。保留所有权利。**

本仓库的源代码、设计及内容均为作者的知识产权。
* **允许用途：** 仅允许出于教育或个人评估目的查看本代码。
* **禁止用途：** 未经作者书面许可，严禁将本代码进行复制、修改、分发或用于任何商业用途。