import {
  SubjectPageLayout,
  type ContentData,
  type NoteItem,
  type ResourceItem,
  type InsightItem,
} from "@/components/SubjectPageLayout";
import mathBg from "@/assets/math.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 分析学 (Analysis)",
    items: [
      {
        title: "数学分析 (Mathematical Analysis)",
        content:
          "极限理论是分析学的基石。一元函数微分学包括导数定义、中值定理、泰勒展开。",
        date: "2026-01-06",
        tags: ["Calculus", "Limits"],
        links: [
          {
            title: "一元函数微分学笔记",
            url: `/note-viewer?src=${encodeURIComponent("https://raw.githubusercontent.com/IDontGetAI/Notebook_AI/main/01%20%20Mathematical%20Basic/02%20%20Analysis/01%20%20%E6%95%B0%E5%88%97%E6%9E%81%E9%99%90.md")}&title=Mathematical Analysis&back=/math&backLabel=返回数学主页`,
          },
        ],
      },
      {
        title: "实分析 (Real Analysis)",
        content:
          "测度论与勒贝格积分。解决了黎曼积分处理极限交换时的缺陷。实数完备性的深入讨论。",
        date: "2025-10-12",
        tags: ["MeasureTheory", "Lebesgue"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/math/real-1",
          },
        ],
      },
      {
        title: "复分析 (Complex Analysis)",
        content:
          "柯西-黎曼方程 (CR Equations) 描述了复可微函数的条件。留数定理 (Residue Theorem) 将围道积分转化为代数运算，优美而强大。",
        date: "2025-11-05",
        tags: ["ComplexFunctions", "Residue"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/math/complex-1",
          },
        ],
      },
      {
        title: "泛函分析 (Functional Analysis)",
        content:
          "无限维空间中的线性代数。巴拿赫空间 (Banach) 与希尔伯特空间 (Hilbert)。算子谱理论。",
        date: "2025-12-01",
        tags: ["HilbertSpace", "Operators"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/math/functional-1",
          },
        ],
      },
      {
        title: "微分方程 (Differential Equations)",
        content:
          "描述变化率的方程。常微分方程 (ODE) 与偏微分方程 (PDE) 支配着物理世界的演化。",
        date: "2026-01-10",
        tags: ["ODE", "PDE"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/math/de-1",
          },
        ],
      },
    ],
  },
  {
    category: "II. 代数学 (Algebra)",
    items: [
      {
        title: "线性代数 (Linear Algebra)",
        content:
          "向量空间与线性变换。SVD 分解 (A = UΣV^T) 揭示了矩阵的几何本质。特征值分解用于提取主成分。",
        date: "2025-09-15",
        tags: ["Matrix", "SVD"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/math/linear-1",
          },
        ],
      },
      {
        title: "抽象代数 (Abstract Algebra)",
        content:
          "研究代数结构：群 (Group)、环 (Ring)、域 (Field)。群论研究对称性，伽罗瓦理论证明了五次方程无根式解。",
        date: "2025-11-20",
        tags: ["GroupTheory", "Symmetry"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/math/abstract-1",
          },
        ],
      },
    ],
  },
  {
    category: "III. 几何学 (Geometry)",
    items: [
      {
        title: "拓扑学 (Topology)",
        content:
          "橡皮泥几何学。研究连续变形下保持不变的性质。同胚与同伦。欧拉示性数。",
        date: "2025-12-15",
        tags: ["Topology", "Manifolds"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/math/topology-1",
          },
        ],
      },
      {
        title: "微分几何 (Differential Geometry)",
        content:
          "在流形上做微积分。曲率 (Curvature) 的内在定义。广义相对论的数学基础。",
        date: "2026-01-05",
        tags: ["Curvature", "Manifolds"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/math/diffgeom-1",
          },
        ],
      },
    ],
  },
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 分析学 (Analysis)",
    items: [
      {
        title: "数学分析 (Mathematical Analysis)",
        content: "Rudin, Zorich 等经典教材与公开课。",
        links: [
          {
            title: "MIT 18.01 Single Variable Calculus",
            url: "https://www.youtube.com/watch?v=7K1sB05pE0A&list=PL590CCC2BC5AF3BC1&pp=iAQB",
            type: "Video",
          },
          {
            title: "Lecture Notes (MIT 18.01)",
            url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/resources/lec1/",
            type: "Book",
          },
          {
            title: "Mathematical Analysis (Scholar)",
            url: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=mathematical+analysis&btnG=",
            type: "Database",
          },
        ],
      },
      {
        title: "实分析 (Real Analysis)",
        content: "Stein, Folland 等教材。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Mathematical+Analysis",
            type: "Database",
          },
        ],
      },
      {
        title: "复分析 (Complex Analysis)",
        content: "Ahlfors, Needham 可视化。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Mathematical+Analysis",
            type: "Database",
          },
        ],
      },
      {
        title: "泛函分析 (Functional Analysis)",
        content: "Lax, Brezis。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Mathematical+Analysis",
            type: "Database",
          },
        ],
      },
      {
        title: "微分方程 (Differential Equations)",
        content: "Arnold, Evans。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Mathematical+Analysis",
            type: "Database",
          },
        ],
      },
    ],
  },
  {
    category: "II. 代数学 (Algebra)",
    items: [
      {
        title: "线性代数 (Linear Algebra)",
        content: "Strang, Axler。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Mathematical+Analysis",
            type: "Database",
          },
        ],
      },
      {
        title: "抽象代数 (Abstract Algebra)",
        content: "Artin, Dummit & Foote。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Mathematical+Analysis",
            type: "Database",
          },
        ],
      },
    ],
  },
  {
    category: "III. 几何学 (Geometry)",
    items: [
      {
        title: "拓扑学 (Topology)",
        content: "Munkres。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Mathematical+Analysis",
            type: "Database",
          },
        ],
      },
      {
        title: "微分几何 (Differential Geometry)",
        content: "do Carmo, Tu。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Mathematical+Analysis+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Mathematical+Analysis",
            type: "Database",
          },
        ],
      },
    ],
  },
];

