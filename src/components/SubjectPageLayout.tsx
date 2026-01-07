import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lightbulb, Link as LinkIcon, FileText, History, Layers, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export interface NoteLink {
  title: string;
  url: string;
}

export interface NoteItem {
  title: string;
  content: string;
  date?: string;
  tags?: string[];
  links?: NoteLink[];
  // Deprecated: single link field, kept for backward compatibility if needed, but we will migrate away
  link?: string; 
}

export interface ResourceItem {
  title: string;
  url?: string;
  type?: "Book" | "Course" | "Article" | "Tool" | "Paper";
  description?: string;
}

export interface InsightItem {
  title: string;
  content: string;
  date: string;
}

export interface HistoryItem {
  year: string;
  event: string;
}

export interface CategoryGroup<T> {
  category: string;
  items: T[];
}

export type ContentData<T extends object> = T[] | CategoryGroup<T>[];

interface SubjectPageLayoutProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  history?: HistoryItem[];
  notes: ContentData<NoteItem>;
  resources: ContentData<ResourceItem>;
  insights: InsightItem[];
}

function isGrouped<T extends object>(data: ContentData<T>): data is CategoryGroup<T>[] {
  return data.length > 0 && "category" in data[0];
}

export function SubjectPageLayout({
  title,
  subtitle,
  backgroundImage,
  history,
  notes,
  resources,
  insights,
}: SubjectPageLayoutProps) {
  
  const renderContent = <T extends NoteItem | ResourceItem>(data: ContentData<T>, type: 'note' | 'resource') => {
    if (!isGrouped(data)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, i) => renderCard(item, i, type))}
        </div>
      );
    }

    return (
      <Accordion type="multiple" defaultValue={data.map(g => g.category)} className="space-y-4">
        {data.map((group, idx) => (
          <AccordionItem key={idx} value={group.category} className="border border-primary/20 bg-black/40 rounded-lg px-4 backdrop-blur-sm">
            <AccordionTrigger className="hover:no-underline hover:text-primary">
              <span className="font-display text-lg text-secondary flex items-center gap-2">
                <Layers className="w-4 h-4" />
                {group.category}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item, i) => renderCard(item, i, type))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const renderCard = (item: any, i: number, type: 'note' | 'resource') => {
    if (type === 'note') {
      const noteItem = item as NoteItem;
      return (
        <Card key={i} className="bg-black/60 border-white/10 hover:border-primary/50 transition-all backdrop-blur-md group flex flex-col h-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-mono text-primary group-hover:text-white transition-colors">
                  {noteItem.title}
              </CardTitle>
              {noteItem.date && <span className="text-[10px] font-mono text-muted-foreground">{noteItem.date}</span>}
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              {noteItem.content}
            </p>
            
            {/* New Links Section */}
            {(noteItem.links && noteItem.links.length > 0) || noteItem.link ? (
                <div className="mt-auto space-y-2">
                    {/* Support legacy single link */}
                    {noteItem.link && !noteItem.links && (
                         <Link href={noteItem.link}>
                            <Button variant="outline" size="sm" className="w-full justify-between border-primary/20 text-primary hover:bg-primary/10 h-8 text-xs font-mono">
                                Read Note <ArrowRight className="w-3 h-3 ml-2" />
                            </Button>
                        </Link>
                    )}
                    {/* Support new multiple links */}
                    {noteItem.links?.map((link, idx) => (
                        <Link key={idx} href={link.url}>
                            <Button variant="outline" size="sm" className="w-full justify-between border-white/10 text-muted-foreground hover:text-white hover:border-primary/30 hover:bg-white/5 h-8 text-xs font-mono mb-1">
                                {link.title} <ArrowRight className="w-3 h-3 ml-2 opacity-50" />
                            </Button>
                        </Link>
                    ))}
                </div>
            ) : null}

            {/* Footer Tags */}
            {noteItem.tags && (
              <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/5">
                {noteItem.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-[9px] border-primary/30 text-primary/70">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      );
    } else {
      return (
        <div key={i} className="flex items-center justify-between p-3 bg-black/60 border border-white/10 rounded-lg hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-secondary/10 rounded-full flex-shrink-0">
              <BookOpen className="w-4 h-4 text-secondary" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-sm text-secondary group-hover:underline cursor-pointer truncate">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                ) : (
                  item.title
                )}
              </h4>
              {item.description && <p className="text-xs text-muted-foreground truncate">{item.description}</p>}
            </div>
          </div>
          {item.type && (
            <Badge className="bg-secondary/20 text-secondary hover:bg-secondary/30 ml-2 whitespace-nowrap text-[10px]">
              {item.type}
            </Badge>
          )}
        </div>
      );
    }
  };

  return (
    <PageLayout title={title} subtitle={subtitle} backgroundImage={backgroundImage}>
      
      {/* History Timeline */}
      {history && (
        <div className="mb-8">
          <Card className="bg-black/60 border-primary/30 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                <History className="w-3 h-3 text-primary" /> MINIMALIST HISTORY
              </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative">
                  <div className="hidden md:block absolute top-[7px] left-0 w-full h-[1px] bg-white/10 z-0"></div>
                  
                  {history.map((item, idx) => (
                    <div key={idx} className="relative z-10 flex md:flex-col items-center md:items-start gap-4 md:gap-2 md:w-full">
                        <div className="w-4 h-4 rounded-full bg-black border border-primary flex items-center justify-center flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-mono text-xs text-primary font-bold">{item.year}</span>
                            <span className="text-xs text-muted-foreground md:max-w-[150px]">{item.event}</span>
                        </div>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="bg-black/50 border border-border w-full justify-start overflow-x-auto mb-6 p-1">
          <TabsTrigger value="notes" className="font-mono min-w-[100px] gap-2 data-[state=active]:bg-primary data-[state=active]:text-black">
            <FileText className="w-4 h-4" /> 笔记 (Notes)
          </TabsTrigger>
          <TabsTrigger value="resources" className="font-mono min-w-[100px] gap-2 data-[state=active]:bg-secondary data-[state=active]:text-black">
            <LinkIcon className="w-4 h-4" /> 资料 (Refs)
          </TabsTrigger>
          <TabsTrigger value="insights" className="font-mono min-w-[100px] gap-2 data-[state=active]:bg-white data-[state=active]:text-black">
            <Lightbulb className="w-4 h-4" /> 感悟 (Logs)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="animate-in fade-in slide-in-from-bottom-4">
            {renderContent(notes, 'note')}
        </TabsContent>

        <TabsContent value="resources" className="animate-in fade-in slide-in-from-bottom-4">
            {renderContent(resources, 'resource')}
        </TabsContent>

        <TabsContent value="insights" className="animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-6">
                {insights.map((insight, i) => (
                    <div key={i} className="relative pl-8 border-l-2 border-white/20 pb-8 last:pb-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-background border-2 border-white rounded-full" />
                        <div className="bg-black/40 border border-white/10 p-6 rounded-lg backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-display text-white">{insight.title}</h3>
                                <span className="text-xs font-mono text-muted-foreground">{insight.date}</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                                {insight.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
