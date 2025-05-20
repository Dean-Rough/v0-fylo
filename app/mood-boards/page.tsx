import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { MoodBoardCard } from "@/components/mood-board-card"
import { PlusCircle, Filter } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MoodBoardsPage() {
  // Mock data - in a real app, this would come from your database
  const moodBoards = [
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
    {
      id: "4",
      name: "Minimalist Bedroom",
      projectName: "Master Bedroom Makeover",
      projectId: "4",
      thumbnailUrl: "/minimalist-bedroom.png",
    },
    {
      id: "5",
      name: "Outdoor Lounge",
      projectName: "Outdoor Patio Design",
      projectId: "5",
      thumbnailUrl: "/outdoor-patio.png",
    },
    {
      id: "6",
      name: "Spa Bathroom",
      projectName: "Bathroom Remodel",
      projectId: "6",
      thumbnailUrl: "/spa-bathroom.png",
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
          <h1 className="text-3xl font-bold tracking-tight">Mood Boards</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Mood Board
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Mood Boards</TabsTrigger>
            <TabsTrigger value="recent">Recently Edited</TabsTrigger>
            <TabsTrigger value="shared">Shared With Me</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-4 mt-4">
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
                <SelectItem value="project">Project name</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moodBoards.map((moodBoard) => (
                <MoodBoardCard key={moodBoard.id} {...moodBoard} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recent" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moodBoards.slice(0, 3).map((moodBoard) => (
                <MoodBoardCard key={moodBoard.id} {...moodBoard} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="shared" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moodBoards.slice(3, 4).map((moodBoard) => (
                <MoodBoardCard key={moodBoard.id} {...moodBoard} />
              ))}
            </div>
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
