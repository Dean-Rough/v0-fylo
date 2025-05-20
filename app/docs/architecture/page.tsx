import { MarkdownContent } from "@/components/markdown-content"

export default function ArchitecturePage() {
  const content = `
# Clean Architecture Implementation

The application will follow Clean Architecture principles with clear separation of concerns:

## Domain Layer (Core)

- Business entities (User, Project, MoodBoard, Product, Supplier)
- Business rules and logic
- Interface definitions (repositories, services)
- Use cases that represent application actions

## Application Layer

- Use case implementations
- Service orchestration
- Business logic coordination
- No dependencies on external frameworks

## Infrastructure Layer

- Supabase client implementations
- External API integrations
- Authentication mechanisms
- File storage implementations

## Presentation Layer

- Next.js pages and components
- UI state management
- User input handling
- Shadcn UI components
`

  return (
    <div>
      <MarkdownContent content={content} />
    </div>
  )
}
