import React from 'react';
import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';
import CodeSnippet from '@/components/CodeSnippet';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import { notFound } from 'next/navigation'

export async function generateMetadata({params}){
  const data = await loadBlogPost(params.postSlug);
  if(!data)
    return null;

  const {frontmatter} = data;
  
  return {
    title: `${frontmatter.title} - ${BLOG_TITLE}`,
    description: frontmatter.abstract
  }
}

async function BlogPost({ params }) {
  let data = await loadBlogPost(params.postSlug);
  if(!data)
    notFound();
  
  const { frontmatter, content } = data;
  
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={{
          pre: CodeSnippet,
          DivisionGroupsDemo,
          CircularColorsDemo,
        }}/>
      </div>
    </article>
  );
}

export default BlogPost;
