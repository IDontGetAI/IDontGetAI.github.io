import { SubjectPageLayout, type ContentData, type NoteItem, type ResourceItem, type InsightItem } from "@/components/SubjectPageLayout";
import mathBg from "@/assets/math.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 分析学 (Analysis)",
    items: [
      {
        title: "数学分析 (Mathematical Analysis)",
        content: "极限理论是分析学的基石。一元函数微分学包括导数定义、中值定理、泰勒展开。",
        date: "2026-01-06",
        tags: ["Calculus", "Limits"],
        links: [
            { title: "一元函数微分学笔记", url: "/math/analysis-note" },
            { title: "笔记2 (待添加)", url: "/notes/math/analysis-placeholder-2" }
        ]
      },
      {
        title: "实分析 (Real Analysis)",
        content: "测度论与勒贝格积分。解决了黎曼积分处理极限交换时的缺陷。实数完备性的深入讨论。",
        date: "2025-10-12",
        tags: ["MeasureTheory", "Lebesgue"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/math/real-analysis-1" },
            { title: "笔记2 (待添加)", url: "/notes/math/real-analysis-2" }
        ]
      },
      {
        title: "复分析 (Complex Analysis)",
        content: "柯西-黎曼方程 (CR Equations) 描述了复可微函数的条件。留数定理 (Residue Theorem) 将围道积分转化为代数运算，优美而强大。",
        date: "2025-11-05",
        tags: ["ComplexFunctions", "Residue"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/math/complex-1" },
            { title: "笔记2 (待添加)", url: "/notes/math/complex-2" }
        ]
      },
      {
        title: "泛函分析 (Functional Analysis)",
        content: "无限维空间中的线性代数。巴拿赫空间 (Banach) 与希尔伯特空间 (Hilbert)。算子谱理论。",
        date: "2025-12-01",
        tags: ["HilbertSpace", "Operators"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/math/functional-1" },
            { title: "笔记2 (待添加)", url: "/notes/math/functional-2" }
        ]
      },
      {
        title: "微分方程 (Differential Equations)",
        content: "描述变化率的方程。常微分方程 (ODE) 与偏微分方程 (PDE) 支配着物理世界的演化。",
        date: "2026-01-10",
        tags: ["ODE", "PDE"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/math/ode-pde-1" },
            { title: "笔记2 (待添加)", url: "/notes/math/ode-pde-2" }
        ]
      },

    ]
  },
  {
    category: "II. 代数学 (Algebra)",
    items: [
      {
        title: "线性代数 (Linear Algebra)",
        content: "向量空间与线性变换。SVD 分解 (A = UΣV^T) 揭示了矩阵的几何本质。特征值分解用于提取主成分。",
        date: "2025-09-15",
        tags: ["Matrix", "SVD"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/math/linear-algebra-1" },
            { title: "笔记2 (待添加)", url: "/notes/math/linear-algebra-2" }
        ]
      },
      {
        title: "抽象代数 (Abstract Algebra)",
        content: "研究代数结构：群 (Group)、环 (Ring)、域 (Field)。群论研究对称性，伽罗瓦理论证明了五次方程无根式解。",
        date: "2025-11-20",
        tags: ["GroupTheory", "Symmetry"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/math/abstract-algebra-1" },
            { title: "笔记2 (待添加)", url: "/notes/math/abstract-algebra-2" }
        ]
      }
    ]
  },
  {
    category: "III. 几何学 (Geometry)",
    items: [
      {
        title: "拓扑学 (Topology)",
        content: "橡皮泥几何学。研究连续变形下保持不变的性质。同胚与同伦。欧拉示性数。",
        date: "2025-12-15",
        tags: ["Topology", "Manifolds"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/math/topology-1" },
            { title: "笔记2 (待添加)", url: "/notes/math/topology-2" }
        ]
      },
      {
        title: "微分几何 (Differential Geometry)",
        content: "在流形上做微积分。曲率 (Curvature) 的内在定义。广义相对论的数学基础。",
        date: "2026-01-05",
        tags: ["Curvature", "Manifolds"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/math/diff-geometry-1" },
            { title: "笔记2 (待添加)", url: "/notes/math/diff-geometry-2" }
        ]
      }
    ]
  }
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 分析学 (Analysis)",
    items: [
      {
        title: "Principles of Mathematical Analysis (Rudin)",
        url: "https://web.math.ucsb.edu/~walter/math117_f16/rudin.pdf",
        type: "Book",
        description: "Baby Rudin，分析学圣经，风格严谨简练。"
      },
      {
        title: "Visual Complex Analysis",
        url: "#",
        type: "Book",
        description: "Needham 的名著，用几何直觉理解复分析。"
      }
    ]
  },
  {
    category: "II. 代数学 (Algebra)",
    items: [
      {
        title: "3Blue1Brown: Essence of Linear Algebra",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
        type: "Course",
        description: "直观理解线性代数的几何意义，神作。"
      },
      {
        title: "Introduction to Linear Algebra (Gilbert Strang)",
        url: "https://math.mit.edu/~gs/linearalgebra/",
        type: "Book",
        description: "MIT 经典教材，配合公开课食用更佳。"
      },
      {
        title: "A Book of Abstract Algebra (Pinter)",
        url: "#",
        type: "Book",
        description: "优秀的抽象代数入门，循循善诱。"
      }
    ]
  },
  {
    category: "III. 几何学 (Geometry)",
    items: [
      {
        title: "Differential Geometry of Curves and Surfaces",
        url: "#",
        type: "Book",
        description: "do Carmo 的经典微分几何教材。"
      }
    ]
  }
];

const insights: InsightItem[] = [
  {
    title: "数学是宇宙的接口",
    content: "物理学描述宇宙的现象，而数学描述宇宙的逻辑。所有的物理定律最终都坍缩为微分方程。如果不理解数学，就只能看到世界的表象。",
    date: "2025-11-01"
  },
  {
    title: "抽象的力量",
    content: "代数学通过抽象忽略细节，只保留结构（如群论）。这种抽象让我们能发现看似不相关的领域（如晶体结构和方程的解）之间深层的同构性。",
    date: "2025-12-20"
  },
  {
    title: "高维空间的直觉",
    content: "在高维空间中，大部分体积都集中在球壳表面，而不是球心。这种“维数灾难”与我们的三维直觉完全相反，但这解释了为什么高维数据可以被线性分割。",
    date: "2026-01-05"
  }
];

export default function MathPage() {
  return (
    <SubjectPageLayout
      title="Mathematics"
      subtitle="抽象逻辑与形式系统的纯粹之美"
      backgroundImage={mathBg}
      
      notes={notes}
      resources={resources}
      insights={insights}
      history={[
        { year: "300 BC", event: "Euclid: Elements" },
        { year: "820", event: "Al-Khwarizmi: Algebra" },
        { year: "1687", event: "Newton & Leibniz: Calculus" },
        { year: "1748", event: "Euler: Analysis of the Infinite" },
        { year: "1832", event: "Galois Theory" },
        { year: "1854", event: "Riemann Geometry (Non-Euclidean)" },
        { year: "1874", event: "Cantor: Set Theory" },
        { year: "1900", event: "Hilbert's 23 Problems" },
        { year: "1931", event: "Gödel's Incompleteness Theorems" },
        { year: "1994", event: "Wiles proves Fermat's Last Theorem" }
      ]}
    />
  );
}
