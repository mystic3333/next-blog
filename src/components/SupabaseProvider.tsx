"use client"

import { createContext, useContext, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

interface SupabaseContextValue {
  user: User | null
  session: Session | null
  setSession: (session: Session | null) => void
  signInWithGithub: () => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const SupabaseContext = createContext<SupabaseContextValue | undefined>(
  undefined
)

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) throw new Error("useSupabase must be used within SupabaseProvider")
  return context
}

export function SupabaseProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode
  initialSession: Session | null
}) {
  const [session, setSession] = useState<Session | null>(initialSession)
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  const signInWithGithub = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    setLoading(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  return (
    <SupabaseContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        setSession,
        signInWithGithub,
        signOut,
        loading,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  )
}
