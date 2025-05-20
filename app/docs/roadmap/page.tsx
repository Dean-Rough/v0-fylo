import { MarkdownContent } from "@/components/markdown-content"

export default function RoadmapPage() {
  const content = `
# Development Roadmap

## Phase 1: Foundation (Weeks 1-2)

- Project setup with Next.js, TypeScript, and Tailwind
- Shadcn UI integration with dark mode
- Supabase initialization and basic schema
- Authentication implementation
- Core architecture implementation

## Phase 2: Core Features (Weeks 3-5)

- User profile management
- Project CRUD operations
- Basic mood board functionality
- Product catalog foundation
- Supplier management

## Phase 3: Advanced Features (Weeks 6-8)

- Enhanced mood board editor
- MCP integration for AI assistance
- Search and filtering capabilities
- Advanced product categorization
- User collaboration features

## Phase 4: Polish & Launch (Weeks 9-10)

- Performance optimization
- Comprehensive testing
- Documentation completion
- User feedback implementation
- Launch preparation
`

  return (
    <div>
      <MarkdownContent content={content} />
    </div>
  )
}
