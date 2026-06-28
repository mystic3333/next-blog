"use client"

import Link from "next/link"
import { useTheme } from "./ThemeProvider"
import { useSupabase } from "./SupabaseProvider"

export default function Header() {
  const { theme, toggle } = useTheme()
  const { user, signInWithGithub, signOut, loading } = useSupabase()

  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Mystic Blog
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/blog" className="text-sm transition-opacity hover:opacity-70" style={{ color: "var(--muted)" }}>
            Blog
          </Link>
          <Link href="/tools" className="text-sm transition-opacity hover:opacity-70" style={{ color: "var(--muted)" }}>
            AI Tools
          </Link>
          <Link href="/scl-90" className="text-sm transition-opacity hover:opacity-70" style={{ color: "var(--muted)" }}>
            SCL-90
          </Link>
          <Link href="/about" className="text-sm transition-opacity hover:opacity-70" style={{ color: "var(--muted)" }}>
            About
          </Link>

          <button
            onClick={toggle}
            className="rounded-full p-2 transition-colors hover:opacity-70"
            style={{ color: "var(--muted)" }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt=""
                  className="h-6 w-6 rounded-full"
                />
              )}
              <button
                onClick={signOut}
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: "var(--muted)" }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGithub}
              disabled={loading}
              className="rounded-lg border px-3 py-1.5 text-sm transition-all hover:opacity-70 disabled:opacity-50"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            >
              {loading ? "..." : "Sign In"}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
