'use client';

import React, { useState, useEffect } from 'react';
import Command from '@/components/common/Command';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import './BlogPostClient.css';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  author: string;
  slug: string;
  description: string;
}

export default function BlogPostClient() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/v1/blogs/${params.slug}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch blog post: ${response.statusText}`);
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.slug) {
      fetchBlogPost();
    }
  }, [params.slug]);

  // Convert markdown-like content to HTML (improved version)
  const formatContent = (content: string) => {
    // Process code blocks first
    let processedContent = content;
    const codeBlockRegex = /```([\s\S]*?)```/g;

    // Replace code blocks with placeholders
    const codeBlocks: string[] = [];
    processedContent = processedContent.replace(codeBlockRegex, (_match, codeContent) => {
      const id = `CODE_BLOCK_${codeBlocks.length}`;
      let language = '';

      // Check if there's a language specified
      const firstLine = codeContent.trim().split('\n')[0];
      if (firstLine && !firstLine.includes(' ')) {
        language = firstLine;
        codeContent = codeContent.substring(firstLine.length).trim();
      }

      // Add line numbers to code blocks
      const lines = codeContent.split('\n');
      const numberedCode = lines.map((line: string, index: number) => {
        // Escape HTML characters to prevent rendering issues
        const escapedLine = line
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        return `<div class="code-line"><span class="line-number">${index + 1}</span>${escapedLine}</div>`;
      }).join('');

      codeBlocks.push(`<div class="code-block language-${language}"><div class="code-content">${numberedCode}</div></div>`);
      return id;
    });

    // Process inline code
    const inlineCodeRegex = /`([^`]+)`/g;
    processedContent = processedContent.replace(inlineCodeRegex, (_, code) => {
      // Escape HTML characters in inline code
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<code>${escapedCode}</code>`;
    });

    // Process the rest of the content
    const parts = processedContent.split('\n\n')
      .map(paragraph => {
        if (paragraph.startsWith('# ')) {
          return `<h1>${paragraph.substring(2)}</h1>`;
        } else if (paragraph.startsWith('## ')) {
          return `<h2>${paragraph.substring(3)}</h2>`;
        } else if (paragraph.startsWith('### ')) {
          return `<h3>${paragraph.substring(4)}</h3>`;
        } else if (paragraph.startsWith('- ')) {
          return `<ul>
            ${paragraph.split('\n').map(item => `<li>${item.substring(2)}</li>`).join('')}
          </ul>`;
        } else if (/^\d+\.\s/.test(paragraph)) {
          return `<ol>
            ${paragraph.split('\n').map(item => {
              const match = item.match(/^\d+\.\s(.+)/);
              return match ? `<li>${match[1]}</li>` : '';
            }).join('')}
          </ol>`;
        } else if (paragraph.startsWith('CODE_BLOCK_')) {
          const index = parseInt(paragraph.replace('CODE_BLOCK_', ''), 10);
          return codeBlocks[index] || '';
        } else {
          return `<p>${paragraph}</p>`;
        }
      });

    return parts.join('');
  };

  if (error) {
    return (<>
          <Command command={`bat --style=full --paging=always /var/www/blog/${params.slug}.md`}>
            <div className="command-output">
              <div className="blog-post-container">
                {/* Error message */}
                <div className="mt-2">
                  <div className="blog-post-error">
                    bat: error: {`/var/www/blog/${params.slug}.md: ${error}`}
                  </div>
                </div>

                {/* Retry suggestion */}
                <div className="mt-2">
                  <div className="blog-post-retry">
                    <span>exa</span>
                    <span> -la --icons --git --color=always /var/www/blog</span>
                  </div>
                </div>
              </div>
            </div>
          </Command>
        </>);
  }

  return (<>
        <Command command={`bat --style=full --paging=always /var/www/blog/${params.slug}.md`}>
          {isLoading ? (
            <div className="command-output">
              <div className="blog-post-container">
                {/* Loading animation */}
                <div className="mt-2">
                  <div className="blog-post-loading">
                    <span>Reading file</span>
                    <span className="blog-post-loading-animation">...</span>
                  </div>
                </div>
              </div>
            </div>
          ) : post ? (
            <div className="command-output">
              <div className="blog-post-container">
                {/* Bat-style file header */}
                <div className="blog-post-header">
                  <div className="flex justify-between">
                    <div className="blog-post-file">
                      <span className="blog-post-file-icon">📄 </span>
                      <span>{`/var/www/blog/${params.slug}.md`}</span>
                    </div>
                    <div className="blog-post-date">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                {/* Content container */}
                <div className="blog-post-content">
                  {/* Content column */}
                  <div className="overflow-x-auto">
                    {/* Title and metadata */}
                    <div className="text-xl text-green-400">{post.title}</div>

                    <div className="blog-post-meta">
                      <div className="blog-post-author">
                        <span>Author:</span>
                        <span className="ml-1">{post.author}</span>
                      </div>

                      <div className="blog-post-tags">
                        <span>Tags:</span>
                        {post.tags.map(tag => (
                          <span key={tag} className="blog-tag ml-1">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-gray-500">---</div>

                    {/* Blog content */}
                    <div className="blog-content text-sm leading-relaxed text-gray-200 mt-1"
                         dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
                  </div>
                </div>

                {/* Bat-style footer */}
                <div className="blog-post-footer">
                  <div className="flex justify-between">
                    <Link href="/blog" className="blog-post-back-link">
                      <span className="mr-1">←</span> Back to blog list
                    </Link>

                    <div className="blog-post-file-info">
                      {`${params.slug}.md [${post.content.split('\n').length} lines] (END)`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="command-output">
              <div className="blog-post-container">
                {/* Error message */}
                <div className="mt-2">
                  <div className="blog-post-error">
                    bat: error: {`/var/www/blog/${params.slug}.md: No such file or directory`}
                  </div>
                </div>

                {/* Retry suggestion */}
                <div className="mt-2">
                  <div className="blog-post-retry">
                    <span>exa</span>
                    <span> -la --icons --git --color=always /var/www/blog</span>
                  </div>
                  <div className="mt-2">
                    <Link href="/blog" className="blog-post-back-link">
                      <span className="mr-1">←</span> Back to blog list
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Command>
  </>);
}