# 如何添加资料列表 (References)

本指南介绍如何添加一个新的资料详情页（例如书籍、视频、论文列表）。

## 1. 创建页面文件
在 `src/pages/refs/{学科}/` 目录下创建一个新的 `.tsx` 文件。
例如：`src/pages/refs/ai/DeepLearningRefs.tsx`

复制以下模板并修改：

```tsx
import { ResourceDetailLayout, type ResourceDetailItem } from "@/components/ResourceDetailLayout";

const resources: ResourceDetailItem[] = [
  {
    title: "Deep Learning (花书)",
    url: "https://www.deeplearningbook.org/",
    type: "Book", // 可选: Book, Video, Course, Article, Tool, Paper, Website
    author: "Ian Goodfellow et al.",
    description: "深度学习领域的圣经，涵盖了数学基础到前沿模型。"
  },
  {
    title: "CS231n 计算机视觉",
    url: "http://cs231n.stanford.edu/",
    type: "Course",
    author: "Stanford / Li Fei-Fei",
    description: "斯坦福经典课程，CNN 入门必修。"
  }
];

export default function DeepLearningRefs() {
  return (
    <ResourceDetailLayout
      title="Deep Learning Resources"
      subtitle="核心书籍与课程推荐"
      resources={resources}
      backLink="/ai"
      backLabel="返回 AI 主页"
    />
  );
}
```

## 2. 注册路由
打开 `src/App.tsx`：

1.  **导入组件**：
    ```tsx
    import DeepLearningRefs from "@/pages/refs/ai/DeepLearningRefs";
    ```
2.  **添加路由**：
    ```tsx
    <Route path="/refs/ai/dl" component={DeepLearningRefs} />
    ```

## 3. 添加入口链接
打开对应的学科主页文件（例如 `src/pages/AI.tsx`），在 `resources` 数据中添加链接：

```tsx
links: [
  { title: "资源列表", url: "/refs/ai/dl" } // <--- 这里对应 App.tsx 中的 path
]
```

## 4. 部署
运行 `npm run deploy`。
