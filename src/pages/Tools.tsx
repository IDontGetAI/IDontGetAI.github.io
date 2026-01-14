import { PageLayout } from "@/components/PageLayout";
import toolsBg from "@/assets/tools.jpeg";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Terminal, Book, Cpu, PenTool, Database, Sigma, Globe, BarChart3, Brain, FileText, Calculator, Library, Feather, Search, Layers, Activity } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Define categories for filtering
type CategoryType = "All" | "AI" | "Dev" | "Math & Phys" | "Phil" | "Psych" | "Econ" | "Lit" | "Human" | "Write" | "General";

interface ToolItem {
  name: string;
  desc: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  category: CategoryType;
  featured?: boolean;
}

const categories: CategoryType[] = ["All", "AI", "Dev", "Math & Phys", "Phil", "Psych", "Econ", "Lit", "Human", "Write", "General"];

const tools: ToolItem[] = [
  // --- AI ---
  {
    name: "ChatGPT",
    desc: "OpenAI 的旗舰大模型。代码生成、创意写作、知识问答的通用助手。",
    url: "https://chat.openai.com/",
    icon: Brain,
    category: "AI",
    featured: true
  },
  {
    name: "Gemini",
    desc: "Google 最强多模态模型。深度整合 Google 生态，长上下文处理能力惊人。",
    url: "https://gemini.google.com/",
    icon: Brain,
    category: "AI",
    featured: true
  },
  {
    name: "Qwen (通义千问)",
    desc: "Alibaba 打造的通义千问。中文理解能力卓越，开源生态活跃。",
    url: "https://tongyi.aliyun.com/",
    icon: Brain,
    category: "AI"
  },
  {
    name: "Doubao (豆包)",
    desc: "ByteDance 智能助手。日常对话流畅，语音交互体验优秀。",
    url: "https://www.doubao.com/",
    icon: Brain,
    category: "AI"
  },
  {
    name: "Hugging Face",
    desc: "AI 领域的 GitHub。开源模型、数据集、Demo 的集散地。",
    url: "https://huggingface.co/",
    icon: Layers,
    category: "AI",
    featured: true
  },
  {
    name: "LM Studio",
    desc: "本地运行 LLM 的神器。在自己的设备上轻松跑通各种开源模型。",
    url: "https://lmstudio.ai/",
    icon: Cpu,
    category: "AI"
  },
  {
    name: "LangChain",
    desc: "构建 LLM 应用的框架。连接模型、向量数据库与外部工具的桥梁。",
    url: "https://www.langchain.com/",
    icon: Layers,
    category: "AI"
  },
  {
    name: "Kaggle",
    desc: "数据科学竞赛平台。海量数据集、Notebook 分享与模型竞技场。",
    url: "https://www.kaggle.com/",
    icon: Database,
    category: "AI"
  },

  // --- Dev ---
  {
    name: "Anaconda",
    desc: "Python 数据科学全家桶。包管理、环境隔离，科学计算必备。",
    url: "https://www.anaconda.com/",
    icon: Terminal,
    category: "Dev"
  },
  {
    name: "Jupyter Notebook",
    desc: "交互式计算笔记本。代码、文本、公式、图表混排，探索性编程首选。",
    url: "https://jupyter.org/",
    icon: Terminal,
    category: "Dev",
    featured: true
  },
  {
    name: "Google Colab",
    desc: "云端 Jupyter Notebook。免费 GPU 算力 (T4/V100)，快速验证模型。",
    url: "https://colab.research.google.com/",
    icon: Cpu,
    category: "Dev"
  },
  {
    name: "Visual Studio Code",
    desc: "地表最强代码编辑器。配合 Copilot 与插件生态，无所不能。",
    url: "https://code.visualstudio.com/",
    icon: Terminal,
    category: "Dev",
    featured: true
  },
  {
    name: "Trae",
    desc: "新一代 AI 原生 IDE。重新定义编码体验，让 AI 成为真正的结对编程伙伴。",
    url: "https://www.trae.ai/",
    icon: Terminal,
    category: "Dev",
    featured: true
  },
  {
    name: "Antigravity",
    desc: "Google 打造的 Agent-first IDE。让智能体自主规划、编码与验证。",
    url: "https://antigravity.google/",
    icon: Terminal,
    category: "Dev"
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
    name: "Manim",
    desc: "3Blue1Brown 开发的数学动画引擎 (Python)。用代码绘制数学之美。",
    url: "https://www.manim.community/",
    icon: Sigma,
    category: "Math & Phys"
  },

  // --- Phil ---
  {
    name: "SEP (Stanford Encyclopedia)",
    desc: "斯坦福哲学百科全书。哲学界最权威、最高质量的在线参考书。",
    url: "https://plato.stanford.edu/",
    icon: Library,
    category: "Phil",
    featured: true
  },
  {
    name: "IEP (Internet Encyclopedia)",
    desc: "互联网哲学百科全书。学术同行评审，更通俗易懂的哲学资源。",
    url: "https://iep.utm.edu/",
    icon: Library,
    category: "Phil"
  },
  {
    name: "Chinese Text Project (CText)",
    desc: "中国哲学书电子化计划。最全的先秦两汉典籍数据库。",
    url: "https://ctext.org/",
    icon: Book,
    category: "Phil"
  },
  {
    name: "Argdown",
    desc: "论证可视化工具。用简单的语法绘制复杂的论证逻辑图。",
    url: "https://argdown.org/",
    icon: FileText,
    category: "Phil"
  },
  {
    name: "Project Gutenberg",
    desc: "古腾堡计划。提供 70,000+ 免费电子书，聚焦公有领域经典。",
    url: "https://www.gutenberg.org/",
    icon: Book,
    category: "Phil"
  },

  // --- Psych ---
  {
    name: "PsychoPy",
    desc: "开源心理学实验生成器。用于神经科学和实验心理学的精确刺激呈现。",
    url: "https://www.psychopy.org/",
    icon: Activity,
    category: "Psych"
  },
  {
    name: "OpenSesame",
    desc: "图形化心理实验构建工具。无需编程即可设计复杂的行为实验。",
    url: "https://osdoc.cogsci.nl/",
    icon: Activity,
    category: "Psych"
  },
  {
    name: "JASP",
    desc: "免费友好的统计软件。贝叶斯统计与频率统计的现代化替代方案。",
    url: "https://jasp-stats.org/",
    icon: BarChart3,
    category: "Psych"
  },
  {
    name: "APA",
    desc: "美国心理学会官网。心理学学术标准、出版物与资源中心。",
    url: "https://www.apa.org/",
    icon: Book,
    category: "Psych"
  },
  {
    name: "DSM-5-TR",
    desc: "精神障碍诊断与统计手册。精神医学与临床心理学的“圣经”。",
    url: "https://www.psychiatry.org/psychiatrists/practice/dsm",
    icon: Book,
    category: "Psych"
  },

  // --- Econ ---
  {
    name: "FRED",
    desc: "圣路易斯联储经济数据库。获取 CPI、GDP 等宏观数据的权威来源。",
    url: "https://fred.stlouisfed.org/",
    icon: BarChart3,
    category: "Econ",
    featured: true
  },
  {
    name: "The World Bank Data",
    desc: "世界银行开放数据。全球发展指标，涵盖贫困、金融、环境等。",
    url: "https://data.worldbank.org/",
    icon: Globe,
    category: "Econ"
  },
  {
    name: "Our World in Data",
    desc: "用数据看世界。针对全球重大问题（气候、健康）的深度数据分析。",
    url: "https://ourworldindata.org/",
    icon: Database,
    category: "Econ",
    featured: true
  },
  {
    name: "TradingView",
    desc: "金融市场分析平台。强大的图表工具和 Pine Script 策略编写。",
    url: "https://www.tradingview.com/",
    icon: BarChart3,
    category: "Econ"
  },
  {
    name: "Tushare",
    desc: "大数据开放社区。免费提供各类金融数据，支持 Python/R 接口。",
    url: "https://tushare.pro/",
    icon: Database,
    category: "Econ"
  },
  {
    name: "Gapminder",
    desc: "独立的数据可视化机构。消除对全球发展的无知，展示真实世界。",
    url: "https://www.gapminder.org/",
    icon: Globe,
    category: "Econ"
  },
  {
    name: "OEC",
    desc: "经济复杂性观测台。可视化全球贸易流向与经济结构。",
    url: "https://oec.world/",
    icon: Globe,
    category: "Econ"
  },

  // --- Lit ---
  {
    name: "古诗文网",
    desc: "经典传承。收录最全的古诗文、名句及赏析。",
    url: "https://www.gushiwen.cn/",
    icon: Feather,
    category: "Lit"
  },
  // Project Gutenberg is already in Phil, but can be added here too if needed. 
  // User listed it under Lit as well. Since we filter by category string, we need a separate entry or handle multi-category (current setup is single category).
  // I'll add a separate entry for Lit to ensure it shows up.
  {
    name: "Project Gutenberg (Lit)",
    desc: "古腾堡计划。提供 70,000+ 免费电子书，聚焦公有领域经典文学。",
    url: "https://www.gutenberg.org/",
    icon: Book,
    category: "Lit"
  },
  {
    name: "Voyant Tools",
    desc: "基于 Web 的文本阅读与分析环境。数字人文领域的文本挖掘利器。",
    url: "https://voyant-tools.org/",
    icon: Search,
    category: "Lit"
  },

  // --- Human ---
  {
    name: "Google Arts & Culture",
    desc: "谷歌艺术与文化。在线探索世界各地的博物馆珍藏与文化遗产。",
    url: "https://artsandculture.google.com/",
    icon: Globe,
    category: "Human",
    featured: true
  },
  {
    name: "CHGIS",
    desc: "中国历史地理信息系统。哈佛大学与复旦大学合作构建的基础地理数据库。",
    url: "https://sites.fas.harvard.edu/~chgis/",
    icon: Globe,
    category: "Human"
  },
  {
    name: "Gephi",
    desc: "开源网络可视化软件。探索数据中的关联，适用于社交网络分析等。",
    url: "https://gephi.org/",
    icon: Activity,
    category: "Human"
  },
  {
    name: "Flomo (浮墨)",
    desc: "卡片笔记工具。像发推特一样记录想法，积少成多，连接知识。",
    url: "https://flomoapp.com/",
    icon: PenTool,
    category: "Human"
  },

  // --- Write ---
  {
    name: "LaTeX",
    desc: "高质量排版系统。学术论文、科技文档写作的标准工具。",
    url: "https://www.latex-project.org/",
    icon: FileText,
    category: "Write"
  },
  {
    name: "Typst",
    desc: "新一代科学排版系统。比 LaTeX 更易学、编译更快、现代化的替代品。",
    url: "https://typst.app/",
    icon: FileText,
    category: "Write",
    featured: true
  },
  {
    name: "Overleaf",
    desc: "在线 LaTeX 编辑器。云端协作，实时预览，丰富的模板库。",
    url: "https://www.overleaf.com/",
    icon: FileText,
    category: "Write"
  },
  {
    name: "Markdown",
    desc: "轻量级标记语言。用纯文本编写格式化文档，专注于写作本身。",
    url: "https://daringfireball.net/projects/markdown/",
    icon: FileText,
    category: "Write"
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
    name: "Typora",
    desc: "所见即所得的 Markdown 编辑器。极致简洁，写作体验极佳。",
    url: "https://typora.io/",
    icon: FileText,
    category: "General"
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
            {filteredTools.map((tool, index) => (
                <Card key={`${tool.name}-${index}`} className={cn(
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
