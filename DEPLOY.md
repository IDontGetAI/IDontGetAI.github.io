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

## 🚀 部署到 Vercel (推荐)

Vercel 是本项目推荐的部署平台，支持 SPA 路由、自动预览和更快的全球访问速度。

### 1. 提交代码到 GitHub
确保你已经将最新的代码（包含 `vercel.json` 和路由修复）推送到 GitHub 仓库的主分支。

```bash
git add .
git commit -m "chore: optimize for vercel deployment"
git push origin main
```

### 2. 在 Vercel 导入项目
1.  登录 [Vercel Dashboard](https://vercel.com/dashboard)。
2.  点击 **"Add New..."** -> **"Project"**。
3.  在 "Import Git Repository" 列表中找到你的仓库 `IDontGetAI.github.io`，点击 **"Import"**。

### 3. 配置环境变量 (Environment Variables)
在部署界面的 **Environment Variables** 区域，你需要填入 Giscus 的配置信息（与本地 `.env.local` 一致）：

| Key | Value 示例 |
| --- | --- |
| `VITE_GISCUS_REPO` | `IDontGetAI/IDontGetAI.github.io` |
| `VITE_GISCUS_REPO_ID` | `R_kgDO...` |
| `VITE_GISCUS_CATEGORY` | `Announcements` |
| `VITE_GISCUS_CATEGORY_ID` | `DIC_kwDO...` |

### 4. 完成部署
点击 **"Deploy"** 按钮。
等待约 1 分钟，构建完成后，Vercel 会提供一个访问链接（例如 `https://your-project.vercel.app`）。

---

## 📦 部署到 GitHub Pages (备选)

> **注意**: 由于项目已切换为 History 路由模式适配 Vercel，如果仍需使用 GitHub Pages，请确保切回 Hash 路由模式。

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

**Q: Vercel 上刷新页面报 404？**
A: 确保根目录下存在 `vercel.json` 文件，并且配置了 `rewrites` 规则指向 `index.html`。

**Q: GitHub Pages 上刷新页面报 404？**
A: GitHub Pages 默认不支持 SPA 的 History 路由。你需要切换回 Hash 路由模式，或者使用 `404.html` 的重定向 Hack 方案。
