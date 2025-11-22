import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  author?: string;
  readingTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      try {
        const slug = fileName.replace(/\.mdx$/, "");
        if (!slug) return null; // Skip if slug is empty
        
        const fullPath = path.join(postsDirectory, fileName);
        if (!fs.existsSync(fullPath)) return null; // Skip if file doesn't exist
        
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        const { text } = readingTime(content);

        return {
          slug,
          title: data.title || "",
          date: data.date || "",
          category: data.category || "Uncategorized",
          excerpt: data.excerpt || "",
          image: data.image || "/images/blog/default.png",
          author: data.author || "MetalCraft Team",
          readingTime: text,
          content,
        } as BlogPost;
      } catch (error) {
        console.error(`Error reading blog post ${fileName}:`, error);
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null && post.slug !== undefined && post.slug !== "");

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const { text } = readingTime(content);

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      category: data.category || "Uncategorized",
      excerpt: data.excerpt || "",
      image: data.image || "/images/blog/default.png",
      author: data.author || "MetalCraft Team",
      readingTime: text,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = posts.map((post) => post.category);
  return Array.from(new Set(categories));
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category);
}
