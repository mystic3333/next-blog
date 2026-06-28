import { format } from "date-fns"

export function formatDate(date: string): string {
  return format(new Date(date), "MMM d, yyyy")
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ")
}
