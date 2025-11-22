import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts
    .filter((post) => post.slug && post.slug !== "undefined" && post.slug !== "")
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  if (!params.slug || params.slug === "undefined" || params.slug === "") {
    return {
      title: "Post Not Found",
    };
  }

  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | MetalCraft Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background py-24">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="px-3 py-1 bg-bronze text-white text-sm font-semibold rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-bronze max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border/50">
          <Link href="/blog">
            <Button className="bg-bronze hover:bg-bronze-dark text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              View All Posts
            </Button>
          </Link>
        </footer>
      </article>
    </div>
  );
}
