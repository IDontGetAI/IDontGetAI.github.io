import { SubjectPageLayout, type ContentData, type NoteItem, type ResourceItem, type InsightItem, type HistoryItem } from "@/components/SubjectPageLayout";
import humanitiesBg from "@/assets/humanities.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 人文社科 (Humanities)",
    items: [
      {
        title: "Sociology: The Iron Cage",
        content: "马克斯·韦伯 (Max Weber) 的理性化铁笼。现代社会通过科层制 (Bureaucracy) 和工具理性 (Instrumental Rationality) 追求效率，却导致了意义的丧失和个体的异化。我们被困在自己制造的制度中。",
        date: "2025-06-10",
        tags: ["Sociology", "Weber"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/humanities/sociology-1" },
            { title: "笔记2 (待添加)", url: "/notes/humanities/sociology-2" }
        ]
      },
      {
        title: "History: The Thucydides Trap",
        content: "修昔底德陷阱：当一个崛起的大国威胁到现有霸主的地位时，战争几乎不可避免。历史不仅仅是事件的堆砌，而是深层结构的不断重演。",
        date: "2025-07-22",
        tags: ["History", "Geopolitics"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/humanities/history-1" },
            { title: "笔记2 (待添加)", url: "/notes/humanities/history-2" }
        ]
      },
      {
        title: "Anthropology: Structuralism",
        content: "列维-斯特劳斯 (Lévi-Strauss)。所有人类文化看似千差万别，实则共享着相同的深层逻辑结构（二元对立：生/熟，男/女，自然/文化）。神话是人类思维的操作系统。",
        date: "2025-08-15",
        tags: ["Anthropology", "Structure"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/humanities/anthropology-1" },
            { title: "笔记2 (待添加)", url: "/notes/humanities/anthropology-2" }
        ]
      },
      {
        title: "Political Science: The Leviathan",
        content: "霍布斯 (Hobbes)：自然状态是“所有人对所有人的战争”。为了生存，人们缔结契约，将权力让渡给主权者（利维坦）。秩序的代价是自由的让渡。",
        date: "2025-09-08",
        tags: ["Politics", "Power"],
        links: [
            { title: "笔记1 (待添加)", url: "/notes/humanities/politics-1" },
            { title: "笔记2 (待添加)", url: "/notes/humanities/politics-2" }
        ]
      }
    ]
  }
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 人文社科 (Humanities)",
    items: [
      {
        title: "Sociology: The Iron Cage",
        content: "韦伯著作选读。",
        links: [
            { title: "Search Online Courses", url: "https://www.google.com/search?q=Humanities+Online+Course", type: "Video" },
            { title: "Search Books", url: "https://www.google.com/search?q=Humanities+Books", type: "Book" },
            { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Humanities", type: "Database" }
        ]
      },
      {
        title: "History: The Thucydides Trap",
        content: "修昔底德与阿里森。",
        links: [
            { title: "Search Online Courses", url: "https://www.google.com/search?q=Humanities+Online+Course", type: "Video" },
            { title: "Search Books", url: "https://www.google.com/search?q=Humanities+Books", type: "Book" },
            { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Humanities", type: "Database" }
        ]
      },
      {
        title: "Anthropology: Structuralism",
        content: "列维-斯特劳斯。",
        links: [
            { title: "Search Online Courses", url: "https://www.google.com/search?q=Humanities+Online+Course", type: "Video" },
            { title: "Search Books", url: "https://www.google.com/search?q=Humanities+Books", type: "Book" },
            { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Humanities", type: "Database" }
        ]
      },
      {
        title: "Political Science: The Leviathan",
        content: "霍布斯。",
        links: [
            { title: "Search Online Courses", url: "https://www.google.com/search?q=Humanities+Online+Course", type: "Video" },
            { title: "Search Books", url: "https://www.google.com/search?q=Humanities+Books", type: "Book" },
            { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Humanities", type: "Database" }
        ]
      }
    ]
  }
];

const insights: InsightItem[] = [
  {
    title: "想象的共同体",
    content: "民族国家本质上是一个“想象的共同体” (Benedict Anderson)。我们与从未谋面的同胞建立联系，仅仅因为我们共享同一套叙事和符号系统。印刷资本主义是其催化剂。",
    date: "2025-10-05",
    link: "/logs/humanities/imagined-communities"
  },
  {
    title: "文明的脆弱性",
    content: "任何文明离野蛮状态只有三顿饭的距离。社会秩序并非理所当然，它建立在复杂的信任网络和资源分配之上。当供应链断裂，社会契约也会随之崩塌。",
    date: "2025-11-20",
    link: "/logs/humanities/fragility"
  }
];

export default function Humanities() {
  return (
    <SubjectPageLayout
      title="Humanities"
      subtitle="解码文明的源代码：社会、历史与权力"
      backgroundImage={humanitiesBg}
      
      notes={notes}
      resources={resources}
      insights={insights}
      history={[
        { year: "440 BC", event: "Herodotus: The Histories" },
        { year: "1513", event: "Machiavelli: The Prince" },
        { year: "1651", event: "Hobbes: Leviathan" },
        { year: "1762", event: "Rousseau: The Social Contract" },
        { year: "1859", event: "Darwin: Origin of Species" },
        { year: "1897", event: "Durkheim: Suicide (Sociology)" },
        { year: "1905", event: "Weber: Protestant Ethic" },
        { year: "1949", event: "Beauvoir: The Second Sex" },
        { year: "1962", event: "Kuhn: Scientific Revolutions" },
        { year: "1978", event: "Said: Orientalism" }
      ]}
    />
  );
}
