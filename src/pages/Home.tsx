import { PageLayout } from "@/components/PageLayout";
import heroBg from "@/assets/hero.jpeg";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Terminal, User, Code, Database, Cpu, Activity, Globe, Users, Wrench, Feather } from "lucide-react";
import { GlitchText } from "@/components/GlitchText";
import { TypingAnimation } from "@/components/TypingAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <PageLayout
      title="IDENTITY_CONFIRMED"
      subtitle="欢迎访问 idontgetai 的数字思维空间"
      backgroundImage={heroBg}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Profile & Terminal (4 cols) */}
        <div className="lg:col-span-5 space-y-6">
            {/* Profile Card */}
            <Card className="bg-black/60 border-primary/30 backdrop-blur-md overflow-hidden relative group min-h-[280px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                <CardContent className="pt-8 text-center space-y-4 min-h-[280px] flex flex-col justify-center">
                    <div className="relative mx-auto w-32 h-32 rounded-full border-2 border-primary/50 flex items-center justify-center bg-black overflow-hidden group-hover:border-primary transition-colors flex-shrink-0">
                        <User className="w-16 h-16 text-primary/80" />
                        <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                    </div>
                    <div className="flex-shrink-0">
                        <h2 className="text-3xl font-display text-white"><GlitchText text="idontgetai" /></h2>
                        <p className="text-primary font-mono text-sm mt-1">
                             LEVEL 5 OBSERVER
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 pt-2 flex-shrink-0">
                        <Badge variant="outline" className="border-primary/40 text-primary font-mono text-xs">AI Researcher</Badge>
                        <Badge variant="outline" className="border-secondary/40 text-secondary font-mono text-xs">Math Geek</Badge>
                        <Badge variant="outline" className="border-white/20 text-muted-foreground font-mono text-xs">Philomath</Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Terminal Bio */}
            <div className="font-mono text-sm bg-black/80 border border-primary/20 rounded-lg h-[300px] flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="flex items-center gap-2 border-b border-primary/10 pb-2 mb-2 flex-shrink-0 px-4 pt-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="text-xs text-muted-foreground ml-2">user@idontgetai:~</span>
                </div>
                <ScrollArea className="flex-1 pr-2 min-h-0 px-4 pb-4">
                    <div className="space-y-4 text-primary/80">
                        <div className="min-h-[60px]">
                            <span className="text-secondary">$</span> <span className="text-white">whoami</span>
                            <p className="mt-1 text-muted-foreground leading-relaxed pl-4 border-l border-primary/20">
                                一个游走在代码与真理之间的探索者。试图通过 AI 理解智能的本质，通过数学窥探宇宙的法则，通过哲学寻找存在的意义。
                            </p>
                        </div>
                         <div className="min-h-[100px]">
                            <span className="text-secondary">$</span> <span className="text-white">cat current_mission.txt</span>
                            <div className="mt-1 pl-4 border-l border-primary/20 text-muted-foreground">
                                <TypingAnimation 
                                    text={"> 建立全学科知识图谱...\n> 探索通用人工智能 (AGI) 路径...\n> 寻找经济系统的数学极值..."}
                                    speed={30} 
                                    delay={500} 
                                />
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>

        {/* Right Column: Dashboard & Navigation (8 cols) */}
        <div className="lg:col-span-7 space-y-6">
            {/* Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <Card className="bg-black/40 border-primary/20 hover:bg-primary/5 transition-colors group min-h-[120px]">
                    <CardHeader className="pb-2 flex-shrink-0">
                        <CardTitle className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-primary" /> SYSTEM LOAD
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center flex-1">
                        <div className="text-2xl font-display text-white">87%</div>
                        <div className="h-1 w-full bg-primary/20 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[87%] animate-pulse" />
                        </div>
                    </CardContent>
                 </Card>
                 <Card className="bg-black/40 border-secondary/20 hover:bg-secondary/5 transition-colors group min-h-[120px]">
                    <CardHeader className="pb-2 flex-shrink-0">
                        <CardTitle className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                            <Database className="w-4 h-4 text-secondary" /> KNOWLEDGE NODES
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center flex-1">
                        <div className="text-2xl font-display text-white">1,024</div>
                        <p className="text-xs text-secondary mt-1">+12 this week</p>
                    </CardContent>
                 </Card>
            </div>

            {/* Quick Navigation Matrix */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                    { label: "AI 核心", url: "/ai", icon: Cpu, color: "text-primary" },
                    { label: "数学迷宫", url: "/math", icon: Code, color: "text-secondary" },
                    { label: "物理法则", url: "/physics", icon: Globe, color: "text-blue-400" },
                    { label: "哲学思辨", url: "/philosophy", icon: User, color: "text-purple-400" },
                    { label: "心理模型", url: "/psychology", icon: Activity, color: "text-pink-400" },
                    { label: "经济博弈", url: "/economics", icon: Database, color: "text-yellow-400" },
                    { label: "文学殿堂", url: "/literature", icon: Feather, color: "text-orange-400" },
                    { label: "人文社科", url: "/humanities", icon: Users, color: "text-red-400" },
                    { label: "神兵利器", url: "/tools", icon: Wrench, color: "text-green-400" },
                ].map((nav) => (
                    <Link key={nav.url} href={nav.url}>
                        <div className="h-32 bg-black/40 border border-border/20 rounded-lg p-4 flex flex-col justify-between hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group relative overflow-hidden min-h-[128px]">
                             <div className={`absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full transition-transform group-hover:scale-150`} />
                             <nav.icon className={`w-8 h-8 ${nav.color} opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0`} />
                             <div className="flex items-center justify-between flex-shrink-0">
                                 <span className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors">{nav.label}</span>
                                 <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                             </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quote / Footer */}
            <div className="p-6 border-l-2 border-primary/50 bg-gradient-to-r from-primary/5 to-transparent min-h-[120px] h-[120px] flex flex-col justify-center overflow-hidden">
                <blockquote className="font-mono text-sm italic text-muted-foreground leading-relaxed">
                    "<GlitchText text="The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion." hover={false} />"
                </blockquote>
                <p className="text-right text-xs text-primary mt-2 flex-shrink-0">- Albert Camus</p>
            </div>
        </div>
      </div>
    </PageLayout>
  );
}
