"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function ViewCounter({ slug }: { slug: string }) {
  const supabase = createClient()

  useEffect(() => {
    const increment = async () => {
      await supabase.rpc("increment_view", { slug_text: slug })
    }
    increment()
  }, [slug])

  return null
}
