import {
  SubjectPageLayout,
  type ContentData,
  type NoteItem,
  type ResourceItem,
  type InsightItem,
} from "@/components/SubjectPageLayout";
import literatureBg from "@/assets/literature.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 文学理论 (Literary Theory)",
    items: [
      {
        title: "俄国形式主义 (Russian Formalism)",
        content:
          "文学性 (Literariness) 在于语言的“陌生化” (Defamiliarization)。什克洛夫斯基：艺术的技巧就是使对象变得陌生，使形式变得困难，增加感觉的难度和时间长度。",
        date: "2025-06-05",
        tags: ["Formalism", "Defamiliarization"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/literature/formalism-1",
          },
        ],
      },
      {
        title: "新批评 (New Criticism)",
        content:
          "文本细读 (Close Reading)。意图谬误 (Intentional Fallacy) 与感受谬误 (Affective Fallacy)。文本是一个自足的有机体，意义在于其内部的张力、反讽和悖论。",
        date: "2025-06-20",
        tags: ["NewCriticism", "CloseReading"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/literature/new-criticism-1",
          },
        ],
      },
      {
        title:
          "结构主义与解构 (Structuralism & Deconstruction)",
        content:
          "罗兰·巴特：作者已死。德里达：延异 (Différance)。文本没有固定的中心或终极意义，只有无尽的能指游戏。",
        date: "2025-07-10",
        tags: ["PostStructuralism", "Derrida"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/literature/deconstruction-1",
          },
        ],
      },
    ],
  },
  {
    category: "II. 文学史 (Literary History)",
    items: [
      {
        title: "古希腊悲剧 (Greek Tragedy)",
        content:
          "索福克勒斯《俄狄浦斯王》。亚里士多德《诗学》：悲剧的净化 (Catharsis) 作用。命运与性格的冲突。",
        date: "2025-08-01",
        tags: ["Tragedy", "Aristotle"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/literature/greek-tragedy-1",
          },
        ],
      },
      {
        title: "现代主义 (Modernism)",
        content:
          "乔伊斯、卡夫卡、普鲁斯特。意识流 (Stream of Consciousness)。在这个破碎的世界中，传统的叙事结构已无法捕捉真实体验。向内转。",
        date: "2025-08-15",
        tags: ["Modernism", "StreamOfConsciousness"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/literature/modernism-1",
          },
        ],
      },
      {
        title: "魔幻现实主义 (Magical Realism)",
        content:
          "马尔克斯《百年孤独》。在拉丁美洲，现实本身就比虚构更魔幻。神话与历史的交织。",
        date: "2025-09-01",
        tags: ["Marquez", "LatinAmerica"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/literature/magical-realism-1",
          },
        ],
      },
    ],
  },
  {
    category: "III. 比较文学 (Comparative Literature)",
    items: [
      {
        title: "世界文学 (Weltliteratur)",
        content:
          "歌德的概念。文学不应局限于民族国家的边界。通过翻译和跨文化交流，形成一种普世的文学对话。",
        date: "2025-09-20",
        tags: ["Goethe", "Translation"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/literature/world-lit-1",
          },
        ],
      },
      {
        title: "影响研究与平行研究",
        content:
          "从实证的影响关系（法国学派）到无直接联系的类同性研究（美国学派）。寻找跨越时空的人类心灵共鸣。",
        date: "2025-10-05",
        tags: ["Comparative", "Methodology"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/literature/comparative-1",
          },
        ],
      },
    ],
  },
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 文学理论 (Literary Theory)",
    items: [
      {
        title: "俄国形式主义 (Russian Formalism)",
        content: "什克洛夫斯基与雅各布森。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Literature+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Literature+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Literature",
            type: "Database",
          },
        ],
      },
      {
        title: "新批评 (New Criticism)",
        content: "瑞恰兹与燕卜荪。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Literature+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Literature+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Literature",
            type: "Database",
          },
        ],
      },
      {
        title:
          "结构主义与解构 (Structuralism & Deconstruction)",
        content: "巴特与德里达。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Literature+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Literature+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Literature",
            type: "Database",
          },
        ],
      },
    ],
  },
  {
    category: "II. 文学史 (Literary History)",
    items: [
      {
        title: "古希腊悲剧 (Greek Tragedy)",
        content: "埃斯库罗斯、索福克勒斯、欧里庇得斯。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Literature+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Literature+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Literature",
            type: "Database",
          },
        ],
      },
      {
        title: "现代主义 (Modernism)",
        content: "尤利西斯、追忆似水年华。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Literature+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Literature+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Literature",
            type: "Database",
          },
        ],
      },
      {
        title: "魔幻现实主义 (Magical Realism)",
        content: "博尔赫斯与马尔克斯。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Literature+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Literature+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Literature",
            type: "Database",
          },
        ],
      },
    ],
  },
  {
    category: "III. 比较文学 (Comparative Literature)",
    items: [
      {
        title: "世界文学 (Weltliteratur)",
        content: "歌德谈话录。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Literature+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Literature+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Literature",
            type: "Database",
          },
        ],
      },
      {
        title: "影响研究与平行研究",
        content: "梵·第根。",
        links: [
          {
            title: "Search Online Courses",
            url: "https://www.google.com/search?q=Literature+Online+Course",
            type: "Video",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Literature+Books",
            type: "Book",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/scholar?q=Literature",
            type: "Database",
          },
        ],
      },
    ],
  },
];

const insights: InsightItem[] = [
  {
    title: "文学即新闻",
    content:
      "庞德说：“文学是那种以此为新闻的新闻 (Literature is news that stays news)。” 真正伟大的作品，无论过多少个世纪，读来依然振聋发聩，仿佛就在写当下的我们。",
    date: "2025-11-01",
    link: "/logs/literature/news",
  },
  {
    title: "虚构的真实性",
    content:
      "历史记录发生了什么，而文学记录可能发生什么。亚里士多德认为诗比历史更具哲学性，因为它描述的是普遍的真理，而非偶然的事实。",
    date: "2025-12-10",
    link: "/logs/literature/truth",
  },
  {
    title: "作为他者的读者",
    content:
      "阅读是唯一的“灵魂附体”技术。我们在阅读中暂时放弃自我，进入他人的意识，体验从未经历过的人生。这是对抗偏见与狭隘的最强解药。",
    date: "2026-01-05",
    link: "/logs/literature/empathy",
  },
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
        {
          year: "8th C BC",
          event: "Homer: Iliad & Odyssey",
        },
        {
          year: "1320",
          event: "Dante: Divine Comedy",
        },
        {
          year: "1600",
          event: "Shakespeare: Hamlet",
        },
        {
          year: "1605",
          event: "Cervantes: Don Quixote",
        },
        {
          year: "1791",
          event: "Cao Xueqin: Dream of Red Chamber",
        },
        {
          year: "1857",
          event: "Flaubert: Madame Bovary (Realism)",
        },
        {
          year: "1922",
          event: "Joyce: Ulysses (Modernism)",
        },
        {
          year: "1967",
          event: "Marquez: One Hundred Years of Solitude",
        },
      ]}
    />
  );
}
