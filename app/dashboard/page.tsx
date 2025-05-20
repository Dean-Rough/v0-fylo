import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectCard } from "@/components/project-card"
import { MoodBoardCard } from "@/components/mood-board-card"
import { ProductCard } from "@/components/product-card"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data - in a real app, this would come from your database
  const recentProjects = [
    {
      id: "1",
      name: "Modern Living Room Redesign",
      description: "Complete redesign of the living room with a focus on minimalist aesthetics and functionality.",
      moodBoardCount: 3,
      createdAt: "2023-05-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Kitchen Renovation",
      description: "Contemporary kitchen renovation with sustainable materials and smart appliances.",
      moodBoardCount: 2,
      createdAt: "2023-06-20T14:45:00Z",
    },
    {
      id: "3",
      name: "Office Space Design",
      description: "Ergonomic and productive workspace design for a tech startup.",
      moodBoardCount: 1,
      createdAt: "2023-07-10T09:15:00Z",
    },
  ]

  const recentMoodBoards = [
    {
      id: "1",
      name: "Scandinavian Vibes",
      projectName: "Modern Living Room Redesign",
      projectId: "1",
      thumbnailUrl: "/scandinavian-interior.png",
    },
    {
      id: "2",
      name: "Industrial Elements",
      projectName: "Office Space Design",
      projectId: "3",
      thumbnailUrl: "/industrial-office.png",
    },
    {
      id: "3",
      name: "Warm Neutrals",
      projectName: "Kitchen Renovation",
      projectId: "2",
      thumbnailUrl: "/warm-neutral-kitchen.png",
    },
  ]

  const featuredProducts = [
    {
      id: "1",
      name: "Ergonomic Office Chair",
      description: "Adjustable height and lumbar support for all-day comfort.",
      price: 299.99,
      category: "Furniture",
      tags: ["office", "ergonomic", "chair"],
      imageUrl: "/ergonomic-office-chair.png",
    },
    {
      id: "2",
      name: "Minimalist Desk Lamp",
      description: "LED desk lamp with adjustable brightness and color temperature.",
      price: 89.99,
      category: "Lighting",
      tags: ["desk", "lamp", "LED", "minimalist"],
      imageUrl: "/minimalist-desk-lamp.png",
    },
    {
      id: "3",
      name: "Wool Area Rug",
      description: "Hand-woven wool rug with geometric patterns.",
      price: 249.99,
      category: "Textiles",
      tags: ["rug", "wool", "geometric", "handmade"],
      imageUrl: "/placeholder-t3zob.png",
    },
    {
      id: "4",
      name: "Modular Bookshelf",
      description: "Customizable bookshelf system that grows with your collection.",
      price: 399.99,
      category: "Furniture",
      tags: ["bookshelf", "modular", "storage"],
      imageUrl: "/placeholder.svg?height=300&width=300&query=modular bookshelf",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl">
              Fylo
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <Search />
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="space-y-10">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Recent Projects</h2>
              <Button variant="outline" asChild>
                <Link href="/projects">View all projects</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Recent Mood Boards</h2>
              <Button variant="outline" asChild>
                <Link href="/mood-boards">View all mood boards</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentMoodBoards.map((moodBoard) => (
                <MoodBoardCard key={moodBoard.id} {...moodBoard} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Featured Products</h2>
              <Button variant="outline" asChild>
                <Link href="/products">View all products</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Fylo. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Terms
            </Button>
            <Button variant="ghost" size="sm">
              Privacy
            </Button>
            <Button variant="ghost" size="sm">
              Contact
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
