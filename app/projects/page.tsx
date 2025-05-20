import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectCard } from "@/components/project-card"
import { PlusCircle, Filter } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProjectsPage() {
  // Mock data - in a real app, this would come from your database
  const projects = [
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
    {
      id: "4",
      name: "Master Bedroom Makeover",
      description: "Luxurious and calming bedroom design with a focus on comfort and relaxation.",
      moodBoardCount: 2,
      createdAt: "2023-08-05T16:20:00Z",
    },
    {
      id: "5",
      name: "Outdoor Patio Design",
      description: "Creating an inviting outdoor living space for entertaining and relaxation.",
      moodBoardCount: 1,
      createdAt: "2023-09-12T11:10:00Z",
    },
    {
      id: "6",
      name: "Bathroom Remodel",
      description: "Modern bathroom remodel with spa-like features and efficient storage solutions.",
      moodBoardCount: 2,
      createdAt: "2023-10-18T13:40:00Z",
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
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Sort by:</span>
          </div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="moodboards">Most mood boards</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
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
