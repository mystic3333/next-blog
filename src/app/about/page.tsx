import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">About</h1>
      <div className="mt-8 space-y-4 leading-relaxed">
        <p>
          Welcome to Mystic Blog. This is a space where I share thoughts on
          software development, design, and the craft of building things for the
          web.
        </p>
        <p>
          Built with Next.js, Supabase, and Three.js — this blog is both a
          writing platform and a playground for exploring modern web
          technologies.
        </p>
      </div>
    </div>
  )
}
