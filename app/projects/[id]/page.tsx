import { notFound } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search } from "@/components/search"
import { MoodBoardCard } from "@/components/mood-board-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { ArrowLeft, PlusCircle, Users, Calendar, Edit, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // In a real app, you would fetch the project data from your API
  // For now, we'll use mock data
  const mockProjects = [
    {
      id: "1",
      name: "Modern Living Room Redesign",
      description: "Complete redesign of the living room with a focus on minimalist aesthetics and functionality.",
      createdAt: "2023-05-15T10:30:00Z",
      updatedAt: "2023-06-10T14:20:00Z",
      userId: "user-1",
      userName: "Alex Johnson",
    },
    {
      id: "2",
      name: "Kitchen Renovation",
      description: "Contemporary kitchen renovation with sustainable materials and smart appliances.",
      createdAt: "2023-06-20T14:45:00Z",
      updatedAt: "2023-07-05T09:15:00Z",
      userId: "user-1",
      userName: "Alex Johnson",
    },
  ]

  const project = mockProjects.find((p) => p.id === params.id)

  // Mock mood boards for this project
  const mockMoodBoards = [
    {
      id: "1",
      name: "Scandinavian Vibes",
      projectName: "Modern Living Room Redesign",
      projectId: "1",
      thumbnailUrl: "/scandinavian-interior.png",
    },
    {
      id: "2",
      name: "Minimalist Approach",
      projectName: "Modern Living Room Redesign",
      projectId: "1",
      thumbnailUrl: "/placeholder.svg?height=400&width=600&query=minimalist living room",
    },
    {
      id: "3",
      name: "Cozy Corner Ideas",
      projectName: "Modern Living Room Redesign",
      projectId: "1",
      thumbnailUrl: "/placeholder.svg?height=400&width=600&query=cozy living room corner",
    },
  ]

  // Mock products associated with this project
  const mockProducts = [
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

  // If the project doesn't exist, return a 404
  if (!project) {
    notFound()
  }

  // Filter mood boards for this project
  const projectMoodBoards = mockMoodBoards.filter((mb) => mb.projectId === params.id)

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
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Duplicate project</DropdownMenuItem>
              <DropdownMenuItem>Share project</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Updated: {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Owner: {project.userName}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Project Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Mood Boards</div>
                  <div className="text-2xl font-bold">{projectMoodBoards.length}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Products</div>
                  <div className="text-2xl font-bold">{mockProducts.length}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Last Activity</div>
                  <div className="text-sm">{new Date(project.updatedAt).toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="mood-boards">
          <TabsList>
            <TabsTrigger value="mood-boards">Mood Boards</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="mood-boards" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Mood Boards</h2>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Mood Board
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectMoodBoards.map((moodBoard) => (
                <MoodBoardCard key={moodBoard.id} {...moodBoard} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="products" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Products</h2>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="notes" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Project Notes</h2>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center py-8">No notes have been added to this project yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
