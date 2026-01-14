import { SubjectPageLayout, type ContentData, type NoteItem, type ResourceItem, type InsightItem } from "@/components/SubjectPageLayout";
import techBg from "@/assets/tech.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 数理基础课程 (Math Foundations)",
    items: [
      {
        title: "微积分 (Calculus)",
        content: "偏导数与梯度。链式法则 (Chain Rule) 是反向传播的数学基础。泰勒展开用于理解函数逼近。",
        date: "2025-05-01",
        tags: ["Calculus", "Gradient"],
        links: [
          { title: "笔记（待添加）", url: "/notes/ai/calculus-1" }
        ]
      },
      {
        title: "线性代数 (Linear Algebra)",
        content: "矩阵运算与向量空间。特征值分解与 PCA。SVD 分解。矩阵求导。",
        date: "2025-05-15",
        tags: ["Matrix", "Eigenvalues"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/linear-1" }]
      },
      {
        title: "概率论与数理统计 (Probability & Stats)",
        content: "贝叶斯公式。期望、方差与协方差。常见分布（高斯、伯努利）。最大似然估计 (MLE) 与最大后验估计 (MAP)。",
        date: "2025-06-01",
        tags: ["Bayes", "MLE"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/prob-1" }]
      },
      {
        title: "最优化方法 (Optimization)",
        content: "凸集与凸函数。拉格朗日乘子法与 KKT 条件。梯度下降法及其变种 (SGD, Adam)。",
        date: "2025-06-15",
        tags: ["Convex", "SGD"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/opt-1" }]
      }
    ]
  },
  {
    category: "II. 计算机科学核心 (CS Core)",
    items: [
      {
        title: "数据结构与算法分析 (Data Structures & Algo)",
        content: "树、图、堆、哈希表。动态规划与贪心算法。时间复杂度与空间复杂度 (Big O)。",
        date: "2025-07-01",
        tags: ["Graph", "DP"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/ds-1" }]
      },
      {
        title: "操作系统 (Operating Systems)",
        content: "进程与线程。并发与锁。内存管理与虚拟内存。文件系统。Linux 基础。",
        date: "2025-07-15",
        tags: ["OS", "Concurrency"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/os-1" }]
      },
      {
        title: "计算机体系结构 (Computer Architecture)",
        content: "冯·诺依曼架构。CPU 指令流水线。GPU 架构与 CUDA 编程基础（并行计算）。",
        date: "2025-08-01",
        tags: ["GPU", "Parallel"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/arch-1" }]
      }
    ]
  },
  {
    category: "III. 人工智能专业课 (AI Major)",
    items: [
      {
        title: "人工智能导论 (Intro to AI)",
        content: "图搜索算法 (A*, Alpha-Beta Pruning)。知识表示与推理。专家系统。规划 (Planning)。",
        date: "2025-08-15",
        tags: ["Search", "Logic"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/intro-1" }]
      },
      {
        title: "机器学习基础 (Machine Learning)",
        content: "监督学习（回归、分类）、无监督学习（聚类、降维）。SVM、决策树、随机森林。过拟合与正则化。",
        date: "2025-09-01",
        tags: ["ML", "SVM"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/ml-1" }]
      },
      {
        title: "模式识别 (Pattern Recognition)",
        content: "贝叶斯决策理论。判别函数。特征提取与选择。聚类分析。",
        date: "2025-09-15",
        tags: ["Pattern", "Classification"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/pattern-1" }]
      }
    ]
  },
  {
    category: "IV. 核心算法与理论 (Core Algorithms)",
    items: [
      {
        title: "深度学习 (Deep Learning)",
        content: "DNN, CNN (ResNet), RNN (LSTM)。Transformer 架构与 Attention 机制。生成模型 (GAN, VAE, Diffusion)。",
        date: "2025-10-01",
        tags: ["DL", "Transformer"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/dl-1" }]
      },
      {
        title: "强化学习 (Reinforcement Learning)",
        content: "马尔可夫决策过程 (MDP)。Q-Learning。Policy Gradient (PPO)。Actor-Critic 架构。RLHF。",
        date: "2025-10-15",
        tags: ["RL", "PPO"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/rl-1" }]
      },
      {
        title: "类脑计算 (Neuromorphic Computing)",
        content: "脉冲神经网络 (SNN)。Hebbian 学习规则。STDP。冯·诺依曼瓶颈的突破。",
        date: "2025-11-01",
        tags: ["SNN", "Brain"],
        links: [{ title: "笔记（待添加）", url: "/notes/ai/neuro-1" }]
      }
    ]
  }
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 数理基础课程 (Math Foundations)",
    items: [
      {
        title: "微积分 (Calculus)",
        content: "MIT 18.01, Stewart Calculus。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      },
      {
        title: "线性代数 (Linear Algebra)",
        content: "MIT 18.06 (Gilbert Strang)。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      },
      {
        title: "概率论与数理统计 (Probability & Stats)",
        content: "Harvard 6.041, Sheldon Ross。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      },
      {
        title: "最优化方法 (Optimization)",
        content: "Boyd Convex Optimization。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      }
    ]
  },
  {
    category: "II. 计算机科学核心 (CS Core)",
    items: [
      {
        title: "数据结构与算法分析 (Data Structures & Algo)",
        content: "CLRS (算法导论), LeetCode。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      },
      {
        title: "操作系统 (Operating Systems)",
        content: "OSTEP, MIT 6.828。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      },
      {
        title: "计算机体系结构 (Computer Architecture)",
        content: "CSAPP, Hennessy & Patterson。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      }
    ]
  },
  {
    category: "III. 人工智能专业课 (AI Major)",
    items: [
      {
        title: "人工智能导论 (Intro to AI)",
        content: "Russell & Norvig (AIMA)。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      },
      {
        title: "机器学习基础 (Machine Learning)",
        content: "Andrew Ng CS229, 西瓜书。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      },
      {
        title: "模式识别 (Pattern Recognition)",
        content: "Bishop (PRML)。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      }
    ]
  },
  {
    category: "IV. 核心算法与理论 (Core Algorithms)",
    items: [
      {
        title: "深度学习 (Deep Learning)",
        content: "Goodfellow (花书), CS231n。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      },
      {
        title: "强化学习 (Reinforcement Learning)",
        content: "Sutton & Barto, David Silver。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      },
      {
        title: "类脑计算 (Neuromorphic Computing)",
        content: "Computational Neuroscience。",
        links: [
          { title: "Search Online Courses", url: "https://www.google.com/search?q=Artificial+Intelligence+Online+Course", type: "Video" },
          { title: "Search Books", url: "https://www.google.com/search?q=Artificial+Intelligence+Books", type: "Book" },
          { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Artificial+Intelligence", type: "Database" }
        ]
      }
    ]
  }
];

const insights: InsightItem[] = [
  {
    title: "AI 的本质是压缩",
    content: "Ilya Sutskever 说过，压缩即智能。大模型通过预测下一个 token，实际上是在寻找训练数据背后最高效的压缩表示。这种压缩迫使模型理解世界的运作规律。",
    date: "2026-01-02",
    link: "/logs/ai/compression"
  },
  {
    title: "涌现 (Emergence) 的迷思",
    content: "当参数量达到一定规模，模型突然获得了未被显式训练的能力（如思维链 CoT）。这是量变引起质变，还是我们对其内部机制无知的体现？",
    date: "2025-12-30",
    link: "/logs/ai/emergence"
  },
  {
    title: "从连接主义到符号主义的融合",
    content: "深度学习（连接主义）擅长感知和模式识别，但缺乏逻辑推理。未来的方向可能是神经符号 AI (Neuro-Symbolic AI)，结合两者的优势，实现真正的 System 2 推理。",
    date: "2026-01-15",
    link: "/logs/ai/neuro-symbolic"
  }
];

export default function AI() {
  return (
    <SubjectPageLayout
      title="Artificial Intelligence"
      subtitle="从感知到认知：硅基智能的进化之路"
      backgroundImage={techBg}

      notes={notes}
      resources={resources}
      insights={insights}
      history={[
        { year: "1950", event: "Turing Test Proposed" },
        { year: "1956", event: "Dartmouth Conference: 'AI' Coined" },
        { year: "1958", event: "Perceptron Algorithm Invented" },
        { year: "1969", event: "Minsky & Papert: Perceptrons (First Winter)" },
        { year: "1986", event: "Hinton et al.: Backpropagation" },
        { year: "1997", event: "Deep Blue defeats Kasparov" },
        { year: "2012", event: "AlexNet: The Deep Learning Revolution" },
        { year: "2017", event: "Vaswani et al.: Transformer Architecture" },
        { year: "2022", event: "ChatGPT: The Era of Generative AI" }
      ]}
    />
  );
}
