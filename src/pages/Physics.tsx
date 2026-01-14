import { SubjectPageLayout, type ContentData, type NoteItem, type ResourceItem, type InsightItem } from "@/components/SubjectPageLayout";
import physicsBg from "@/assets/physics.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 五小力学 (General Physics)",
    items: [
      {
        title: "力学 (Mechanics)",
        content: "牛顿三定律是宏观低速世界的法则。动量守恒与能量守恒是物理学中最深刻的原理。",
        date: "2025-08-01",
        tags: ["Newton", "Energy"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/mechanics-1" }
        ]
      },
      {
        title: "热学 (Thermal Physics)",
        content: "温度是分子平均动能的度量。热力学第一定律（能量守恒）与第二定律（熵增）统治着能量的流动。",
        date: "2025-08-10",
        tags: ["Thermodynamics", "Entropy"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/thermal-1" }
        ]
      },
      {
        title: "电磁学 (Electromagnetism)",
        content: "电荷与电流产生场。高斯定律、安培环路定理。变化的磁场产生电场（法拉第感应），变化的电场产生磁场（麦克斯韦位移电流）。",
        date: "2025-08-20",
        tags: ["Maxwell", "Fields"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/electromagnetism-1" }
        ]
      },
      {
        title: "光学 (Optics)",
        content: "光的波粒二象性。干涉、衍射与偏振。几何光学是波动光学的近似。",
        date: "2025-09-01",
        tags: ["Wave", "Particle"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/optics-1" }
        ]
      },
      {
        title: "近代物理 (Modern Physics)",
        content: "黑体辐射、光电效应开启了量子的大门。狭义相对论重塑了时空观：时间膨胀、尺缩效应。",
        date: "2025-09-15",
        tags: ["Relativity", "Quantum"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/modern-physics-1" }
        ]
      }
    ]
  },
  {
    category: "II. 四大力学 (Theoretical Physics)",
    items: [
      {
        title: "理论力学 (Analytical Mechanics)",
        content: "拉格朗日量 (Lagrangian) 与哈密顿量 (Hamiltonian)。最小作用量原理是物理学的最高法则。",
        date: "2025-10-01",
        tags: ["Lagrangian", "Action"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/analytical-mechanics-1" }
        ]
      },
      {
        title: "电动力学 (Electrodynamics)",
        content: "麦克斯韦方程组的相对论形式。电磁波的辐射与散射。规范不变性。",
        date: "2025-10-20",
        tags: ["Maxwell", "Gauge"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/electrodynamics-1" }
        ]
      },
      {
        title: "量子力学 (Quantum Mechanics)",
        content: "希尔伯特空间中的态矢量。薛定谔方程。海森堡不确定性原理。全同粒子与自旋。",
        date: "2025-11-10",
        tags: ["Schrodinger", "Spin"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/quantum-mechanics-1" }
        ]
      },
      {
        title: "统计力学 (Statistical Mechanics)",
        content: "从微观状态到宏观性质的桥梁。配分函数 (Partition Function) 是核心。玻尔兹曼分布。相变与临界现象。",
        date: "2025-12-05",
        tags: ["Boltzmann", "PhaseTransition"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/statistical-mechanics-1" }
        ]
      }
    ]
  },
  {
    category: "III. 数学物理 (Mathematical Physics)",
    items: [
      {
        title: "复变函数 (Complex Variables)",
        content: "全纯函数与解析延拓。留数定理在物理积分中的应用。",
        date: "2026-01-01",
        tags: ["Complex", "Integration"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/complex-variables-1" }
        ]
      },
      {
        title: "数学物理方程 (Math Physics Eqs)",
        content: "分离变量法求解偏微分方程。格林函数 (Green's Function) 方法。特殊函数（勒让德、贝塞尔）。",
        date: "2026-01-15",
        tags: ["PDE", "GreensFunction"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/math-physics-eqs-1" }
        ]
      },
      {
        title: "群论 (Group Theory)",
        content: "对称性的数学描述。李群与李代数。粒子物理标准模型建立在 SU(3)xSU(2)xU(1) 规范群之上。",
        date: "2026-02-01",
        tags: ["Symmetry", "LieGroups"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/group-theory-1" }
        ]
      },
      {
        title: "微分几何与拓扑 (Diff Geometry)",
        content: "广义相对论的语言。流形、联络、曲率。杨-米尔斯场论的几何意义。",
        date: "2026-02-20",
        tags: ["GR", "Topology"],
        links: [
          { title: "笔记（待添加）", url: "/notes/physics/diff-geometry-1" }
        ]
      }
    ]
  }
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 五小力学 (General Physics)",
    items: [
      {
        title: "力学 (Mechanics)",
        content: "Feynman Lectures Vol 1, Kleppner & Kolenkow。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          {
            title: "Quantum Mechanics",
            url: `/pdf-viewer?src=${encodeURIComponent("https://www.icourse.club/uploads/files/193e0e79ccf6ba466e8ea8a5f1218473022773b8.pdf")}&title=Search Books&back=/physics&backLabel=Physics Page`,
            type: "Book"
          },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      },
      {
        title: "热学 (Thermal Physics)",
        content: "Schroeder, Kittel & Kroemer。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      },
      {
        title: "电磁学 (Electromagnetism)",
        content: "Purcell, Griffiths。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      },
      {
        title: "光学 (Optics)",
        content: "Hecht。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      },
      {
        title: "近代物理 (Modern Physics)",
        content: "Beiser。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      }
    ]
  },
  {
    category: "II. 四大力学 (Theoretical Physics)",
    items: [
      {
        title: "理论力学 (Analytical Mechanics)",
        content: "Landau Vol 1, Goldstein。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      },
      {
        title: "电动力学 (Electrodynamics)",
        content: "Jackson, Landau Vol 2。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      },
      {
        title: "量子力学 (Quantum Mechanics)",
        content: "Shankar, Griffiths, Sakurai。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      },
      {
        title: "统计力学 (Statistical Mechanics)",
        content: "Pathria, Landau Vol 5。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      }
    ]
  },
  {
    category: "III. 数学物理 (Mathematical Physics)",
    items: [
      {
        title: "复变函数 (Complex Variables)",
        content: "Arfken & Weber。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      },
      {
        title: "数学物理方程 (Math Physics Eqs)",
        content: "Courant & Hilbert。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      },
      {
        title: "群论 (Group Theory)",
        content: "Zee, Georgi。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      },
      {
        title: "微分几何与拓扑 (Diff Geometry)",
        content: "Nakahara, Schutz。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Physics+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Physics+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Physics", type: "Database" }
        ]
      }
    ]
  }
];

const insights: InsightItem[] = [
  {
    title: "决定论的终结",
    content: "牛顿力学让我们相信如果知道所有粒子的位置和动量，就能预测未来。但海森堡不确定性原理打破了这个幻梦。微观世界本质上是概率的，上帝确实在掷骰子。",
    date: "2025-11-30",
    link: "/logs/physics/uncertainty"
  },
  {
    title: "对称性指引物理定律",
    content: "诺特定理 (Noether's Theorem) 告诉我们，每一个连续对称性都对应一个守恒量。时间平移对称对应能量守恒，空间平移对应动量守恒。物理学的终极目标就是寻找对称性。",
    date: "2026-01-10",
    link: "/logs/physics/symmetry"
  },
  {
    title: "最小作用量原理",
    content: "大自然是一个精明的会计师。光走最短时间路径，粒子走作用量极值路径。费曼路径积分表明，量子粒子实际上“尝试”了所有可能的路径。",
    date: "2026-02-05",
    link: "/logs/physics/action"
  }
];

export default function Physics() {
  return (
    <SubjectPageLayout
      title="Physics"
      subtitle="从夸克到类星体：解码现实的物理法则"
      backgroundImage={physicsBg}

      notes={notes}
      resources={resources}
      insights={insights}
      history={[
        { year: "350 BC", event: "Aristotle: Physics" },
        { year: "1632", event: "Galileo: Dialogue on World Systems" },
        { year: "1687", event: "Newton: Principia (Classical Mech)" },
        { year: "1865", event: "Maxwell's Equations (Electromagnetism)" },
        { year: "1905", event: "Einstein: Special Relativity & Photoelectric" },
        { year: "1915", event: "Einstein: General Relativity" },
        { year: "1926", event: "Schrödinger Equation (Wave Mech)" },
        { year: "1927", event: "Heisenberg Uncertainty Principle" },
        { year: "1964", event: "The Standard Model Proposed" },
        { year: "2015", event: "LIGO: Gravitational Waves Detected" }
      ]}
    />
  );
}
