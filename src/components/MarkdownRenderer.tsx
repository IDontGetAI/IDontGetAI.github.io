import React, { useMemo } from 'react';
import MarkdownIt from 'markdown-it';
import tm from 'markdown-it-texmath';
import anchor from 'markdown-it-anchor';
import katex from 'katex';
import hljs from 'highlight.js';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';
import '@/styles/cogito.css';
import { slugify } from '@/lib/slugify';

interface MarkdownRendererProps {
  content: string;
  baseUrl?: string; // e.g. "https://raw.githubusercontent.com/user/repo/main/"
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, baseUrl }) => {
  
  // Create a memoized markdown-it instance to handle baseUrl dynamically
  const md = useMemo(() => {
    const instance = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
                   hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                   '</code></pre>';
          } catch (__) {}
        }
        return '<pre class="hljs"><code>' + instance.utils.escapeHtml(str) + '</code></pre>';
      }
    });

    // Use texmath with katex engine, supporting dollar delimiters
    instance.use(tm, { engine: katex, delimiters: 'dollars' });

    // Use anchor plugin for header links
    instance.use(anchor, {
      slugify: slugify,
      permalink: anchor.permalink.headerLink()
    });

    // Custom image rule to handle baseUrl
    const defaultRender = instance.renderer.rules.image || function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

    instance.renderer.rules.image = function (tokens, idx, options, env, self) {
      const token = tokens[idx];
      const srcIndex = token.attrIndex('src');
      if (srcIndex >= 0) {
        let src = token.attrs[srcIndex][1];
        
        // Logic:
        // 1. If baseUrl is provided and src is relative (not http/https/absolute), prepend baseUrl
        // 2. Fallback to local /assets/ rewrite if no baseUrl is provided
        
        if (baseUrl && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('/')) {
           // Ensure baseUrl ends with /
           const cleanBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
           // Clean src of leading ./
           const cleanSrc = src.replace(/^\.\//, '');
           token.attrs[srcIndex][1] = cleanBase + cleanSrc;
        } 
        else if (!baseUrl && (src.startsWith('assets/') || src.startsWith('./assets/'))) {
           token.attrs[srcIndex][1] = src.replace(/^(\.\/)?assets\//, '/assets/');
        }
      }
      return defaultRender(tokens, idx, options, env, self);
    };

    return instance;
  }, [baseUrl]);

  // Pre-process content to fix HTML image tags <img src="...">
  const processedContent = useMemo(() => {
    if (!content) return "";
    
    if (baseUrl) {
       const cleanBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
       return content.replace(/(src=["'])(\.?\/)?([^"']+)["']/g, (match, prefix, dotSlash, url) => {
          if (url.startsWith('http') || url.startsWith('//') || url.startsWith('/')) return match;
          return `${prefix}${cleanBase}${url}"`;
       });
    }

    return content
      // Fix HTML img tags with relative assets path (Legacy local mode)
      .replace(/(src=["'])(\.?\/)?assets\//g, '$1/assets/')
      // Fix Markdown image links (as a backup)
      .replace(/(\]\()(\.?\/)?assets\//g, '$1/assets/');
  }, [content, baseUrl]);

  const html = useMemo(() => md.render(processedContent), [md, processedContent]);

  return (
    <div 
      className="typora-content"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};
