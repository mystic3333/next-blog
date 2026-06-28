import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-lg" style={{ color: "var(--muted)" }}>
          Page not found
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg border px-6 py-3 text-sm transition-all hover:opacity-70"
          style={{ borderColor: "var(--border)" }}
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
