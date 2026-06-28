import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const postSlug = searchParams.get("post_slug")

  if (!postSlug) {
    return NextResponse.json(
      { error: "post_slug is required" },
      { status: 400 }
    )
  }

  const supabase = await createClient()
  const { data } = await supabase
    .from("comments")
    .select("*")
    .eq("post_slug", postSlug)
    .order("created_at", { ascending: false })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { post_slug, content } = body

  if (!post_slug || !content) {
    return NextResponse.json(
      { error: "post_slug and content are required" },
      { status: 400 }
    )
  }

  const { data, error } = await supabase.from("comments").insert({
    post_slug,
    content,
    author_name: user.user_metadata?.name || "Anonymous",
    author_avatar: user.user_metadata?.avatar_url || null,
    user_id: user.id,
  }).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
