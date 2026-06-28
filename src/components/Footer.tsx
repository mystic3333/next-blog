export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-4xl px-4 py-8 text-center text-sm" style={{ color: "var(--muted)" }}>
        <p>&copy; {new Date().getFullYear()} Mystic Blog. Built with Next.js & Supabase.</p>
      </div>
    </footer>
  )
}
