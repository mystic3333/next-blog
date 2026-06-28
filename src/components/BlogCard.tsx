import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { PostMeta } from "@/lib/posts"

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <article
      className="group rounded-xl border p-6 transition-all hover:opacity-80"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <Link href={`/blog/${post.slug}`}>
        <time className="text-sm" style={{ color: "var(--muted)" }}>
          {formatDate(post.date)}
        </time>
        <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm" style={{ color: "var(--muted)" }}>
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-xs"
                style={{
                  background: "var(--border)",
                  color: "var(--muted)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  )
}
