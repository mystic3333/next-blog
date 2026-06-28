import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fn) => fn.endsWith(".mdx") || fn.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const source = fs.readFileSync(fullPath, "utf-8")
      const { data } = matter(source)

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(postsDirectory)) return null

  const fileNames = fs.readdirSync(postsDirectory)
  const fileName = fileNames.find(
    (fn) => fn.replace(/\.(mdx|md)$/, "") === slug
  )

  if (!fileName) return null

  const fullPath = path.join(postsDirectory, fileName)
  const source = fs.readFileSync(fullPath, "utf-8")
  const { data, content } = matter(source)

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    content,
  }
}
