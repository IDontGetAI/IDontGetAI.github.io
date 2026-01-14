import { PageLayout } from "@/components/PageLayout";
import heroBg from "@/assets/hero.jpeg";
import descartesProfile from "@/assets/Descartes profile.png";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Lightbulb,
  BrainCircuit,
  Sigma,
  TrendingUp,
  Atom,
  BookOpen,
  Landmark,
  Activity,
  Wrench,
} from "lucide-react";
import { GlitchText } from "@/components/GlitchText";
import { TypingAnimation } from "@/components/TypingAnimation";
import { NeuralTopologyCanvas } from "@/components/NeuralTopologyCanvas";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [terminalStage, setTerminalStage] = useState<
    "cmd1" | "out1" | "cmd2" | "out2"
  >("cmd1");
  const [statusDots, setStatusDots] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStatusDots((d) => (d + 1) % 4);
    }, 450);
    return () => clearInterval(intervalId);
  }, []);

  const dots = ".".repeat(statusDots).padEnd(3, " ");

  return (
    <PageLayout
      title="IDENTITY_CONFIRMED"
      subtitle="欢迎访问 IDontGetAI 的数字思维空间"
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
                <div className="absolute inset-0 holo-glitch">
                  <img
                    className="holo-glitch-layer holo-glitch-base"
                    src={descartesProfile}
                    alt="Descartes profile"
                  />
                  <img
                    aria-hidden
                    className="holo-glitch-layer holo-glitch-r"
                    src={descartesProfile}
                    alt=""
                  />
                  <img
                    aria-hidden
                    className="holo-glitch-layer holo-glitch-g"
                    src={descartesProfile}
                    alt=""
                  />
                  <img
                    aria-hidden
                    className="holo-glitch-layer holo-glitch-b"
                    src={descartesProfile}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex-shrink-0">
                <h2 className="text-3xl font-display text-white">
                  <a
                    href="https://github.com/IDontGetAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:underline underline-offset-4"
                    aria-label="Open GitHub profile"
                  >
                    <GlitchText text="IDontGetAI" />
                  </a>
                </h2>
                <p className="text-primary font-mono text-sm mt-1">
                  <span className="text-muted-foreground">
                    STATUS:
                  </span>{" "}
                  <span className="text-primary">
                    COMPILING REALITY
                  </span>
                  <span className="whitespace-pre">
                    {dots}
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2 flex-shrink-0">
                <Badge
                  variant="outline"
                  className="border-primary/40 text-primary font-mono text-xs"
                >
                  [ CONSTANTS ]
                </Badge>
                <Badge
                  variant="outline"
                  className="border-secondary/40 text-secondary font-mono text-xs"
                >
                  [ VARIABLES ]
                </Badge>
                <Badge
                  variant="outline"
                  className="border-purple-400/40 text-purple-300 font-mono text-xs"
                >
                  [ ESSENCE ]
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Terminal Bio */}
          <div className="font-mono text-sm bg-black/80 border border-primary/20 rounded-lg h-[300px] flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-primary/10 pb-2 mb-2 flex-shrink-0 px-4 pt-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="text-xs text-muted-foreground ml-2">
                user@idontgetai:~
              </span>
            </div>
            <ScrollArea className="flex-1 pr-2 min-h-0 px-4 pb-4">
              <div className="space-y-4 text-primary/80">
                <div>
                  <span className="text-secondary">$</span>{" "}
                  {terminalStage === "cmd1" ? (
                    <TypingAnimation
                      text="whoami"
                      speed={35}
                      className="text-white"
                      hideCursorAfterComplete
                      onComplete={() =>
                        setTerminalStage("out1")
                      }
                    />
                  ) : (
                    <span className="text-white">
                      whoami
                    </span>
                  )}
                  {terminalStage !== "cmd1" && (
                    <p className="mt-1 text-muted-foreground leading-relaxed pl-4 border-l border-primary/20">
                      {terminalStage === "out1" ? (
                        <TypingAnimation
                          text="一个游走在代码与真理之间的探索者。试图通过 AI 理解智能的本质，通过数学窥探宇宙的法则，通过哲学寻找存在的意义..."
                          speed={10}
                          delay={200}
                          hideCursorAfterComplete
                          onComplete={() =>
                            setTerminalStage("cmd2")
                          }
                        />
                      ) : (
                        "一个游走在代码与真理之间的探索者。试图通过 AI 理解智能的本质，通过数学窥探宇宙的法则，通过哲学寻找存在的意义..."
                      )}
                    </p>
                  )}
                </div>
                {(terminalStage === "cmd2" ||
                  terminalStage === "out2") && (
                  <div>
                    <span className="text-secondary">
                      $
                    </span>{" "}
                    {terminalStage === "cmd2" ? (
                      <TypingAnimation
                        text="cat current_mission.txt"
                        speed={25}
                        className="text-white"
                        delay={250}
                        hideCursorAfterComplete
                        onComplete={() =>
                          setTerminalStage("out2")
                        }
                      />
                    ) : (
                      <span className="text-white">
                        cat current_mission.txt
                      </span>
                    )}
                    <div className="mt-1 pl-4 border-l border-primary/20 text-muted-foreground">
                      {terminalStage === "out2" && (
                        <TypingAnimation
                          text={
                            "> 建立全学科知识图谱...\n> 探索通用人工智能 (AGI) 路径...\n> 寻找经济系统的数学极值...\n> ..."
                          }
                          speed={30}
                          delay={200}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <Card className="bg-black/60 border-secondary/20 backdrop-blur-md overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-40" />
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                <BookOpen className="w-3 h-3 text-secondary" />{" "}
                CURRENT_READING
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 text-xs font-mono text-muted-foreground">
                <div>
                  <span className="text-secondary">+</span>{" "}
                  《沉思录》 / 笛卡尔
                </div>
                <div>
                  <span className="text-secondary">+</span>{" "}
                  《理想国》 / 柏拉图
                </div>
                <div>
                  <span className="text-secondary">+</span>{" "}
                  《存在与时间》 / 海德格尔
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Dashboard & Navigation (8 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="visualizer-container group">
            <div className="visualizer-topline" />
            <NeuralTopologyCanvas className="neural-canvas" />
            <div className="visualizer-overlay">
              <div className="overlay-header">
                <span className="icon-glow">⟟</span>
                <span>NEURAL_TOPOLOGY_V2.4.1</span>
              </div>
              <small className="typing-effect-mini">
                Real-time synaptic visualization running...
              </small>
            </div>
          </div>

          {/* Quick Navigation Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                label: "AI 核心",
                url: "/ai",
                icon: BrainCircuit,
                color: "text-primary",
              },
              {
                label: "数学迷宫",
                url: "/math",
                icon: Sigma,
                color: "text-secondary",
              },
              {
                label: "物理法则",
                url: "/physics",
                icon: Atom,
                color: "text-blue-400",
              },
              {
                label: "哲学思辨",
                url: "/philosophy",
                icon: Lightbulb,
                color: "text-purple-400",
              },
              {
                label: "心理模型",
                url: "/psychology",
                icon: Activity,
                color: "text-pink-400",
              },
              {
                label: "经济博弈",
                url: "/economics",
                icon: TrendingUp,
                color: "text-yellow-400",
              },
              {
                label: "文学殿堂",
                url: "/literature",
                icon: BookOpen,
                color: "text-orange-400",
              },
              {
                label: "公考之路",
                url: "/cse",
                icon: Landmark,
                color: "text-red-400",
              },
              {
                label: "神兵利器",
                url: "/tools",
                icon: Wrench,
                color: "text-green-400",
              },
            ].map((nav) => (
              <Link key={nav.url} href={nav.url}>
                <div className="h-32 bg-black/40 border border-border/20 rounded-lg p-4 flex flex-col justify-between hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group relative overflow-hidden min-h-[128px]">
                  <div
                    className={`absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full transition-transform group-hover:scale-150`}
                  />
                  <nav.icon
                    className={`w-8 h-8 ${nav.color} opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0`}
                  />
                  <div className="flex items-center justify-between flex-shrink-0">
                    <span className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {nav.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quote / Footer */}
          <div className="p-6 border-l-2 border-primary/50 bg-gradient-to-r from-primary/5 to-transparent min-h-[120px] h-[120px] flex flex-col justify-center overflow-hidden">
            <blockquote className="font-mono text-sm italic text-muted-foreground leading-relaxed">
              "
              <GlitchText
                text="The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion."
                hover={false}
              />
              "
            </blockquote>
            <p className="text-right text-xs text-primary mt-2 flex-shrink-0">
              - Albert Camus
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
