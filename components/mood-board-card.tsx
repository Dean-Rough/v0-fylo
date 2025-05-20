import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface MoodBoardCardProps {
  id: string
  name: string
  projectName: string
  projectId: string
  thumbnailUrl?: string
}

export function MoodBoardCard({ id, name, projectName, projectId, thumbnailUrl }: MoodBoardCardProps) {
  return (
    <Card className="overflow-hidden">
      <div
        className="aspect-video bg-muted"
        style={
          thumbnailUrl
            ? { backgroundImage: `url(${thumbnailUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
            : {}
        }
      >
        {!thumbnailUrl && (
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-muted-foreground">No preview available</span>
          </div>
        )}
      </div>
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
            <DropdownMenuItem>Edit mood board</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete mood board</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <CardDescription>
          From project:{" "}
          <Link href={`/projects/${projectId}`} className="hover:underline">
            {projectName}
          </Link>
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-1">
        <Button asChild className="w-full">
          <Link href={`/mood-boards/${id}`}>Open Editor</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
