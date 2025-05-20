"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Introduction",
    href: "/docs",
  },
  {
    title: "Architecture",
    href: "/docs/architecture",
  },
  {
    title: "Documentation Strategy",
    href: "/docs/documentation-strategy",
  },
  {
    title: "Best Practices",
    href: "/docs/best-practices",
  },
  {
    title: "Roadmap",
    href: "/docs/roadmap",
  },
  {
    title: "Database Schema",
    href: "/docs/database-schema",
  },
  {
    title: "Tech Stack",
    href: "/docs/tech-stack",
  },
  {
    title: "File Structure",
    href: "/docs/file-structure",
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      <div className="pb-4">
        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Documentation</h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex w-full items-center rounded-md px-2 py-2 hover:underline",
                pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
