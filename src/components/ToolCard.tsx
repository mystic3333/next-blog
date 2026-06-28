interface Tool {
  name: string
  description: string
  url: string
  category: string
  icon: string
}

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl border p-5 transition-all hover:-translate-y-1 hover:opacity-80"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <span className="text-2xl">{tool.icon}</span>
      <h3 className="mt-3 font-semibold">{tool.name}</h3>
      <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {tool.description}
      </p>
      <span
        className="mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs"
        style={{ background: "var(--border)", color: "var(--muted)" }}
      >
        {tool.category}
      </span>
    </a>
  )
}
