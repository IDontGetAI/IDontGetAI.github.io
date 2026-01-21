# 部署指南 (Deployment Guide)

本项目配置了自动化构建工作流，可以轻松部署到 **GitHub Pages**。

## 📋 前置要求

1.  确保你不仅拥有源码，而且拥有该仓库的 **Write** 权限。
2.  确保本地已安装 `Node.js` 和 `npm`。
3.  确保已启用 GitHub Discussions 并创建用于 Giscus 的分类。

## 💬 Giscus 评论系统配置

### 1. 开启 Discussions 与应用权限
1.  进入 GitHub 仓库 Settings -> General。
2.  勾选 Features 中的 Discussions。
3.  在 Giscus 应用页面授权该仓库访问 Discussions。

### 2. 获取并配置环境变量
在本地创建 `.env.local`（不要提交），并补充以下变量：
```bash
VITE_GISCUS_REPO=owner/repo
VITE_GISCUS_REPO_ID=your_repo_id
VITE_GISCUS_CATEGORY=General
VITE_GISCUS_CATEGORY_ID=your_category_id
```

如果使用 CI/CD 部署，请在对应的 Secrets/Variables 中设置同名变量。

## 🚀 自动部署 (推荐)

我们已经在 `package.json` 中配置了 `gh-pages` 脚本。

### 1. 提交更改
在部署之前，请确保所有更改都已提交到本地 Git 仓库：
```bash
git add .
git commit -m "update: ready to deploy"
```

### 2. 执行部署命令
在项目根目录下运行：
```bash
npm run deploy
```

> **注意**: 这个命令会执行两个动作：
> 1. `npm run build`: 编译 TypeScript 和 React 代码，生成 `dist` 目录。
> 2. `gh-pages -d dist`: 将 `dist` 目录的内容强制推送到远程的 `gh-pages` 分支。

### 3. 设置 GitHub Pages
部署完成后（终端显示 `Published`）：
1. 打开 GitHub 仓库页面。
2. 进入 **Settings** -> **Pages**。
3. 在 **Build and deployment** 下，确保 Branch 选择的是 **`gh-pages`** (root)。
4. 保存后等待几分钟，GitHub 会显示你的网站链接。

## 🛠️ 常见问题

**Q: 部署后打开页面是空白的？**
A: 请检查 `vite.config.ts` 中的 `base` 配置。对于 GitHub Pages，通常需要设置为 `/仓库名/`。如果你的仓库名是 `<username>.github.io`，则 `base` 不需要设置（默认为 `/`）。

**Q: 路由跳转后刷新报 404？**
A: 本项目使用的是 `wouter` 的 Hash 路由模式 (`useHashLocation`)。Hash 路由（URL 中包含 `#`）天然兼容 GitHub Pages，刷新不会 404。如果你修改了路由模式，请务必改回 Hash 模式。
