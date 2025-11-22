import { getAllPosts, getCategories } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Blog | MetalCraft",
  description:
    "Insights, projects, and techniques from our craftsmen. Learn about custom metalwork and fine woodworking.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={cn(typography.h1, "text-foreground mb-4")}>
            Our <span className="text-bronze">Blog</span>
          </h1>
          <p
            className={cn(
              typography.bodyLarge,
              "text-muted-foreground max-w-2xl mx-auto"
            )}
          >
            Insights, projects, and techniques from our craftsmen
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <a
            href="/blog"
            className="px-4 py-2 rounded-full bg-bronze text-white text-sm font-semibold hover:bg-bronze-dark transition-colors"
          >
            All Posts
          </a>
          {categories.map((category) => (
            <a
              key={category}
              href={`/blog/category/${category.toLowerCase()}`}
              className="px-4 py-2 rounded-full bg-card border border-border/50 text-foreground text-sm font-semibold hover:border-bronze hover:text-bronze transition-colors"
            >
              {category}
            </a>
          ))}
        </div>

        {/* Blog Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No blog posts yet. Check back soon for updates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
