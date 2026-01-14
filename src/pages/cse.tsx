import {
  SubjectPageLayout,
  type ContentData,
  type NoteItem,
  type ResourceItem,
  type InsightItem,
} from "@/components/SubjectPageLayout";
import humanitiesBg from "@/assets/humanities.jpeg";

const notes: ContentData<NoteItem> = [
  {
    category: "I. 行测",
    items: [
      {
        title: "言语理解与表达",
        content: `主要测查报考者运用语言文字进行思考和交流、迅速准确地理解和把握文字材料内涵的能力。包括
          根据材料查找主要信息及重要细节；
        正确理解阅读材料中指定词语、语句的含义；
        概括归纳阅读材料的中心、主旨；
        判断新组成的语句与阅读材料原意是否一致；
        根据上下文内容合理推断阅读材料中的隐含信息；
        判断作者的态度、意图、倾向、目的；准确、得体地遣词用字等。`,
        tags: ["行测", "言语"],
        links: [
          {
            title: "言语理解与表达",
            url: `/note-viewer?src=${encodeURIComponent("https://raw.githubusercontent.com/IDontGetAI/Civil/refs/heads/main/01_%E8%A8%80%E8%AF%AD%E7%90%86%E8%A7%A3%E4%B8%8E%E8%A1%A8%E8%BE%BE/01_%E9%83%AD%E7%86%99%E8%A8%80%E8%AF%AD%E7%B2%BE%E8%AE%B2%E7%B2%BE%E7%82%BC.md")}&title=1.言语精讲精练&back=/cse&backLabel=返回公考页`,
          },
        ],
      },
      {
        title: "判断推理",
        content: `图形推理：每道题给出一套或两套图形，要求报考者通过观察分析找出图形排列的规律，选出符合规律的一项。
                  定义判断：每道题先对相关概念进行定义，然后分别列出四种情况，要求报考者严格依据定义选出一个最符合或最不符合该定义的答案。
                  类比推理：给出一组相关的词，要求通过观察分析，在备选答案中找出一组与之在逻辑关系上最为贴近或相似的词。
                  逻辑判断：每道题给出一段陈述，这段陈述被假设是正确的，不容置疑的。要求报考者根据这段陈述，运用一定的逻辑推论，选择一个最恰当的答案。`,
        tags: ["行测", "逻辑"],
        links: [
          {
            title: "判断推理",
            url: `/note-viewer?src=${encodeURIComponent("https://raw.githubusercontent.com/IDontGetAI/Civil/refs/heads/main/02_%E5%88%A4%E6%96%AD%E6%8E%A8%E7%90%86/01_%E5%88%A4%E6%96%AD%E6%8E%A8%E7%90%86%E7%B2%BE%E8%AE%B2%E7%B2%BE%E7%82%BC%E7%A8%8B%E6%B0%B8%E4%B9%90.md")}&title=1.判断精讲精练&back=/cse&backLabel=返回公考页`,
          },
        ],
      },
      {
        title: "数量关系",
        content:
          "主要测查报考者理解、把握事物间量化关系和解决数量关系问题的能力，主要涉及数据关系的分析、推理、判断、运算等。常用题型有数字推理和数学运算两种。",
        tags: ["行测", "数量"],
        links: [
          {
            title: "数量关系",
            url: `/note-viewer?src=${encodeURIComponent("https://raw.githubusercontent.com/IDontGetAI/Civil/refs/heads/main/03_%E6%95%B0%E9%87%8F%E5%85%B3%E7%B3%BB/01_%E6%95%B0%E9%87%8F%E5%85%B3%E7%B3%BB%E6%8B%BF%E5%88%86%E7%A8%B3%E7%A8%B3%E7%8F%AD.md")}&title=1.数量关系拿分稳稳班&back=/cse&backLabel=返回公考页`,
          },
        ],
      },
      {
        title: "资料分析",
        content:
          "主要测查报考者对文字、数字、图表等统计性资料的综合理解与分析加工能力。",
        tags: ["行测", "资料"],
        links: [
          {
            title: "资料分析",
            url: `/note-viewer?src=${encodeURIComponent("https://raw.githubusercontent.com/IDontGetAI/Civil/refs/heads/main/04_%E8%B5%84%E6%96%99%E5%88%86%E6%9E%90/01_%E8%B5%84%E6%96%99%E5%88%86%E6%9E%90%E7%90%86%E8%AE%BA%E5%AE%9E%E6%88%98%E7%8F%AD.md")}&title=1.资料分析理论实战班&back=/cse&backLabel=返回公考页`,
          },
        ],
      },
      {
        title: "常识",
        content:
          "主要测查报考者在经济、文化、社会、生态、法律、科技等方面应知应会的基本知识以及运用这些知识进行分析判断的基本能力。",
        tags: ["行测", "常识"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/xingce/common-knowledge",
          },
        ],
      },
      {
        title: "政治理论",
        content:
          "主要测查报考者学习理解掌握党的创新理论及党和国家方针政策的情况。",
        tags: ["行测", "政治"],
        links: [
          {
            title: "笔记（待添加）",
            url: "/notes/xingce/politics",
          },
        ],
      },
    ],
  },
  {
    category: "II. 申论",
    items: [
      {
        title: "单一综合公文",
        content:
          "单一综合公文主要测查报考者对公文格式、内容的掌握，以及撰写常见公文的能力。",
        tags: ["申论", "公文"],
        links: [
          {
            title: "申论单一综合公文",
            url: `/note-viewer?src=${encodeURIComponent("https://raw.githubusercontent.com/IDontGetAI/Civil/refs/heads/main/06_%E7%94%B3%E8%AE%BA/02_%E5%8D%95%E6%B7%91%E7%8E%B2%E7%94%B3%E8%AE%BA%E7%B2%BE%E8%AE%B2%E7%B2%BE%E7%82%BC.md")}&title=申论技巧&back=/cse&backLabel=返回`,
          },
        ],
      },
      {
        title: "作文",
        content:
          "作文主要测查报考者的阅读理解能力、综合分析能力、提出和解决问题能力、文字表达能力。",
        tags: ["申论", "作文"],
        links: [
          {
            title: "大作文专题",
            url: `/note-viewer?src=${encodeURIComponent("https://raw.githubusercontent.com/IDontGetAI/Civil/refs/heads/main/06_%E7%94%B3%E8%AE%BA/02_%E5%A4%A7%E4%BD%9C%E6%96%87%E4%B8%93%E9%A2%98.md")}&title=02_大作文专题&back=/cse&backLabel=返回`,
          },
        ],
      },
    ],
  },
];

