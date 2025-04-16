'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './BlogList.css';

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
  author: string;
  slug: string;
}

interface BlogListProps {
  updateCommand?: (command: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({ updateCommand }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagParam = searchParams.get('tag');

  const [currentPage, setCurrentPage] = useState(0);
  const [activeTag, setActiveTag] = useState<string | null>(tagParam);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const postsPerPage = 5;

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/v1/blogs');

        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
        }

        const data = await response.json();
        setBlogPosts(data.items);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      }
    };

    fetchBlogPosts();
  }, []);

  // Transform blog posts for list display
  const allBlogPosts: BlogPost[] = blogPosts.map(post => ({
    ...post,
    date: new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }));

  // Filter posts by tag if needed
  const filteredPosts = activeTag
    ? allBlogPosts.filter(post => post.tags.includes(activeTag))
    : allBlogPosts;

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = currentPage * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, totalPosts);
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Update the command to reflect current page range
  useEffect(() => {
    if (updateCommand) {
      const tagPart = activeTag ? ` | grep "${activeTag}"` : '';
      updateCommand(`exa -la --icons --git --color=always /var/www/blog${tagPart}`);
    }
  }, [currentPage, updateCommand, startIndex, endIndex, activeTag]);

  // Reset to first page when tag changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeTag]);

  // Set active tag from URL param on initial load
  useEffect(() => {
    if (tagParam) {
      setActiveTag(tagParam);
    }
  }, [tagParam]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      // Clear the filter if clicking the same tag
      setActiveTag(null);
      router.push('/blog');
    } else {
      // Apply the new tag filter
      setActiveTag(tag);
      router.push(`/blog?tag=${tag}`);
    }
  };

  if (error) {
    return (
      <div className="font-mono terminal-font">
        {/* Terminal header */}
        <div className="mb-2">
          <div className="flex items-center">
            <span className="text-purple-400">[</span>
            <span className="text-green-400">mrogal.ski</span>
            <span className="text-purple-400">@</span>
            <span className="text-blue-400">homepage</span>
            <span className="text-purple-400">:~]</span>
            <span className="text-yellow-400 ml-1">$</span>
            <span className="text-terminal-text ml-1">exa -la --icons --git --color=always /var/www/blog</span>
          </div>
        </div>

        {/* Error message */}
        <div className="mt-4">
          <div className="text-red-500">
            exa: error: cannot access '/var/www/blog': {error}
          </div>
        </div>

        {/* Retry suggestion */}
        <div className="mt-4">
          <div className="flex items-center">
            <span className="text-purple-400">[</span>
            <span className="text-green-400">mrogal.ski</span>
            <span className="text-purple-400">@</span>
            <span className="text-blue-400">homepage</span>
            <span className="text-purple-400">:~]</span>
            <span className="text-yellow-400 ml-1">$</span>
            <span className="text-blue-400 ml-1">exa</span>
            <span className="text-terminal-text"> -la --icons --git --color=always --retry /var/www/blog</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-mono overflow-x-auto terminal-font">
      <div className="text-gray-500">
        total {totalPosts}
      </div>

      {/* Directory entries with better spacing and icons */}
      <div className="flex items-center space-x-1 mb-1">
        <span className="text-blue-400">drwxr-x</span>
        <span className="text-gray-500">-</span>
        <span className="text-terminal-text">root</span>
        <span className="text-blue-400 ml-1">16 Apr 00:55</span>
        <span className="text-yellow-400 ml-1">📁</span>
        <span className="text-blue-400">.devcontainer</span>
      </div>

      <div className="flex items-center space-x-1 mb-1">
        <span className="text-blue-400">drwxr-x</span>
        <span className="text-gray-500">-</span>
        <span className="text-terminal-text">root</span>
        <span className="text-blue-400 ml-1">16 Apr 00:55</span>
        <span className="text-yellow-400 ml-1">📁</span>
        <span className="text-blue-400">..</span>
      </div>

      {/* Blog posts as files with better layout */}
      {currentPosts.map((post) => (
        <div key={post._id}>
          <div className="flex items-center space-x-1 mb-1 cursor-pointer" onClick={() => router.push(`/blog/${post.slug}`)}>
            <span className="text-terminal-text">-rw-r--</span>
            <span className="text-gray-500">-</span>
            <span className="text-terminal-text">{post.author}</span>
            <span className="text-blue-400 ml-1">16 Apr 00:55</span>
            <span className="text-yellow-400 ml-1">📄</span>
            <span className="text-purple-400">{post.slug}.md</span>
            <span className="text-gray-500 ml-2">→</span>
            <span className="text-blue-300 ml-1">{post.title}</span>
          </div>

          {/* Description and tags with better styling */}
          <div className="ml-[350px] text-gray-400">
            {post.description}
          </div>

          <div className="ml-[350px] flex flex-wrap gap-2 mb-1">
            {post.tags.map(tag => (
              <span
                key={tag}
                className={`${activeTag === tag ? 'text-green-400' : 'text-blue-400'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTagClick(tag);
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      {totalPosts === 0 && (
        <div className="text-yellow-400 my-6">No posts found matching the selected tag.</div>
      )}

      {/* Terminal-style pagination */}
      <div className="mt-2">
        {totalPosts > 0 && (
          <div>
            {/* Pagination with simple text and arrows */}
            <div className="flex justify-between items-center">
              <span className="text-terminal-text">
                Showing {startIndex + 1}-{endIndex} of {totalPosts} entries
              </span>

              <div className="flex items-center space-x-2">
                {currentPage > 0 && (
                  <span
                    onClick={handlePreviousPage}
                    className="text-blue-400 cursor-pointer"
                  >
                    «
                  </span>
                )}

                <span className="text-green-400 mx-1">{currentPage + 1}</span>

                {currentPage < totalPages - 1 && (
                  <span
                    onClick={handleNextPage}
                    className="text-blue-400 cursor-pointer"
                  >
                    »
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BlogListFallback = () => {
  return (
    <div className="font-mono terminal-font">
      {/* Loading animation */}
      <div className="mt-4">
        <div className="text-terminal-text">
          <span>Reading directory</span>
          <span className="animate-pulse">...</span>
        </div>
      </div>
    </div>
  );
}

const BlogListSafe = ({ updateCommand }: { updateCommand: (command: string) => void }) => {
  return (
    <Suspense fallback={<BlogListFallback />}>
      <BlogList updateCommand={updateCommand} />
    </Suspense>
  );
}


export default BlogListSafe;

// export default BlogList;