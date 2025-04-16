import React from 'react';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { blogPosts } from '@/data/blogPosts';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  // In a real app, you might fetch this data from an API or CMS
  return blogPosts.map(post => ({
    slug: post.id,
  }));
}

export default function BlogPost() {
  return <BlogPostClient />;
} 