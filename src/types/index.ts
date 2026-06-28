export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  content: string
}

export interface Comment {
  id: string
  post_slug: string
  author_name: string
  author_avatar: string | null
  content: string
  created_at: string
  user_id: string | null
}

export interface ViewCount {
  slug: string
  count: number
}

export interface Profile {
  id: string
  username: string
  avatar_url: string | null
  bio: string | null
}
