import React, { useMemo, useEffect, useRef, useState } from 'react';
import MarkdownIt from 'markdown-it';
import tm from 'markdown-it-texmath';
import anchor from 'markdown-it-anchor';
import katex from 'katex';
import hljs from 'highlight.js';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import MermaidDiagram from './MermaidDiagram';

import ImageModal from './ImageModal';
import { useTheme } from '@/contexts/ThemeContext';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css'; // Light theme
import '@/styles/cogito.css';
import { slugify } from '@/lib/slugify';

interface MarkdownRendererProps {
  content: string;
  baseUrl?: string;
}

// Helper to safely split HLJS HTML output into lines without breaking tags
const splitHljsOutput = (html: string): string[] => {
  const lines: string[] = [];
  const stack: string[] = [];
  let currentLine = '';

  // Split by newline, capturing tags to maintain stack
  // We iterate through the string to handle this robustly
  // Regex to match tags or newlines
  const regex = /(<span[^>]*>|<\/span>|\n)/g;
  const parts = html.split(regex);

  for (const part of parts) {
    if (part === '\n') {
      // End of line: close all open tags
      const closing = stack.slice().reverse().join('');
      lines.push(currentLine + closing);

      // Start new line: re-open tags
      const opening = stack.join('');
      currentLine = opening;
    } else if (part.startsWith('<span')) {
      stack.push(part);
      currentLine += part;
    } else if (part === '</span>') {
      stack.pop();
      currentLine += part;
    } else {
      // Text content or empty string
      if (part) currentLine += part;
    }
  }

  // Add the last line
  lines.push(currentLine);

  return lines;
};

