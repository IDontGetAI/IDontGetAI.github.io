import { SubjectPageLayout, type ContentData, type NoteItem, type ResourceItem, type InsightItem } from "@/components/SubjectPageLayout";
import psychBg from "@/assets/psych.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 心理学 (Psychology)",
    items: [
      {
        title: "Cognitive Biases: System 1 & 2",
        content: "Kahneman 双系统理论。系统1：快、直觉、省力、易错；系统2：慢、理性、费力。大部分偏差来自系统1的启发式（Heuristics）。",
        date: "2025-06-20",
        tags: ["CognitiveScience", "Kahneman"],
        links: [
            { title: "笔记（待添加）", url: "/notes/psychology/cognitive-1" }
        ]
      },
      {
        title: "Evolutionary Psychology",
        content: "我们的现代头骨里装着石器时代的大脑。焦虑是对捕食者的预警；对糖和脂肪的渴望是对饥荒的适应。理解进化心理学能解释许多“非理性”行为。",
        date: "2025-07-10",
        tags: ["Evolution", "Biology"],
        links: [
            { title: "笔记（待添加）", url: "/notes/psychology/evolutionary-1" }
        ]
      },
      {
        title: "Neuroscience: Plasticity",
        content: "神经可塑性 (Neuroplasticity)：大脑并非定型，而是通过经验不断重塑。Hebbian Theory: Neurons that fire together, wire together.",
        date: "2025-09-05",
        tags: ["Neuroscience", "Brain"],
        links: [
            { title: "笔记（待添加）", url: "/notes/psychology/neuroscience-1" }
        ]
      }
    ]
  }
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 心理学 (Psychology)",
    items: [
      {
        title: "Cognitive Biases: System 1 & 2",
        content: "Thinking, Fast and Slow (Kahneman).",
        links: [
            { title: "Search Online Courses", url: "https://www.google.com/search?q=Psychology+Online+Course", type: "Video" },
            { title: "Search Books", url: "https://www.google.com/search?q=Psychology+Books", type: "Book" },
            { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Psychology", type: "Database" }
        ]
      },
      {
        title: "Evolutionary Psychology",
        content: "The Selfish Gene (Dawkins), Evolutionary Psychology (Buss).",
        links: [
            { title: "Search Online Courses", url: "https://www.google.com/search?q=Psychology+Online+Course", type: "Video" },
            { title: "Search Books", url: "https://www.google.com/search?q=Psychology+Books", type: "Book" },
            { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Psychology", type: "Database" }
        ]
      },
      {
        title: "Neuroscience: Plasticity",
        content: "The Brain that Changes Itself, Huberman Lab.",
        links: [
            { title: "Search Online Courses", url: "https://www.google.com/search?q=Psychology+Online+Course", type: "Video" },
            { title: "Search Books", url: "https://www.google.com/search?q=Psychology+Books", type: "Book" },
            { title: "Google Scholar", url: "https://scholar.google.com/scholar?q=Psychology", type: "Database" }
        ]
      }
    ]
  }
];

const insights: InsightItem[] = [
  {
    title: "自由意志是幻觉吗？",
    content: "Libet 实验显示，在意识到决定之前，大脑已经产生了行动电位。如果你无法控制下一个念头是什么，你是自由的吗？或许我们只是生化算法的旁观者。",
    date: "2025-10-31",
    link: "/logs/psychology/free-will"
  },
  {
    title: "叙事自我 (The Narrative Self)",
    content: "左脑是一个解释器 (The Interpreter)。它不断编造故事来合理化我们的行为，即使这些行为由分裂的右脑或潜意识驱动。我们活在自己编织的连贯故事中。",
    date: "2025-12-08",
    link: "/logs/psychology/narrative-self"
  }
];

export default function Psychology() {
  return (
    <SubjectPageLayout
      title="Psychology"
      subtitle="解构人类心智的黑盒"
      backgroundImage={psychBg}
      
      notes={notes}
      resources={resources}
      insights={insights}
      history={[
        { year: "1879", event: "Wundt: First Psychology Lab" },
        { year: "1890", event: "James: Principles of Psychology" },
        { year: "1900", event: "Freud: Interpretation of Dreams" },
        { year: "1904", event: "Pavlov: Classical Conditioning" },
        { year: "1913", event: "Watson: Behaviorism Manifesto" },
        { year: "1938", event: "Skinner: Behavior of Organisms" },
        { year: "1954", event: "Maslow: Motivation and Personality" },
        { year: "1956", event: "Cognitive Revolution (Miller)" },
        { year: "1961", event: "Bandura: Bobo Doll Experiment" },
        { year: "2011", event: "Kahneman: Thinking, Fast and Slow" }
      ]}
    />
  );
}
