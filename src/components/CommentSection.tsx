"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSupabase } from "./SupabaseProvider"
import { formatDate } from "@/lib/utils"
import type { Comment } from "@/types"

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { user } = useSupabase()
  const supabase = createClient()

  useEffect(() => {
    loadComments()
  }, [postSlug])

  async function loadComments() {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_slug", postSlug)
      .order("created_at", { ascending: false })

    if (data) setComments(data as Comment[])
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim() || submitting) return

    setSubmitting(true)
    const { error } = await supabase.from("comments").insert({
      post_slug: postSlug,
      content: content.trim(),
      author_name: user?.user_metadata?.name || "Anonymous",
      author_avatar: user?.user_metadata?.avatar_url || null,
      user_id: user?.id || null,
    })

    if (!error) {
      setContent("")
      loadComments()
    }
    setSubmitting(false)
  }

  return (
    <section className="mt-16 border-t pt-8" style={{ borderColor: "var(--border)" }}>
      <h2 className="text-2xl font-bold">Comments</h2>

      {user && (
        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            className="w-full rounded-lg border p-3 text-sm"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
              color: "var(--foreground)",
            }}
          />
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="mt-2 rounded-lg border px-4 py-2 text-sm transition-all hover:opacity-70 disabled:opacity-50"
            style={{ borderColor: "var(--border)" }}
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      )}

      {!user && (
        <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
          Sign in to leave a comment.
        </p>
      )}

      <div className="mt-8 space-y-6">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="h-4 w-32 rounded" style={{ background: "var(--card)" }} />
              <div className="h-3 w-24 rounded" style={{ background: "var(--card)" }} />
              <div className="h-12 w-full rounded" style={{ background: "var(--card)" }} />
            </div>
          ))}

        {!loading && comments.length === 0 && (
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            No comments yet.
          </p>
        )}

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg border p-4"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <div className="flex items-center gap-2">
              {comment.author_avatar && (
                <img
                  src={comment.author_avatar}
                  alt=""
                  className="h-6 w-6 rounded-full"
                />
              )}
              <span className="text-sm font-medium">{comment.author_name}</span>
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {formatDate(comment.created_at)}
              </span>
            </div>
            <p className="mt-2 text-sm">{comment.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
