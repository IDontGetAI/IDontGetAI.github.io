此计划旨在完全移除项目中的 Giscus 评论功能，并清理所有相关代码和样式。

### 1. 删除核心组件文件
- 删除 `src/components/Comments.tsx`
  - 该文件封装了 Giscus 的脚本注入和配置逻辑，是评论功能的核心。

### 2. 移除组件引用
- **修改 `src/components/PdfViewer.tsx`**
  - 删除 `import { Comments } from "@/components/Comments";`
  - 删除 `<Comments mapping="specific" term={title} />` 组件调用。
- **修改 `src/components/RemoteNoteLayout.tsx`**
  - 删除 `import { Comments } from "@/components/Comments";`
  - 删除 `<Comments mapping="specific" term={title} />` 组件调用。

### 3. 清理样式文件
- **修改 `src/index.css`**
  - 移除底部的 Giscus 相关 CSS 样式：
    - `.giscus-container`
    - `.giscus-container::before`
    - `.giscus-container .giscus` 等相关选择器。

### 验证计划
- 确认所有涉及的文件已被识别。
- 修改完成后，将通过构建检查确保没有遗留的死代码或引用错误。
