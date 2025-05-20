import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, MoreHorizontal, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface ProjectCardProps {
  id: string
  name: string
  description: string
  moodBoardCount: number
  createdAt: string
}

export function ProjectCard({ id, name, description, moodBoardCount, createdAt }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit project</DropdownMenuItem>
            <DropdownMenuItem>Duplicate project</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 h-10">{description}</CardDescription>
        <div className="flex items-center pt-4">
          <Palette className="mr-1 h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {moodBoardCount} mood board{moodBoardCount === 1 ? "" : "s"}
          </span>
          <div className="ml-auto flex items-center">
            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button asChild className="w-full">
          <Link href={`/projects/${id}`}>View Project</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