const resources: ContentData<ResourceItem> = [
  {
    category: "I. 行测",
    items: [
      {
        title: "言语理解与表达",
        content: "言语理解专项训练资料。",
        links: [
          {
            title: "言语理解与表达PDF",
            url: "/pdf-viewer?src=https%3A%2F%2Fraw.githubusercontent.com%2FIDontGetAI%2FCivil%2Faba73289a46316886e3443d03ee634bd7b089fba%2F01_%25E8%25A8%2580%25E8%25AF%25AD%25E7%2590%2586%25E8%25A7%25A3%25E4%25B8%258E%25E8%25A1%25A8%25E8%25BE%25BE%2F01_%25E9%2583%25AD%25E7%2586%2599%25E8%25A8%2580%25E8%25AF%25AD%25E7%25B2%25BE%25E8%25AE%25B2%25E7%25B2%25BE%25E7%2582%25BC.pdf&title=01_%E9%83%AD%E7%86%99%E8%A8%80%E8%AF%AD%E7%B2%BE%E8%AE%B2%E7%B2%BE%E7%82%BC&back=%2Fcse&backLabel=%E8%BF%94%E5%9B%9E%E5%85%AC%E8%80%83%E9%A1%B5",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
        ],
      },
      {
        title: "判断推理",
        content: "判断推理与图形推理题库。",
        links: [
          {
            title: "判断推理 PDF",
            url: "/pdf-viewer?src=https%3A%2F%2Fraw.githubusercontent.com%2FIDontGetAI%2FCivil%2Faba73289a46316886e3443d03ee634bd7b089fba%2F02_%25E5%2588%25A4%25E6%2596%25AD%25E6%258E%25A8%25E7%2590%2586%2F01_%25E5%2588%25A4%25E6%2596%25AD%25E6%258E%25A8%25E7%2590%2586%25E7%25B2%25BE%25E8%25AE%25B2%25E7%25B2%25BE%25E7%2582%25BC%25E7%25A8%258B%25E6%25B0%25B8%25E4%25B9%2590.pdf&title=01_%E5%88%A4%E6%96%AD%E6%8E%A8%E7%90%86%E7%B2%BE%E8%AE%B2%E7%B2%BE%E7%82%BC%E7%A8%8B%E6%B0%B8%E4%B9%90&back=%2Fcse&backLabel=%E8%BF%94%E5%9B%9E%E5%85%AC%E8%80%83%E9%A1%B5",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
        ],
      },
      {
        title: "数量关系",
        content: "数学运算技巧与公式。",
        links: [
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
        ],
      },
      {
        title: "资料分析",
        content: "速算技巧与统计术语。",
        links: [
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
        ],
      },
      {
        title: "常识",
        content: "时政热点与百科知识。",
        links: [
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
        ],
      },
      {
        title: "政治理论",
        content: "重要会议精神与理论读本。",
        links: [
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
        ],
      },
    ],
  },
  {
    category: "II. 申论",
    items: [
      {
        title: "单一综合公文",
        content: "法定公文与事务文书范文。",
        links: [
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
        ],
      },
      {
        title: "作文",
        content: "申论大作文素材与范文。",
        links: [
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
          {
            title: "Search Books",
            url: "https://www.google.com/search?q=Civil+Service+Exam+Books",
            type: "Book",
          },
        ],
      },
    ],
  },
];

const insights: InsightItem[] = [
  {
    title: "公考之路的思考",
    content:
      "公考不仅仅是一场考试，更是对个人综合素质、抗压能力和未来规划的一次全面检阅。",
    date: "2026-01-08",
    link: "/logs/cse/thoughts",
  },
];

export default function Cse() {
  return (
    <SubjectPageLayout
      title="公考之路"
      subtitle="行测与申论：通往体制内的必经之路"
      backgroundImage={humanitiesBg}
      notes={notes}
      resources={resources}
      insights={insights}
      history={[
        {
          year: "1987",
          event: "中共十三大提出建立国家公务员制度",
        },
        {
          year: "1993",
          event: "国务院颁布《国家公务员暂行条例》",
        },
        {
          year: "1994",
          event: "首届中央国家行政机关公务员录用考试举行",
        },
        {
          year: "2000",
          event: "公共科目增加《申论》，考试模式初具雏形",
        },
        {
          year: "2002",
          event: "取消公基，确立《行测》+《申论》双科模式",
        },
        {
          year: "2006",
          event: "《中华人民共和国公务员法》正式实施",
        },
        {
          year: "2009",
          event: "国考报名人数首次突破100万大关",
        },
        {
          year: "2019",
          event:
            "新修订的《公务员法》实施，确立职务与职级并行",
        },
      ]}
    />
  );
}
