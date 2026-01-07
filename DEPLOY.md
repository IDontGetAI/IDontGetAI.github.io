# 网站部署指南 (傻瓜式教程)

本指南将教你如何将网站从零开始部署到 GitHub Pages，让全世界都能访问。

## ⚠️ 核心前置条件
在开始之前，请务必检查以下两点，否则后续步骤**一定会报错**：

1.  **必须安装 Node.js**
    *   打开终端（CMD 或 PowerShell），输入 `node -v`。
    *   如果不显示版本号，请去 [Node.js 官网](https://nodejs.org/) 下载安装 LTS 版本。
    *   **安装完必须重启电脑**或重启所有终端窗口。

2.  **必须进入正确目录**
    *   解压后，请确保你的终端路径下能看到 `package.json` 文件。
    *   如果运行 `npm install` 报错 `ENOENT`，说明你可能多套了一层文件夹。请用 `cd idontgetai-website` 进入下一层。

---

## 第一阶段：本地环境配置

1.  **打开终端**
    在项目文件夹内，右键选择 "Open in Terminal" (在终端打开) 或 "Open PowerShell window here"。

2.  **安装依赖**
    复制并运行以下命令（这一步会下载所有需要的工具）：
    ```bash
    npm install
    ```
    *(等待进度条跑完，如果不报错就成功了)*

---

## 第二阶段：连接 GitHub

1.  **创建远程仓库**
    *   登录 [GitHub](https://github.com/)。
    *   点击右上角 `+` 号 -> **New repository**。
    *   Repository name 填一个名字（如 `my-knowledge-base`）。
    *   **不要勾选** Initialize with README/License 等选项，直接点击 **Create repository**。
    *   复制页面上的 HTTPS 地址 (例如: `https://github.com/YourName/my-knowledge-base.git`)。

2.  **初始化并上传代码**
    回到终端，依次运行以下命令（**每行运行一次**）：

    ```bash
    # 1. 初始化 Git
    git init
    
    # 2. 添加所有文件
    git add .
    
    # 3. 提交存档
    git commit -m "Initial commit"
    
    # 4. 关联远程仓库 (⚠️ 把下面的地址换成你刚才复制的！)
    git remote add origin https://github.com/你的用户名/你的仓库名.git
    
    # 5. 推送代码 (强制覆盖，避免冲突)
    git branch -M main
    git push -u origin main -f
    ```

---

## 第三阶段：一键发布上线 🚀

这是最关键的一步。只要你完成了上面的步骤，以后更新网站只需要运行这一条命令：

```bash
npm run deploy
```

**这个命令会自动执行以下魔法：**
1.  **Build**: 把你的代码编译成网页文件（生成 `dist` 文件夹）。
2.  **Deploy**: 把 `dist` 文件夹的内容自动上传到 GitHub 的 `gh-pages` 分支。

*(如果出现 "Published" 字样，说明成功！)*

---

## 第四阶段：开启访问

1.  回到 GitHub 仓库页面，点击 **Settings** (设置)。
2.  在左侧栏找到 **Pages**。
3.  **Build and deployment** -> **Source** 保持默认 `Deploy from a branch`。
4.  **Branch** 必须选择 **`gh-pages`** (注意：**不是** main)。
5.  点击 **Save**。

稍等 1-2 分钟，刷新页面，顶部会出现一个绿色的网址（如 `https://yourname.github.io/repo/`）。点击它，你的网站就上线了！

---

## 📅 日后如何更新内容？

当你修改了笔记或添加了新工具后：

1.  **保存代码** (可选，为了存档):
    ```bash
    git add .
    git commit -m "V6.10"
    git push
    ```

2.  **更新网站** (必需):
    ```bash
    npm run deploy
    ```
