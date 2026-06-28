import Link from "next/link"
import { getAllPosts } from "@/lib/posts"
import BlogCard from "@/components/BlogCard"
import ThreeBackgroundWrapper from "@/components/ThreeBackgroundWrapper"

export default function Home() {
  const posts = getAllPosts().slice(0, 6)

  return (
    <>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <ThreeBackgroundWrapper />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Mystic Blog
          </h1>
          <p className="mt-4 text-lg" style={{ color: "var(--muted)" }}>
            Code, design, and everything in between
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-block rounded-lg border px-6 py-3 text-sm transition-all hover:opacity-70"
            style={{ borderColor: "var(--border)" }}
          >
            Read the Blog
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold">Latest Posts</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
      </section>
    </>
  )
}