const insights: InsightItem[] = [
  {
    title: "数学是宇宙的接口",
    content:
      "物理学描述宇宙的现象，而数学描述宇宙的逻辑。所有的物理定律最终都坍缩为微分方程。如果不理解数学，就只能看到世界的表象。",
    date: "2025-11-01",
    link: "/logs/math/interface",
  },
  {
    title: "抽象的力量",
    content:
      "代数学通过抽象忽略细节，只保留结构（如群论）。这种抽象让我们能发现看似不相关的领域（如晶体结构和方程的解）之间深层的同构性。",
    date: "2025-12-20",
    link: "/logs/math/abstraction",
  },
  {
    title: "高维空间的直觉",
    content:
      "在高维空间中，大部分体积都集中在球壳表面，而不是球心。这种“维数灾难”与我们的三维直觉完全相反，但这解释了为什么高维数据可以被线性分割。",
    date: "2026-01-05",
    link: "/logs/math/high-dim",
  },
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
        {
          year: "300 BC",
          event: "Euclid: Elements",
        },
        {
          year: "820",
          event: "Al-Khwarizmi: Algebra",
        },
        {
          year: "1687",
          event: "Newton & Leibniz: Calculus",
        },
        {
          year: "1748",
          event: "Euler: Analysis of the Infinite",
        },
        {
          year: "1832",
          event: "Galois Theory",
        },
        {
          year: "1854",
          event: "Riemann Geometry (Non-Euclidean)",
        },
        {
          year: "1874",
          event: "Cantor: Set Theory",
        },
        {
          year: "1900",
          event: "Hilbert's 23 Problems",
        },
        {
          year: "1931",
          event: "Gödel's Incompleteness Theorems",
        },
        {
          year: "1994",
          event: "Wiles proves Fermat's Last Theorem",
        },
      ]}
    />
  );
}
