import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Palette, Package, Truck, Settings } from "lucide-react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Button asChild variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
        <Link href="/dashboard">
          <LayoutGrid className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
      </Button>
      <Button asChild variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
        <Link href="/projects">
          <Palette className="h-4 w-4 mr-2" />
          Projects
        </Link>
      </Button>
      <Button asChild variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
        <Link href="/products">
          <Package className="h-4 w-4 mr-2" />
          Products
        </Link>
      </Button>
      <Button asChild variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
        <Link href="/suppliers">
          <Truck className="h-4 w-4 mr-2" />
          Suppliers
        </Link>
      </Button>
      <Button asChild variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
        <Link href="/settings">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Link>
      </Button>
      <Button asChild variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
        <Link href="/docs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 mr-2"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
          Docs
        </Link>
      </Button>
    </nav>
  )
}
