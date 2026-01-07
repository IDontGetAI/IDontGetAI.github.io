import { SubjectPageLayout, type ContentData, type NoteItem, type ResourceItem, type InsightItem, type HistoryItem } from "@/components/SubjectPageLayout";
import abstractBg from "@/assets/abstract.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 哲学基础 (Foundations)",
    items: [
      {
        title: "哲学导论 (Introduction)",
        content: "哲学的核心问题：我们能知道什么？什么是真实的？应该做什么？苏格拉底的产婆术与未经审视的生活。",
        date: "2025-06-01",
        tags: ["Intro", "Socrates"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/philosophy/introduction-1" },
            { title: "笔记2 (待添加)", url: "/notes/philosophy/introduction-2" }
        ]
      },
      {
        title: "哲学史 (History of Philosophy)",
        content: "从前苏格拉底学派（泰勒斯、赫拉克利特）到希腊三贤。中世纪经院哲学。近代唯理主义（笛卡尔）与经验主义（休谟）。康德的哥白尼式革命。",
        date: "2025-06-15",
        tags: ["History", "Kant"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/philosophy/history-1" },
            { title: "笔记2 (待添加)", url: "/notes/philosophy/history-2" }
        ]
      },
      {
        title: "基础逻辑学 (Logic)",
        content: "命题逻辑与谓词逻辑。三段论。有效性与可靠性。逻辑谬误（稻草人、人身攻击）。弗雷格与现代逻辑的诞生。",
        date: "2025-07-01",
        tags: ["Logic", "Frege"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/philosophy/logic-1" },
            { title: "笔记2 (待添加)", url: "/notes/philosophy/logic-2" }
        ]
      }
    ]
  },
  {
    category: "II. 分析哲学核心 (Analytic Philosophy)",
    items: [
      {
        title: "语言哲学 (Philosophy of Language)",
        content: "弗雷格的含义与指称 (Sense and Reference)。罗素的摹状词理论。维特根斯坦的前期（图象论）与后期（语言游戏）。奥斯汀的言语行为理论。",
        date: "2025-08-01",
        tags: ["Language", "Wittgenstein"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/philosophy/language-1" },
            { title: "笔记2 (待添加)", url: "/notes/philosophy/language-2" }
        ]
      },
      {
        title: "心灵哲学 (Philosophy of Mind)",
        content: "身心问题 (Mind-Body Problem)：二元论 vs 物理主义。图灵测试与中文屋论证。功能主义。意识的困难问题 (Hard Problem of Consciousness)。",
        date: "2025-08-20",
        tags: ["Mind", "Consciousness"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/philosophy/mind-1" },
            { title: "笔记2 (待添加)", url: "/notes/philosophy/mind-2" }
        ]
      },
      {
        title: "形而上学 (Metaphysics)",
        content: "存在是什么？共相与殊相。可能世界模态实在论（刘易斯）。时间与空间的本质。自由意志与决定论的相容性问题。",
        date: "2025-09-10",
        tags: ["Metaphysics", "Being"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/philosophy/metaphysics-1" },
            { title: "笔记2 (待添加)", url: "/notes/philosophy/metaphysics-2" }
        ]
      },
      {
        title: "认识论 (Epistemology)",
        content: "JTB 理论：知识是证成的真信念。盖梯尔反例。基础主义 vs 融贯主义。怀疑论的挑战（缸中之脑）。",
        date: "2025-09-30",
        tags: ["Knowledge", "Gettier"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/philosophy/epistemology-1" },
            { title: "笔记2 (待添加)", url: "/notes/philosophy/epistemology-2" }
        ]
      }
    ]
  }
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 哲学基础 (Foundations)",
    items: [
      {
        title: "A History of Western Philosophy (Russell)",
        url: "#",
        type: "Book",
        description: "罗素的《西方哲学史》，文笔优美，观点鲜明，虽有主观偏见但不可错过。"
      },
      {
        title: "Think (Simon Blackburn)",
        url: "#",
        type: "Book",
        description: "极好的哲学导论，围绕核心大问题展开。"
      }
    ]
  },
  {
    category: "II. 分析哲学核心 (Analytic Philosophy)",
    items: [
      {
        title: "Philosophical Investigations (Wittgenstein)",
        url: "#",
        type: "Book",
        description: "《哲学研究》。语言的界限就是世界的界限。治疗型哲学的巅峰。"
      },
      {
        title: "Naming and Necessity (Kripke)",
        url: "#",
        type: "Book",
        description: "克里普克的《命名与必然性》，模态逻辑与形而上学的经典。"
      },
      {
        title: "Stanford Encyclopedia of Philosophy (SEP)",
        url: "https://plato.stanford.edu/",
        type: "Article",
        description: "斯坦福哲学百科，学术界最权威的在线资源。"
      }
    ]
  }
];

const insights: InsightItem[] = [
  {
    title: "语言的牢笼",
    content: "维特根斯坦告诉我们，许多哲学问题（如“什么是美？”）实际上是语言的误用。我们像苍蝇被困在捕蝇瓶里一样被困在语言游戏中。哲学的任务是向苍蝇展示飞出瓶子的路。",
    date: "2025-10-15"
  },
  {
    title: "缸中之脑的不可证伪性",
    content: "我们无法证明自己不是缸中之脑，但这并不意味着我们要陷入虚无。普特南试图用语义外在论（Putnam's externalism）来反驳它，但这依然是一个令人不安的思想实验。",
    date: "2025-11-20"
  },
  {
    title: "感受质 (Qualia) 的鸿沟",
    content: "即使玛丽知道关于红色的所有物理知识，当她第一次走出黑白房间看到红色时，她学到了新东西吗？如果是，那么物理主义就是错的。主观体验似乎无法完全还原为物理过程。",
    date: "2025-12-10"
  }
];

export default function Philosophy() {
  return (
    <SubjectPageLayout
      title="Philosophy"
      subtitle="在无意义的宇宙中寻找意义"
      backgroundImage={abstractBg}
      
      notes={notes}
      resources={resources}
      insights={insights}
      history={[
        { year: "399 BC", event: "Death of Socrates" },
        { year: "380 BC", event: "Plato: The Republic" },
        { year: "1641", event: "Descartes: Meditations" },
        { year: "1739", event: "Hume: Treatise of Human Nature" },
        { year: "1781", event: "Kant: Critique of Pure Reason" },
        { year: "1883", event: "Nietzsche: Thus Spoke Zarathustra" },
        { year: "1921", event: "Wittgenstein: Tractatus" },
        { year: "1927", event: "Heidegger: Being and Time" },
        { year: "1943", event: "Sartre: Being and Nothingness" },
        { year: "1971", event: "Rawls: A Theory of Justice" }
      ]}
    />
  );
}