// Robust copy function with fallback
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      throw new Error('Clipboard API not available');
    }
  } catch (e) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    } catch (err) {
      console.error('Fallback copy failed', err);
      return false;
    }
  }
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, baseUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme(); // Consume theme context
  const [modalImage, setModalImage] = useState<{ src: string, alt: string } | null>(null);

  const md = useMemo(() => {
    const instance = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      breaks: true, // Enable single line break
    });

    // Override fence renderer to have full control
    instance.renderer.rules.fence = function (tokens, idx, options, env, self) {
      const token = tokens[idx];
      const lang = (token.info || '').trim().toLowerCase(); // Normalize language
      const code = token.content; // Raw code

      // 处理 Mermaid 图表
      if (lang === 'mermaid') {
        const encodedCode = encodeURIComponent(code);
        return `<div class="mermaid-placeholder" data-code="${encodedCode}"></div>`;
      }

      let highlightedCode = '';
      // Use original token info for display (preserve case if needed) or normalized lang for highlighting
      // hljs expects lowercase usually, but let's be safe
      const hljsLang = lang;

      if (hljsLang && hljs.getLanguage(hljsLang)) {
        try {
          highlightedCode = hljs.highlight(code, { language: hljsLang, ignoreIllegals: true }).value;
        } catch {
          highlightedCode = instance.utils.escapeHtml(code);
        }
      } else {
        highlightedCode = instance.utils.escapeHtml(code);
      }

      // Map hljs classes to CodeMirror classes for cogito.css compatibility
      highlightedCode = highlightedCode
        .replace(/hljs-keyword/g, 'cm-keyword')
        .replace(/hljs-string/g, 'cm-string')
        .replace(/hljs-comment/g, 'cm-comment')
        .replace(/hljs-number/g, 'cm-number')
        .replace(/hljs-type/g, 'cm-type')
        .replace(/hljs-built_in/g, 'cm-builtin')
        .replace(/hljs-variable/g, 'cm-variable')
        .replace(/hljs-operator/g, 'cm-operator')
        .replace(/hljs-meta/g, 'cm-meta')
        .replace(/hljs-title function_/g, 'cm-def')
        .replace(/hljs-title class_/g, 'cm-variable-2')
        .replace(/hljs-title/g, 'cm-def')
        .replace(/hljs-params/g, 'cm-variable')
        .replace(/hljs-attr/g, 'cm-attribute')
        .replace(/hljs-attribute/g, 'cm-attribute')
        .replace(/hljs-tag/g, 'cm-tag')
        .replace(/hljs-name/g, 'cm-tag')
        .replace(/hljs-literal/g, 'cm-atom')
        .replace(/hljs-section/g, 'cm-header')
        .replace(/hljs-quote/g, 'cm-quote');

      // Split highlighted code into lines
      // Trim trailing newline to avoid an empty extra line at the end
      const codeLines = splitHljsOutput(highlightedCode.replace(/\n$/, ''));

      // Generate Table Rows
      const rows = codeLines.map((line, index) => {
        const lineNumber = index + 1;
        return `
          <tr class="!border-0 !bg-transparent">
            <td class="CodeMirror-linenumber line-number-cell select-none text-right align-top !border-0 !p-0 !bg-transparent w-[30px] md:w-[40px] min-w-[30px] md:min-w-[40px]">
              <span class="font-mono block leading-[1.5]">${lineNumber}</span>
            </td>
            <td class="code-content-cell align-top w-full !border-0 !p-0 !bg-transparent">
              <pre class="CodeMirror-line !p-0 !m-0 !bg-transparent"><span class="code-line font-mono whitespace-pre-wrap break-all leading-[1.5]">${line || ' '}</span></pre>
            </td>
          </tr>
        `;
      }).join('');

      // Use encodeURIComponent to safely store raw code in data attribute
      const encodedCode = encodeURIComponent(code);

      // Container using cogito.css classes
      // We moved data-code to the button for a more self-contained approach
      return `
        <div class="code-block-container relative my-3 mx-4 group md-fences cm-s-inner CodeMirror !p-3 !rounded-[4px] overflow-hidden">
          <div class="absolute right-2 top-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            ${lang ? `<span class="text-xs text-[#6e7781] font-sans font-medium select-none uppercase mr-1">${lang}</span>` : ''}
            <span class="copy-feedback-text text-xs text-green-600 font-medium opacity-0 transition-opacity">Code copied</span>
            <button class="copy-code-btn inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#d0d7de] bg-white p-0 text-xs font-medium text-[#6e7781] shadow-sm hover:bg-[#f6f8fa] hover:text-[#24292f] transition-colors" aria-label="Copy code" data-code="${encodedCode}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="copy-icon"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="check-icon hidden text-green-500"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>
            </button>
          </div>
          <table class="w-full border-collapse table-fixed !mb-0 !border-0 !bg-transparent !font-inherit">
            <tbody class="!border-0">
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    };

    instance.use(tm, { engine: katex, delimiters: 'dollars' });
    instance.use(anchor, { slugify: slugify });

    const defaultRender = instance.renderer.rules.image || function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

    instance.renderer.rules.image = function (tokens, idx, options, env, self) {
      const token = tokens[idx];
      const srcIndex = token.attrIndex('src');
      if (srcIndex >= 0) {
        const src = token.attrs[srcIndex][1];
        if (baseUrl && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('/')) {
          const cleanBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
          const cleanSrc = src.replace(/^\.\//, '');
          token.attrs[srcIndex][1] = cleanBase + cleanSrc;
        }
        else if (!baseUrl && (src.startsWith('assets/') || src.startsWith('./assets/'))) {
          token.attrs[srcIndex][1] = src.replace(/^(\.\/)?assets\//, '/assets/');
        }
      }
      // Wrap image in a clickable container for modal
      const rawHtml = defaultRender(tokens, idx, options, env, self);
      // We add a class to identify images we want to make zoomable
      return `<span class="zoomable-image-container cursor-zoom-in inline-block">${rawHtml}</span>`;
    };

    return instance;
  }, [baseUrl]);

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
      .replace(/(src=["'])(\.?\/)?assets\//g, '$1/assets/')
      .replace(/(\]\()(\.?\/)?assets\//g, '$1/assets/');
  }, [content, baseUrl]);

  const html = useMemo(() => md.render(processedContent), [md, processedContent]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Event Delegation for Copy
    const handleCopy = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Handle Image Click for Modal
      const imageContainer = target.closest('.zoomable-image-container');
      if (imageContainer) {
        const img = imageContainer.querySelector('img');
        if (img) {
          e.stopPropagation();
          setModalImage({
            src: img.src,
            alt: img.alt || ''
          });
          return;
        }
      }

      const button = target.closest('.copy-code-btn') as HTMLButtonElement;

      if (!button) return;

      e.stopPropagation();

      const encodedCode = button.getAttribute('data-code');
      if (!encodedCode) return;

      const textToCopy = decodeURIComponent(encodedCode);
      const success = await copyToClipboard(textToCopy);

      const copyIcon = button.querySelector('.copy-icon');
      const checkIcon = button.querySelector('.check-icon');

      if (success) {
        const blockContainer = button.closest('.code-block-container');
        const feedbackText = blockContainer?.querySelector('.copy-feedback-text') as HTMLElement;

        if (feedbackText) feedbackText.style.opacity = '1';

        if (copyIcon) copyIcon.classList.add('hidden');
        if (checkIcon) checkIcon.classList.remove('hidden');

        button.classList.add('border-green-500/50', 'bg-green-500/10');
        button.setAttribute('aria-label', 'Code copied');

        setTimeout(() => {
          if (copyIcon) copyIcon.classList.remove('hidden');
          if (checkIcon) checkIcon.classList.add('hidden');

          button.classList.remove('border-green-500/50', 'bg-green-500/10');
          button.setAttribute('aria-label', 'Copy code');
          if (feedbackText) feedbackText.style.opacity = '0';
        }, 2000);
      } else {
        button.classList.add('border-red-500/50', 'bg-red-500/10');
        button.setAttribute('aria-label', 'Copy failed');

        setTimeout(() => {
          button.classList.remove('border-red-500/50', 'bg-red-500/10');
          button.setAttribute('aria-label', 'Copy code');
        }, 2000);
      }
    };

    container.addEventListener('click', handleCopy);

    // 挂载 Mermaid 图表（只在初始化时执行一次）
    const roots = new Map<Element, Root>();

    const mountDiagrams = () => {
      const placeholders = container.querySelectorAll('.mermaid-placeholder');

      placeholders.forEach((placeholder) => {
        if (roots.has(placeholder)) return;

        const code = decodeURIComponent(placeholder.getAttribute('data-code') || '');
        if (code) {
          const root = createRoot(placeholder);
          root.render(<MermaidDiagram code={code} theme={theme} />);
          roots.set(placeholder, root);
        }
      });
    };

    // 延迟挂载以避免阻塞主渲染
    const timer = requestAnimationFrame(() => {
      mountDiagrams();
    });

    return () => {
      container.removeEventListener('click', handleCopy);
      cancelAnimationFrame(timer);
      roots.forEach(root => root.unmount());
      roots.clear();
    };
  }, [html, theme]); // Re-run effect when theme changes

  return (
    <>
      <div
        ref={containerRef}
        className="typora-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ImageModal
        isOpen={!!modalImage}
        src={modalImage?.src || ''}
        alt={modalImage?.alt || ''}
        onClose={() => setModalImage(null)}
      />
    </>
  );
};
