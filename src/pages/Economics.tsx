import {
  SubjectPageLayout,
  type ContentData,
  type NoteItem,
  type ResourceItem,
  type InsightItem,
} from "@/components/SubjectPageLayout";
import econBg from "@/assets/econ.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 核心经济理论 (Core Theory)",
    items: [
      {
        title: "中级微观经济学 (Intermediate Micro)",
        content:
          "消费者行为理论（效用最大化）、生产者行为理论（成本最小化）。局部均衡分析。市场结构：完全竞争、垄断、寡头。",
        date: "2025-06-01",
        tags: ["Micro", "Utility"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/economics/micro-1",
          },
        ],
      },
      {
        title: "高级微观经济学 (Advanced Micro)",
        content:
          "一般均衡理论 (General Equilibrium) 与福利经济学第一/第二定理。信息经济学：逆向选择与道德风险。机制设计初步。",
        date: "2025-06-15",
        tags: ["GeneralEquilibrium", "InfoEcon"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/economics/advanced-micro-1",
          },
        ],
      },
      {
        title: "中级宏观经济学 (Intermediate Macro)",
        content:
          "IS-LM 模型与 AD-AS 模型。短期波动与长期增长。索洛增长模型 (Solow Model)。",
        date: "2025-07-01",
        tags: ["Macro", "IS-LM"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/economics/macro-1",
          },
        ],
      },
      {
        title: "高级宏观经济学 (Advanced Macro)",
        content:
          "微观基础的宏观模型。拉姆齐模型 (Ramsey-Cass-Koopmans)。RBC (实物商业周期) 与 New Keynesian 模型。动态随机一般均衡 (DSGE)。",
        date: "2025-07-20",
        tags: ["DSGE", "Growth"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/economics/advanced-macro-1",
          },
        ],
      },
      {
        title: "中级计量经济学 (Intermediate Econometrics)",
        content:
          "多元线性回归。高斯-马尔可夫定理。异方差性、自相关性与多重共线性。工具变量法 (IV)。",
        date: "2025-08-01",
        tags: ["Regression", "OLS"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/economics/econometrics-1",
          },
        ],
      },
      {
        title: "高级计量经济学 (Advanced Econometrics)",
        content:
          "最大似然估计 (MLE) 与广义矩估计 (GMM)。时间序列分析 (ARIMA, VAR, Cointegration)。面板数据模型。",
        date: "2025-08-15",
        tags: ["MLE", "TimeSeries"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/economics/advanced-econometrics-1",
          },
        ],
      },
    ],
  },
  {
    category: "II. 数学与工具 (Math Tools)",
    items: [
      {
        title: "经济数学 (Math for Econ)",
        content:
          "静态最优化：拉格朗日乘数法，库恩-塔克条件 (KKT)。包络定理。比较静态分析。",
        date: "2025-05-01",
        tags: ["Optimization", "KKT"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/economics/math-econ-1",
          },
        ],
      },
      {
        title: "博弈论 (Game Theory)",
        content:
          "纳什均衡 (Nash Equilibrium)。子博弈精炼纳什均衡 (SPE)。贝叶斯纳什均衡。重复博弈与声誉机制。",
        date: "2025-05-15",
        tags: ["Nash", "Strategy"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/economics/game-theory-1",
          },
        ],
      },
      {
        title: "动态最优化 (Dynamic Optimization)",
        content:
          "变分法 (Calculus of Variations) 与最优控制理论 (Optimal Control)。哈密顿函数。贝尔曼方程 (Bellman Equation) 与动态规划。",
        date: "2025-09-01",
        tags: ["Hamiltonian", "Bellman"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/economics/dynamic-optimization-1",
          },
        ],
      },
      {
        title: "数理经济学 (Mathematical Economics)",
        content:
          "拓扑学在定点定理中的应用（布劳威尔、角谷）。分离超平面定理。凸分析基础。",
        date: "2025-09-15",
        tags: ["FixedPoint", "Convexity"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/economics/math-economics-1",
          },
        ],
      },
    ],
  },
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 核心经济理论 (Core Theory)",
    items: [
      {
        title:
          "Microeconomic Theory (Mas-Colell, Whinston, Green)",
        content:
          "MWG，微观经济学的终极圣经，数学要求极高。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Economics+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Economics+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Economics",
            type: "Database",
          },
        ],
      },
      {
        title: "Macroeconomics (Mankiw)",
        content: "曼昆的中级宏观教材，直观清晰。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Economics+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Economics+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Economics",
            type: "Database",
          },
        ],
      },
      {
        title: "Econometric Analysis (Greene)",
        content: "计量经济学的百科全书。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Economics+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Economics+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Economics",
            type: "Database",
          },
        ],
      },
    ],
  },
  {
    category: "II. 数学与工具 (Math Tools)",
    items: [
      {
        title: "Game Theory (Fudenberg & Tirole)",
        content: "博弈论领域的经典参考书。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Economics+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Economics+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Economics",
            type: "Database",
          },
        ],
      },
      {
        title: "Optimization in Economic Theory (Dixit)",
        content: "迪克西特关于经济中最优化方法的精彩讲解。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Economics+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Economics+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Economics",
            type: "Database",
          },
        ],
      },
    ],
  },
];

const insights: InsightItem[] = [
  {
    title: "理性人假设的边界",
    content:
      "经济学建立在理性人假设之上，但这只是一个基准参照系。现实世界中，信息不对称、有限理性 (Bounded Rationality) 和认知偏差无处不在。高级模型正是为了修补这些假设。",
    date: "2025-10-01",
    link: "/logs/economics/rationality",
  },
  {
    title: "均衡作为一种状态",
    content:
      "纳什均衡不仅仅是博弈的结果，它描述了一种稳定的社会状态：在当前制度下，没有人有动力去改变自己的行为。理解这一点，就能理解制度惯性。",
    date: "2025-11-10",
    link: "/logs/economics/equilibrium",
  },
  {
    title: "计量的因果推断",
    content:
      "“相关不等于因果”。现代计量经济学的核心革命是因果推断 (Causal Inference)。通过寻找自然实验和工具变量，在观测数据中识别因果关系。",
    date: "2025-12-05",
    link: "/logs/economics/causal",
  },
];

export default function Economics() {
  return (
    <SubjectPageLayout
      title="Economics"
      subtitle="稀缺资源配置与激励系统的博弈"
      backgroundImage={econBg}
      notes={notes}
      resources={resources}
      insights={insights}
      history={[
        {
          year: "1776",
          event: "Smith: The Wealth of Nations",
        },
        {
          year: "1817",
          event: "Ricardo: Comparative Advantage",
        },
        {
          year: "1867",
          event: "Marx: Das Kapital",
        },
        {
          year: "1936",
          event: "Keynes: The General Theory",
        },
        {
          year: "1944",
          event: "Bretton Woods / Hayek's Road to Serfdom",
        },
        {
          year: "1950",
          event: "Nash Equilibrium (Game Theory)",
        },
        {
          year: "1979",
          event: "Prospect Theory (Behavioral Econ)",
        },
        {
          year: "2008",
          event: "Financial Crisis & QE",
        },
        {
          year: "2009",
          event: "Bitcoin Genesis Block",
        },
      ]}
    />
  );
}
