import { PageLayout } from "@/components/PageLayout";
import toolsBg from "@/assets/tools.jpeg";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Terminal, Book, Cpu, PenTool, Database, Sigma, Atom, Globe, BarChart3, Brain, FileText, Calculator, Library, Feather, Search, Layers, Activity } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Define categories for filtering
type CategoryType = "All" | "AI & Dev" | "Math & Phys" | "Econ & Data" | "Psych & Phil" | "Lit & Human" | "General";

interface ToolItem {
  name: string;
  desc: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  category: CategoryType;
  featured?: boolean;
}

const categories: CategoryType[] = ["All", "AI & Dev", "Math & Phys", "Econ & Data", "Psych & Phil", "Lit & Human", "General"];

const tools: ToolItem[] = [
  // --- AI & Dev ---
  {
    name: "ChatGPT",
    desc: "OpenAI 的旗舰大模型。代码生成、创意写作、知识问答的通用助手。",
    url: "https://chat.openai.com/",
    icon: Brain,
    category: "AI & Dev",
    featured: true
  },
  {
    name: "Claude",
    desc: "Anthropic 开发的 AI 助手。擅长长文本分析、逻辑推理和自然对话。",
    url: "https://claude.ai/",
    icon: Brain,
    category: "AI & Dev",
    featured: true
  },
  {
    name: "Hugging Face",
    desc: "AI 领域的 GitHub。开源模型、数据集、Demo 的集散地。",
    url: "https://huggingface.co/",
    icon: Layers,
    category: "AI & Dev",
    featured: true
  },
  {
    name: "Visual Studio Code",
    desc: "地表最强代码编辑器。配合 Copilot 与插件生态，无所不能。",
    url: "https://code.visualstudio.com/",
    icon: Terminal,
    category: "AI & Dev"
  },
  {
    name: "Cursor",
    desc: "AI Native 代码编辑器。深度集成 LLM，支持代码库问答和自动补全。",
    url: "https://cursor.sh/",
    icon: Terminal,
    category: "AI & Dev"
  },
  {
    name: "Google Colab",
    desc: "云端 Jupyter Notebook。免费 GPU 算力 (T4/V100)，快速验证模型。",
    url: "https://colab.research.google.com/",
    icon: Cpu,
    category: "AI & Dev"
  },
  {
    name: "LangChain",
    desc: "构建 LLM 应用的框架。连接模型、向量数据库与外部工具的桥梁。",
    url: "https://python.langchain.com/",
    icon: Layers,
    category: "AI & Dev"
  },

  // --- Math & Phys ---
  {
    name: "WolframAlpha",
    desc: "计算知识引擎。符号计算、数学推导、科学常数查询的神器。",
    url: "https://www.wolframalpha.com/",
    icon: Sigma,
    category: "Math & Phys",
    featured: true
  },
  {
    name: "Mathematica",
    desc: "工业级科学计算软件。数值分析、符号运算与可视化的终极工具。",
    url: "https://www.wolfram.com/mathematica/",
    icon: Calculator,
    category: "Math & Phys"
  },
  {
    name: "GeoGebra",
    desc: "动态数学软件。几何、代数、微积分的交互式可视化工具。",
    url: "https://www.geogebra.org/",
    icon: Sigma,
    category: "Math & Phys"
  },
  {
    name: "Desmos",
    desc: "最好用的在线图形计算器。函数绘图流畅丝滑。",
    url: "https://www.desmos.com/",
    icon: BarChart3,
    category: "Math & Phys"
  },
  {
    name: "LaTeX (Overleaf)",
    desc: "学术排版标准。Overleaf 提供了云端协作环境，免去配置之苦。",
    url: "https://www.overleaf.com/",
    icon: PenTool,
    category: "Math & Phys"
  },
  {
    name: "PhET Simulations",
    desc: "物理、化学、生物的交互式仿真。直观理解量子隧道效应等抽象概念。",
    url: "https://phet.colorado.edu/",
    icon: Atom,
    category: "Math & Phys",
    featured: true
  },
  {
    name: "Manim",
    desc: "3Blue1Brown 开发的数学动画引擎 (Python)。用代码绘制数学之美。",
    url: "https://www.manim.community/",
    icon: Sigma,
    category: "Math & Phys"
  },

  // --- Econ & Data ---
  {
    name: "FRED",
    desc: "圣路易斯联储经济数据库。获取 CPI、GDP 等宏观数据的权威来源。",
    url: "https://fred.stlouisfed.org/",
    icon: BarChart3,
    category: "Econ & Data",
    featured: true
  },
  {
    name: "The World Bank Data",
    desc: "世界银行开放数据。全球发展指标，涵盖贫困、金融、环境等。",
    url: "https://data.worldbank.org/",
    icon: Globe,
    category: "Econ & Data"
  },
  {
    name: "Our World in Data",
    desc: "用数据看世界。针对全球重大问题（气候、健康）的深度数据分析。",
    url: "https://ourworldindata.org/",
    icon: Database,
    category: "Econ & Data"
  },
  {
    name: "TradingView",
    desc: "金融市场分析平台。强大的图表工具和 Pine Script 策略编写。",
    url: "https://www.tradingview.com/",
    icon: BarChart3,
    category: "Econ & Data"
  },
  {
    name: "Kaggle",
    desc: "数据科学社区。海量数据集、竞赛和 Notebook 分享。",
    url: "https://www.kaggle.com/",
    icon: Database,
    category: "Econ & Data"
  },

  // --- Psych & Phil ---
  {
    name: "PsychoPy",
    desc: "开源心理学实验生成器。用于神经科学和实验心理学的精确刺激呈现。",
    url: "https://www.psychopy.org/",
    icon: Activity,
    category: "Psych & Phil"
  },
  {
    name: "APA PsycNet",
    desc: "美国心理学会数据库。查找心理学核心文献的权威平台。",
    url: "https://psycnet.apa.org/",
    icon: Book,
    category: "Psych & Phil"
  },
  {
    name: "SEP (Stanford Encyclopedia)",
    desc: "斯坦福哲学百科全书。哲学界最权威、最高质量的在线参考书。",
    url: "https://plato.stanford.edu/",
    icon: Library,
    category: "Psych & Phil",
    featured: true
  },
  {
    name: "PhilPapers",
    desc: "哲学论文索引与目录。追踪哲学领域最新研究成果。",
    url: "https://philpapers.org/",
    icon: FileText,
    category: "Psych & Phil"
  },

  // --- Lit & Human ---
  {
    name: "Project Gutenberg",
    desc: "古腾堡计划。提供 70,000+ 免费电子书，聚焦公有领域经典文学。",
    url: "https://www.gutenberg.org/",
    icon: Book,
    category: "Lit & Human",
    featured: true
  },
  {
    name: "Google Books Ngram Viewer",
    desc: "文化趋势分析工具。通过数百万书籍的词频统计，可视化历史变迁。",
    url: "https://books.google.com/ngrams",
    icon: BarChart3,
    category: "Lit & Human"
  },
  {
    name: "JSTOR",
    desc: "学术期刊库。人文社科领域（文学、历史、社会学）的核心资源。",
    url: "https://www.jstor.org/",
    icon: Library,
    category: "Lit & Human"
  },
  {
    name: "Internet Archive",
    desc: "互联网档案馆。Wayback Machine 保存网页历史，亦有海量图书。",
    url: "https://archive.org/",
    icon: Database,
    category: "Lit & Human"
  },
  {
    name: "Scrivener",
    desc: "长篇写作神器。专为小说家和学术论文作者设计，强大的结构化管理。",
    url: "https://www.literatureandlatte.com/scrivener/overview",
    icon: Feather,
    category: "Lit & Human"
  },

  // --- General ---
  {
    name: "Z-Library",
    desc: "全球最大数字图书馆之一。海量电子书与文献下载。",
    url: "https://z-lib.fm/",
    icon: Book,
    category: "General",
    featured: true
  },
  {
    name: "Anna's Archive",
    desc: "影子图书馆搜索引擎。聚合 Sci-Hub, LibGen 等数据源。",
    url: "https://annas-archive.org/",
    icon: Search,
    category: "General",
    featured: true
  },
  {
    name: "Sci-Hub",
    desc: "打破学术高墙。输入 DOI 即可获取论文 PDF。(Use responsibly)",
    url: "https://sci-hub.se/",
    icon: Globe,
    category: "General"
  },
  {
    name: "Obsidian",
    desc: "本地 Markdown 知识库。双向链接，卡片笔记法 (Zettelkasten) 最佳实践。",
    url: "https://obsidian.md/",
    icon: FileText,
    category: "General",
    featured: true
  },
  {
    name: "Zotero",
    desc: "开源文献管理工具。一键抓取元数据，自动生成引用。",
    url: "https://www.zotero.org/",
    icon: Book,
    category: "General"
  },
  {
    name: "Excalidraw",
    desc: "手绘风格白板。绘制系统架构、逻辑流程图的最佳工具。",
    url: "https://excalidraw.com/",
    icon: PenTool,
    category: "General"
  }
];

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("All");

  const filteredTools = activeCategory === "All" 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  return (
    <PageLayout
      title="Arsenal"
      subtitle="工欲善其事，必先利其器"
      backgroundImage={toolsBg}
    >
      <div className="space-y-10">
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 pb-2">
            {categories.map(cat => (
                <Button 
                    key={cat} 
                    variant={activeCategory === cat ? "default" : "outline"} 
                    onClick={() => setActiveCategory(cat)}
                    size="sm" 
                    className={cn(
                        "font-mono text-xs rounded-full transition-all",
                        activeCategory === cat 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_10px_var(--primary)]" 
                            : "bg-black/40 text-muted-foreground border-primary/30 hover:border-primary hover:text-primary"
                    )}
                >
                    {cat}
                </Button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredTools.map((tool) => (
                <Card key={tool.name} className={cn(
                    "bg-black/40 border-primary/20 hover:border-primary/60 transition-all backdrop-blur-sm group relative overflow-hidden h-full flex flex-col",
                    tool.featured ? "border-l-4 border-l-primary shadow-[inset_10px_0_20px_-10px_rgba(var(--primary),0.1)]" : ""
                )}>
                    {tool.featured && (
                        <div className="absolute top-0 right-0 bg-primary/20 text-primary text-[10px] font-mono px-2 py-1 rounded-bl border-b border-l border-primary/20">
                            ESSENTIAL
                        </div>
                    )}
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors border border-white/5 group-hover:border-primary/30">
                                    <tool.icon className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
                                </div>
                                <CardTitle className="font-display text-base text-white group-hover:text-primary transition-colors">
                                    {tool.name}
                                </CardTitle>
                            </div>
                            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-white transition-colors" />
                            </a>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                        <CardDescription className="text-gray-400 mb-4 text-sm leading-relaxed">
                            {tool.desc}
                        </CardDescription>
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                             <Badge variant="outline" className="border-white/10 text-[10px] text-muted-foreground group-hover:border-primary/30 group-hover:text-primary/70 font-mono">
                                {tool.category}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </PageLayout>
  );
}
