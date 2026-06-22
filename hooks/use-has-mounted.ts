import { useEffect, useState } from "react"

/** Returns true only after the client has mounted — keeps SSR and first client paint in sync. */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
