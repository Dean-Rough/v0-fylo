import { notFound } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search } from "@/components/search"
import Link from "next/link"
import { MoodBoardEditor } from "@/components/mood-board-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"

interface MoodBoardPageProps {
  params: {
    id: string
  }
}

export default function MoodBoardPage({ params }: MoodBoardPageProps) {
  // In a real app, you would fetch the mood board data from your API
  // For now, we'll use mock data
  const mockMoodBoard = {
    id: params.id,
    name: "Scandinavian Living Room",
    projectId: "1",
    projectName: "Modern Living Room Redesign",
    layoutData: {
      items: [
        {
          id: "item-1",
          type: "image",
          content: "/scandinavian-living-room.png",
          position: { x: 100, y: 100 },
          size: { width: 300, height: 200 },
          rotation: 0,
          zIndex: 1,
        },
        {
          id: "item-2",
          type: "image",
          content: "/minimalist-furniture.png",
          position: { x: 450, y: 150 },
          size: { width: 250, height: 180 },
          rotation: 0,
          zIndex: 2,
        },
        {
          id: "item-3",
          type: "text",
          content: "Light wood tones",
          position: { x: 200, y: 350 },
          size: { width: 200, height: 50 },
          rotation: 0,
          zIndex: 3,
          style: { fontSize: 18, fontWeight: "bold", color: "#333" },
        },
        {
          id: "item-4",
          type: "color",
          content: "#F5F5F5",
          position: { x: 450, y: 350 },
          size: { width: 100, height: 100 },
          rotation: 0,
          zIndex: 4,
        },
        {
          id: "item-5",
          type: "color",
          content: "#E0E0E0",
          position: { x: 570, y: 350 },
          size: { width: 100, height: 100 },
          rotation: 0,
          zIndex: 5,
        },
      ],
      background: "#FFFFFF",
      size: { width: 1200, height: 800 },
    },
  }

  // If the mood board doesn't exist, return a 404
  if (!mockMoodBoard) {
    notFound()
  }

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
            <Link href={`/projects/${mockMoodBoard.projectId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{mockMoodBoard.name}</h1>
            <p className="text-sm text-muted-foreground">Project: {mockMoodBoard.projectName}</p>
          </div>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
      <main className="flex-1 container py-6">
        <MoodBoardEditor moodBoard={mockMoodBoard} />
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
