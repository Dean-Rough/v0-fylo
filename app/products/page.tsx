import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProductCard } from "@/components/product-card"
import { PlusCircle, Filter } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductsPage() {
  // Mock data - in a real app, this would come from your database
  const products = [
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
    {
      id: "5",
      name: "Ceramic Plant Pot",
      description: "Handcrafted ceramic pot for indoor plants with drainage hole.",
      price: 45.99,
      category: "Decor",
      tags: ["ceramic", "plant", "pot", "handcrafted"],
      imageUrl: "/placeholder.svg?height=300&width=300&query=ceramic plant pot",
    },
    {
      id: "6",
      name: "Pendant Light Fixture",
      description: "Modern pendant light with adjustable height and warm lighting.",
      price: 159.99,
      category: "Lighting",
      tags: ["pendant", "light", "modern", "ceiling"],
      imageUrl: "/placeholder.svg?height=300&width=300&query=pendant light fixture",
    },
    {
      id: "7",
      name: "Velvet Accent Chair",
      description: "Luxurious velvet chair with gold-finished metal legs.",
      price: 349.99,
      category: "Furniture",
      tags: ["chair", "velvet", "accent", "luxury"],
      imageUrl: "/placeholder.svg?height=300&width=300&query=velvet accent chair",
    },
    {
      id: "8",
      name: "Marble Coffee Table",
      description: "Elegant coffee table with marble top and metal base.",
      price: 499.99,
      category: "Furniture",
      tags: ["table", "coffee", "marble", "metal"],
      imageUrl: "/placeholder.svg?height=300&width=300&query=marble coffee table",
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
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="furniture">Furniture</TabsTrigger>
            <TabsTrigger value="lighting">Lighting</TabsTrigger>
            <TabsTrigger value="textiles">Textiles</TabsTrigger>
            <TabsTrigger value="decor">Decor</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Sort by:</span>
            </div>
            <Select defaultValue="price-low">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="newest">Newest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="furniture" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products
                .filter((product) => product.category === "Furniture")
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="lighting" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products
                .filter((product) => product.category === "Lighting")
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="textiles" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products
                .filter((product) => product.category === "Textiles")
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="decor" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products
                .filter((product) => product.category === "Decor")
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
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
