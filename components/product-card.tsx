import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  imageUrl: string
}

export function ProductCard({ id, name, description, price, category, tags, imageUrl }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Image
          src={imageUrl || "/placeholder.svg?height=300&width=300&query=product"}
          alt={name}
          fill
          className="object-cover"
        />
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
            <DropdownMenuItem>Edit product</DropdownMenuItem>
            <DropdownMenuItem>Add to mood board</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 h-10">{description}</CardDescription>
        <div className="flex items-center justify-between pt-4">
          <Badge variant="secondary">{category}</Badge>
          <span className="font-medium">${price.toFixed(2)}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button asChild className="w-full">
          <Link href={`/products/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
