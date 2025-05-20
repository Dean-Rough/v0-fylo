"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Search() {
  const [search, setSearch] = useState("")

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full pl-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
