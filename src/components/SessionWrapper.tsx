import { createClient } from "@/lib/supabase/server"
import { SupabaseProvider } from "./SupabaseProvider"

export default async function SessionWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <SupabaseProvider initialSession={session}>{children}</SupabaseProvider>
}
