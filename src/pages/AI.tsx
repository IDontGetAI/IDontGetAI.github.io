import { SubjectPageLayout, type ContentData, type NoteItem, type ResourceItem, type InsightItem, type HistoryItem } from "@/components/SubjectPageLayout";
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
            { title: "笔记1 (待添加)", url: "/notes/ai/calculus-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/calculus-2" }
        ]
      },
      {
        title: "线性代数 (Linear Algebra)",
        content: "矩阵运算与向量空间。特征值分解与 PCA。SVD 分解。矩阵求导。",
        date: "2025-05-15",
        tags: ["Matrix", "Eigenvalues"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/linear-algebra-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/linear-algebra-2" }
        ]
      },
      {
        title: "概率论与数理统计 (Probability & Stats)",
        content: "贝叶斯公式。期望、方差与协方差。常见分布（高斯、伯努利）。最大似然估计 (MLE) 与最大后验估计 (MAP)。",
        date: "2025-06-01",
        tags: ["Bayes", "MLE"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/probability-stats-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/probability-stats-2" }
        ]
      },
      {
        title: "最优化方法 (Optimization)",
        content: "凸集与凸函数。拉格朗日乘子法与 KKT 条件。梯度下降法及其变种 (SGD, Adam)。",
        date: "2025-06-15",
        tags: ["Convex", "SGD"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/optimization-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/optimization-2" }
        ]
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
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/data-structures-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/data-structures-2" }
        ]
      },
      {
        title: "操作系统 (Operating Systems)",
        content: "进程与线程。并发与锁。内存管理与虚拟内存。文件系统。Linux 基础。",
        date: "2025-07-15",
        tags: ["OS", "Concurrency"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/os-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/os-2" }
        ]
      },
      {
        title: "计算机体系结构 (Computer Architecture)",
        content: "冯·诺依曼架构。CPU 指令流水线。GPU 架构与 CUDA 编程基础（并行计算）。",
        date: "2025-08-01",
        tags: ["GPU", "Parallel"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/computer-architecture-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/computer-architecture-2" }
        ]
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
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/intro-ai-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/intro-ai-2" }
        ]
      },
      {
        title: "机器学习基础 (Machine Learning)",
        content: "监督学习（回归、分类）、无监督学习（聚类、降维）。SVM、决策树、随机森林。过拟合与正则化。",
        date: "2025-09-01",
        tags: ["ML", "SVM"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/ml-basics-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/ml-basics-2" }
        ]
      },
      {
        title: "模式识别 (Pattern Recognition)",
        content: "贝叶斯决策理论。判别函数。特征提取与选择。聚类分析。",
        date: "2025-09-15",
        tags: ["Pattern", "Classification"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/pattern-recognition-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/pattern-recognition-2" }
        ]
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
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/deep-learning-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/deep-learning-2" }
        ]
      },
      {
        title: "强化学习 (Reinforcement Learning)",
        content: "马尔可夫决策过程 (MDP)。Q-Learning。Policy Gradient (PPO)。Actor-Critic 架构。RLHF。",
        date: "2025-10-15",
        tags: ["RL", "PPO"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/reinforcement-learning-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/reinforcement-learning-2" }
        ]
      },
      {
        title: "类脑计算 (Neuromorphic Computing)",
        content: "脉冲神经网络 (SNN)。Hebbian 学习规则。STDP。冯·诺依曼瓶颈的突破。",
        date: "2025-11-01",
        tags: ["SNN", "Brain"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/ai/neuromorphic-1" },
            { title: "笔记2 (待添加)", url: "/notes/ai/neuromorphic-2" }
        ]
      }
    ]
  }
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 数理基础课程 (Math Foundations)",
    items: [
      {
        title: "Linear Algebra (Gilbert Strang)",
        url: "https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/",
        type: "Course",
        description: "MIT 公开课，线性代数的经典入门。"
      }
    ]
  },
  {
    category: "II. 计算机科学核心 (CS Core)",
    items: [
      {
        title: "CSAPP (Computer Systems: A Programmer's Perspective)",
        url: "#",
        type: "Book",
        description: "深入理解计算机系统，CMU 镇系之宝。"
      },
      {
        title: "Introduction to Algorithms (CLRS)",
        url: "#",
        type: "Book",
        description: "算法导论，计算机领域的圣经。"
      }
    ]
  },
  {
    category: "IV. 核心算法与理论 (Core Algorithms)",
    items: [
      {
        title: "Deep Learning (Goodfellow et al.)",
        url: "https://www.deeplearningbook.org/",
        type: "Book",
        description: "花书，深度学习领域的奠基之作。"
      },
      {
        title: "CS231n: CNN for Visual Recognition",
        url: "http://cs231n.stanford.edu/",
        type: "Course",
        description: "斯坦福计算机视觉课程，李飞飞主讲。"
      },
      {
        title: "Hugging Face Course",
        url: "https://huggingface.co/course",
        type: "Course",
        description: "NLP 实战必修，Transformer 库使用指南。"
      }
    ]
  }
];

const insights: InsightItem[] = [
  {
    title: "AI 的本质是压缩",
    content: "Ilya Sutskever 说过，压缩即智能。大模型通过预测下一个 token，实际上是在寻找训练数据背后最高效的压缩表示。这种压缩迫使模型理解世界的运作规律。",
    date: "2026-01-02"
  },
  {
    title: "涌现 (Emergence) 的迷思",
    content: "当参数量达到一定规模，模型突然获得了未被显式训练的能力（如思维链 CoT）。这是量变引起质变，还是我们对其内部机制无知的体现？",
    date: "2025-12-30"
  },
  {
    title: "从连接主义到符号主义的融合",
    content: "深度学习（连接主义）擅长感知和模式识别，但缺乏逻辑推理。未来的方向可能是神经符号 AI (Neuro-Symbolic AI)，结合两者的优势，实现真正的 System 2 推理。",
    date: "2026-01-15"
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
