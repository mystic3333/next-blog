import { getAllPosts } from "@/lib/posts"
import BlogCard from "@/components/BlogCard"

export const metadata = {
  title: "Blog",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2" style={{ color: "var(--muted)" }}>
        Thoughts on code, design, and beyond.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))
        ) : (
          <p className="col-span-2 text-sm" style={{ color: "var(--muted)" }}>
            No posts yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  )
}
