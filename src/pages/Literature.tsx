import { SubjectPageLayout, type ContentData, type NoteItem, type ResourceItem, type InsightItem, type HistoryItem } from "@/components/SubjectPageLayout";
import literatureBg from "@/assets/literature.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 文学理论 (Literary Theory)",
    items: [
      {
        title: "俄国形式主义 (Russian Formalism)",
        content: "文学性 (Literariness) 在于语言的“陌生化” (Defamiliarization)。什克洛夫斯基：艺术的技巧就是使对象变得陌生，使形式变得困难，增加感觉的难度和时间长度。",
        date: "2025-06-05",
        tags: ["Formalism", "Defamiliarization"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/literature/formalism-1" },
            { title: "笔记2 (待添加)", url: "/notes/literature/formalism-2" }
        ]
      },
      {
        title: "新批评 (New Criticism)",
        content: "文本细读 (Close Reading)。意图谬误 (Intentional Fallacy) 与感受谬误 (Affective Fallacy)。文本是一个自足的有机体，意义在于其内部的张力、反讽和悖论。",
        date: "2025-06-20",
        tags: ["NewCriticism", "CloseReading"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/literature/new-criticism-1" },
            { title: "笔记2 (待添加)", url: "/notes/literature/new-criticism-2" }
        ]
      },
      {
        title: "结构主义与解构 (Structuralism & Deconstruction)",
        content: "罗兰·巴特：作者已死。德里达：延异 (Différance)。文本没有固定的中心或终极意义，只有无尽的能指游戏。",
        date: "2025-07-10",
        tags: ["PostStructuralism", "Derrida"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/literature/deconstruction-1" },
            { title: "笔记2 (待添加)", url: "/notes/literature/deconstruction-2" }
        ]
      }
    ]
  },
  {
    category: "II. 文学史 (Literary History)",
    items: [
      {
        title: "古希腊悲剧 (Greek Tragedy)",
        content: "索福克勒斯《俄狄浦斯王》。亚里士多德《诗学》：悲剧的净化 (Catharsis) 作用。命运与性格的冲突。",
        date: "2025-08-01",
        tags: ["Tragedy", "Aristotle"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/literature/greek-tragedy-1" },
            { title: "笔记2 (待添加)", url: "/notes/literature/greek-tragedy-2" }
        ]
      },
      {
        title: "现代主义 (Modernism)",
        content: "乔伊斯、卡夫卡、普鲁斯特。意识流 (Stream of Consciousness)。在这个破碎的世界中，传统的叙事结构已无法捕捉真实体验。向内转。",
        date: "2025-08-15",
        tags: ["Modernism", "StreamOfConsciousness"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/literature/modernism-1" },
            { title: "笔记2 (待添加)", url: "/notes/literature/modernism-2" }
        ]
      },
      {
        title: "魔幻现实主义 (Magical Realism)",
        content: "马尔克斯《百年孤独》。在拉丁美洲，现实本身就比虚构更魔幻。神话与历史的交织。",
        date: "2025-09-01",
        tags: ["Marquez", "LatinAmerica"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/literature/magical-realism-1" },
            { title: "笔记2 (待添加)", url: "/notes/literature/magical-realism-2" }
        ]
      }
    ]
  },
  {
    category: "III. 比较文学 (Comparative Literature)",
    items: [
      {
        title: "世界文学 (Weltliteratur)",
        content: "歌德的概念。文学不应局限于民族国家的边界。通过翻译和跨文化交流，形成一种普世的文学对话。",
        date: "2025-09-20",
        tags: ["Goethe", "Translation"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/literature/world-lit-1" },
            { title: "笔记2 (待添加)", url: "/notes/literature/world-lit-2" }
        ]
      },
      {
        title: "影响研究与平行研究",
        content: "从实证的影响关系（法国学派）到无直接联系的类同性研究（美国学派）。寻找跨越时空的人类心灵共鸣。",
        date: "2025-10-05",
        tags: ["Comparative", "Methodology"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/literature/comparative-1" },
            { title: "笔记2 (待添加)", url: "/notes/literature/comparative-2" }
        ]
      }
    ]
  }
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 经典文本 (Classics)",
    items: [
      {
        title: "The Norton Anthology of World Literature",
        url: "#",
        type: "Book",
        description: "诺顿世界文学选集，涵盖了从吉尔伽美什到当代的最重要文本。"
      },
      {
        title: "Ulysses (James Joyce)",
        url: "#",
        type: "Book",
        description: "现代主义的巅峰，也是最难读的天书之一。一天之内的奥德赛。"
      }
    ]
  },
  {
    category: "II. 理论导读 (Theory)",
    items: [
      {
        title: "Literary Theory: An Introduction (Terry Eagleton)",
        url: "#",
        type: "Book",
        description: "伊格尔顿的经典入门，用马克思主义视角犀利点评各路学派。"
      },
      {
        title: "Yale: The Modern Novel",
        url: "https://oyc.yale.edu/english/engl-291",
        type: "Course",
        description: "耶鲁公开课，深入剖析现代小说形式的演变。"
      }
    ]
  }
];

const insights: InsightItem[] = [
  {
    title: "文学即新闻",
    content: "庞德说：“文学是那种以此为新闻的新闻 (Literature is news that stays news)。” 真正伟大的作品，无论过多少个世纪，读来依然振聋发聩，仿佛就在写当下的我们。",
    date: "2025-11-01"
  },
  {
    title: "虚构的真实性",
    content: "历史记录发生了什么，而文学记录可能发生什么。亚里士多德认为诗比历史更具哲学性，因为它描述的是普遍的真理，而非偶然的事实。",
    date: "2025-12-10"
  },
  {
    title: "作为他者的读者",
    content: "阅读是唯一的“灵魂附体”技术。我们在阅读中暂时放弃自我，进入他人的意识，体验从未经历过的人生。这是对抗偏见与狭隘的最强解药。",
    date: "2026-01-05"
  }
];

export default function Literature() {
  return (
    <SubjectPageLayout
      title="Literature"
      subtitle="人类经验的审美形式与叙事重构"
      backgroundImage={literatureBg}
      notes={notes}
      resources={resources}
      insights={insights}
      history={[
        { year: "8th C BC", event: "Homer: Iliad & Odyssey" },
        { year: "1320", event: "Dante: Divine Comedy" },
        { year: "1600", event: "Shakespeare: Hamlet" },
        { year: "1605", event: "Cervantes: Don Quixote" },
        { year: "1791", event: "Cao Xueqin: Dream of Red Chamber" },
        { year: "1857", event: "Flaubert: Madame Bovary (Realism)" },
        { year: "1922", event: "Joyce: Ulysses (Modernism)" },
        { year: "1967", event: "Marquez: One Hundred Years of Solitude" }
      ]}
    />
  );
}
