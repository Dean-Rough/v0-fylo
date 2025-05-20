import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Fylo Documentation</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Welcome to the Fylo documentation. Here you'll find information about the project architecture, development
          roadmap, and best practices.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-2">Architecture</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Learn about the clean architecture implementation and separation of concerns.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/docs/architecture">View Architecture</Link>
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-2">Tech Stack</h3>
          <p className="text-sm text-muted-foreground mb-4">Explore the technologies used in the Fylo project.</p>
          <Button asChild variant="outline" size="sm">
            <Link href="/docs/tech-stack">View Tech Stack</Link>
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-2">Database Schema</h3>
          <p className="text-sm text-muted-foreground mb-4">Review the database structure and relationships.</p>
          <Button asChild variant="outline" size="sm">
            <Link href="/docs/database-schema">View Schema</Link>
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-2">Roadmap</h3>
          <p className="text-sm text-muted-foreground mb-4">See the development plan and upcoming features.</p>
          <Button asChild variant="outline" size="sm">
            <Link href="/docs/roadmap">View Roadmap</Link>
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-2">Best Practices</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Learn about coding standards and best practices for the project.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/docs/best-practices">View Best Practices</Link>
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-2">File Structure</h3>
          <p className="text-sm text-muted-foreground mb-4">Understand the organization of files and directories.</p>
          <Button asChild variant="outline" size="sm">
            <Link href="/docs/file-structure">View File Structure</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
