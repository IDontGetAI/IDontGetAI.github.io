import {
  SubjectPageLayout,
  type ContentData,
  type NoteItem,
  type ResourceItem,
  type InsightItem,
} from "@/components/SubjectPageLayout";
import philBg from "@/assets/abstract.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 哲学基础 (Foundations)",
    items: [
      {
        title: "哲学导论 (Introduction)",
        content:
          "哲学的核心问题：我们能知道什么？什么是真实的？应该做什么？苏格拉底的产婆术与未经审视的生活。",
        date: "2025-06-01",
        tags: ["Intro", "Socrates"],
        links: [{ title: "笔记（待添加）", url: "/notes/philosophy/intro-1" }],
      },
      {
        title: "哲学史 (History of Philosophy)",
        content:
          "从前苏格拉底学派到希腊三贤。中世纪经院哲学。近代唯理主义与经验主义。康德的哥白尼式革命。",
        date: "2025-06-15",
        tags: ["History", "Kant"],
        links: [
          { title: "笔记（待添加）", url: "/notes/philosophy/history-1" },
        ],
      },
      {
        title: "基础逻辑学 (Logic)",
        content:
          "命题逻辑与谓词逻辑。三段论。有效性与可靠性。逻辑谬误。弗雷格与现代逻辑的诞生。",
        date: "2025-07-01",
        tags: ["Logic", "Frege"],
        links: [{ title: "笔记（待添加）", url: "/notes/philosophy/logic-1" }],
      },
    ],
  },
  {
    category: "II. 分析哲学核心 (Analytic Philosophy)",
    items: [
      {
        title: "语言哲学 (Philosophy of Language)",
        content:
          "弗雷格的含义与指称。罗素的摹状词理论。维特根斯坦的前期与后期。言语行为理论。",
        date: "2025-08-01",
        tags: ["Language", "Wittgenstein"],
        links: [
          { title: "笔记（待添加）", url: "/notes/philosophy/language-1" },
        ],
      },
      {
        title: "心灵哲学 (Philosophy of Mind)",
        content:
          "身心问题：二元论 vs 物理主义。图灵测试与中文屋。功能主义。意识的困难问题。",
        date: "2025-08-20",
        tags: ["Mind", "Consciousness"],
        links: [{ title: "笔记（待添加）", url: "/notes/philosophy/mind-1" }],
      },
      {
        title: "形而上学 (Metaphysics)",
        content:
          "存在是什么？共相与殊相。可能世界模态实在论。时间与空间。自由意志与决定论。",
        date: "2025-09-10",
        tags: ["Metaphysics", "Being"],
        links: [
          { title: "笔记（待添加）", url: "/notes/philosophy/metaphysics-1" },
        ],
      },
      {
        title: "认识论 (Epistemology)",
        content:
          "JTB 理论。盖梯尔反例。基础主义 vs 融贯主义。怀疑论的挑战（缸中之脑）。",
        date: "2025-09-30",
        tags: ["Knowledge", "Gettier"],
        links: [
          { title: "笔记（待添加）", url: "/notes/philosophy/epistemology-1" },
        ],
      },
    ],
  },
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 哲学基础 (Foundations)",
    items: [
      {
        title: "哲学导论 (Introduction)",
        content: "入门书籍与在线课程资源。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Philosophy+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Philosophy+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Philosophy",
            type: "Database",
          },
        ],
      },
      {
        title: "哲学史 (History of Philosophy)",
        content: "通史著作与断代史研究。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Philosophy+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Philosophy+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Philosophy",
            type: "Database",
          },
        ],
      },
      {
        title: "基础逻辑学 (Logic)",
        content: "逻辑学教材与练习题。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Philosophy+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Philosophy+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Philosophy",
            type: "Database",
          },
        ],
      },
    ],
  },
  {
    category: "II. 分析哲学核心 (Analytic Philosophy)",
    items: [
      {
        title: "语言哲学 (Philosophy of Language)",
        content: "经典文献与当代论文。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Philosophy+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Philosophy+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Philosophy",
            type: "Database",
          },
        ],
      },
      {
        title: "心灵哲学 (Philosophy of Mind)",
        content: "认知科学交叉研究资源。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Philosophy+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Philosophy+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Philosophy",
            type: "Database",
          },
        ],
      },
      {
        title: "形而上学 (Metaphysics)",
        content: "核心文本与讨论。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Philosophy+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Philosophy+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Philosophy",
            type: "Database",
          },
        ],
      },
      {
        title: "认识论 (Epistemology)",
        content: "关于知识论证的资源。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Philosophy+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Philosophy+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Philosophy",
            type: "Database",
          },
        ],
      },
    ],
  },
];

const insights: InsightItem[] = [
  {
    title: "简明逻辑学导论 (Introduction to Logic)",
    content: "逻辑学是哲学的工具。论证的有效性与可靠性。形式谬误与非形式谬误。",
    date: "2026-01-07",
    link: "/logs/philosophy/logic-log",
  },
  {
    title: "语言的牢笼",
    content:
      "维特根斯坦告诉我们，许多哲学问题（如“什么是美？”）实际上是语言的误用。我们像苍蝇被困在捕蝇瓶里一样被困在语言游戏中。",
    date: "2025-10-15",
    link: "/logs/philosophy/language-prison",
  },
  {
    title: "缸中之脑的不可证伪性",
    content:
      "我们无法证明自己不是缸中之脑，但这并不意味着我们要陷入虚无。普特南试图用语义外在论来反驳它。",
    date: "2025-11-20",
  },
];

export default function Philosophy() {
  return (
    <SubjectPageLayout
      title="Philosophy"
      subtitle="在无意义的宇宙中寻找意义"
      backgroundImage={philBg}
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
        { year: "1971", event: "Rawls: A Theory of Justice" },
      ]}
    />
  );
}
