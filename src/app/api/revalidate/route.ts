import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug } = body

    if (slug) {
      revalidatePath(`/blog/${slug}`)
    }
    revalidatePath("/blog")
    revalidatePath("/")

    return NextResponse.json({ revalidated: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    )
  }
}
