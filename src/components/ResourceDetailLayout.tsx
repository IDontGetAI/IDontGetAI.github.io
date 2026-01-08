import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, Video, Globe, FileText, ExternalLink, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import readingBg from "@/assets/reading.jpeg";
import type { ComponentType } from "react";

export interface ResourceDetailItem {
  title: string;
  url: string;
  type: "Book" | "Video" | "Course" | "Article" | "Tool" | "Paper" | "Website" | "Online";
  description?: string;
  author?: string;
}

interface ResourceDetailLayoutProps {
  title: string;
  subtitle: string;
  backLink: string;
  backLabel?: string;
  resources: ResourceDetailItem[];
  backgroundImage?: string;
}

type IconComponent = ComponentType<{ className?: string }>;

const TypeIcon: Record<ResourceDetailItem["type"], IconComponent> = {
  Book: BookOpen,
  Video: Video,
  Course: GraduationCap,
  Article: FileText,
  Paper: FileText,
  Tool: ExternalLink,
  Website: Globe,
  Online: Globe
};

export function ResourceDetailLayout({
  title,
  subtitle,
  backLink,
  backLabel = "返回上一页",
  resources,
  backgroundImage = readingBg
}: ResourceDetailLayoutProps) {
  return (
    <PageLayout title={title} subtitle={subtitle} backgroundImage={backgroundImage}>
      <div className="max-w-4xl mx-auto">
        <Link href={backLink}>
          <Button variant="ghost" className="mb-6 pl-0 text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
          </Button>
        </Link>

        {/* Using grid layout similar to v6.0 Resource Cards */}
        <div className="grid grid-cols-1 gap-4">
            {resources.map((item, i) => {
                const Icon = TypeIcon[item.type] || Globe;
                return (
                    <Card key={i} className="bg-black/60 border-secondary/20 hover:border-secondary/60 transition-all backdrop-blur-md group">
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-secondary/10 rounded-full border border-secondary/20">
                                        <Icon className="w-5 h-5 text-secondary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-display text-secondary group-hover:text-white transition-colors">
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                                                {item.title}
                                                <ExternalLink className="w-3 h-3 opacity-50" />
                                            </a>
                                        </CardTitle>
                                        {item.author && <p className="text-xs text-muted-foreground mt-1">by {item.author}</p>}
                                    </div>
                                </div>
                                <Badge variant="outline" className="border-secondary/30 bg-secondary/5 text-secondary text-xs">
                                    {item.type}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-400 leading-relaxed pl-1">
                                {item.description}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
      </div>
    </PageLayout>
  );
}
