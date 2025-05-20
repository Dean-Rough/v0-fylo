import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { PlusCircle, ExternalLink, Mail, Phone, Globe } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SuppliersPage() {
  // Mock data - in a real app, this would come from your database
  const suppliers = [
    {
      id: "1",
      name: "Modern Furnishings Co.",
      contactInfo: {
        email: "contact@modernfurnishings.com",
        phone: "+1 (555) 123-4567",
      },
      website: "https://www.modernfurnishings.com",
      productCount: 12,
    },
    {
      id: "2",
      name: "Illuminate Lighting",
      contactInfo: {
        email: "sales@illuminatelighting.com",
        phone: "+1 (555) 234-5678",
      },
      website: "https://www.illuminatelighting.com",
      productCount: 8,
    },
    {
      id: "3",
      name: "Textile Treasures",
      contactInfo: {
        email: "info@textiletreasures.com",
        phone: "+1 (555) 345-6789",
      },
      website: "https://www.textiletreasures.com",
      productCount: 15,
    },
    {
      id: "4",
      name: "Artisan Decor",
      contactInfo: {
        email: "hello@artisandecor.com",
        phone: "+1 (555) 456-7890",
      },
      website: "https://www.artisandecor.com",
      productCount: 10,
    },
    {
      id: "5",
      name: "Sustainable Home Goods",
      contactInfo: {
        email: "support@sustainablehome.com",
        phone: "+1 (555) 567-8901",
      },
      website: "https://www.sustainablehome.com",
      productCount: 7,
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
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Supplier Directory</CardTitle>
            <CardDescription>Manage your product suppliers and their contact information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                          <span className="text-sm">{supplier.contactInfo.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                          <span className="text-sm">{supplier.contactInfo.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Globe className="h-3 w-3 mr-2 text-muted-foreground" />
                        <a
                          href={supplier.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:underline flex items-center"
                        >
                          Visit site
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>{supplier.productCount} products</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View supplier details</DropdownMenuItem>
                          <DropdownMenuItem>Edit supplier</DropdownMenuItem>
                          <DropdownMenuItem>View products</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete supplier</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
