import type { Metadata } from "next"
import tools from "../../data/ai-tools.json"
import ToolCard from "@/components/ToolCard"

export const metadata: Metadata = {
  title: "AI Tools",
  description: "精选 AI 工具导航",
}

const categories = [...new Set(tools.map((t) => t.category))]

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">AI Tools</h1>
      <p className="mt-2" style={{ color: "var(--muted)" }}>
        精选 AI 工具，提升开发和生活效率
      </p>

      {categories.map((category) => {
        const categoryTools = tools.filter((t) => t.category === category)
        return (
          <section key={category} className="mt-12">
            <h2 className="text-xl font-semibold">{category}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
