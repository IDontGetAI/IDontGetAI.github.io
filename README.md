# IDontGetAI: Digital Cognitive Glitch

![Banner](src/assets/hero.jpeg)

**IDontGetAI** 是一个基于 **React 19** 构建的现代化个人知识库。它以独特的 "Cognitive Glitch"（认知故障）为视觉语言，结合终端美学与神经网络可视化，旨在展示跨学科（AI、数学、哲学等）的探索轨迹。

> "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion." — Albert Camus

## 🧬 项目核心

-   **技术栈**: React 19, Vite 7, TypeScript 5, Tailwind CSS v4, shadcn/ui.
-   **设计风格**: Cyberpunk / Glitch Art / Terminal Aesthetic.
-   **内容管理**:
    -   **Remote Markdown**: 直接渲染 GitHub 仓库中的 Markdown 笔记。
    -   **Native PDF**: 内置 PDF 阅读器，支持 GitHub Blob 链接自动解析。
    -   **Data-Driven**: 通过 JSON 配置驱动页面内容，无需修改组件代码。
-   **轻量部署**: 纯静态构建，完美支持 GitHub Pages。

## 🚀 快速开始

### 1. 环境准备
确保你的本地环境已安装 Node.js (推荐 v18+)。

### 2. 安装与启动
```bash
# 获取代码
git clone https://github.com/IDontGetAI/IDontGetAI.github.io.git
cd IDontGetAI.github.io

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```
访问 `http://localhost:5173` 即可预览网站。

## 📂 核心目录

```tree
src/
├── assets/             # 静态资源（背景图、头像）
├── components/         # React 组件
│   ├── MarkdownViewer.tsx  # Markdown 渲染器 (Remote)
│   ├── PdfViewer.tsx   # PDF 阅读器 (iframe/Blob)
│   └── ...
├── pages/              # 学科内容页 (AI, Math, etc.)
│   └── cse.tsx         # 示例：公考/CSE 页面配置
├── lib/ & hooks/       # 工具函数
└── Layout.tsx          # 全局布局
```

## 📝 贡献内容

本项目设计为**零代码修改**即可添加内容。请参考以下指南：

-   [**📄 添加 PDF 文档**](./add_pdf.md)
-   [**📝 添加 Markdown 笔记**](./add_github_md.md)

## Copyright / 版权声明

**Copyright (c) 2026 IDontGetAI. All Rights Reserved.**

The source code, design, and content in this repository are the intellectual property of the owner.
* **Permitted Use:** You may view this code for educational or personal evaluation purposes only.
* **Prohibited Use:** Reproduction, modification, distribution, or use of this code for commercial purposes without prior written permission is strictly prohibited.

**版权所有 (c) 2026 IDontGetAI。保留所有权利。**

本仓库的源代码、设计及内容均为作者的知识产权。
* **允许用途：** 仅允许出于教育或个人评估目的查看本代码。
* **禁止用途：** 未经作者书面许可，严禁将本代码进行复制、修改、分发或用于任何商业用途。
