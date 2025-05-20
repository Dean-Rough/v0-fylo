import { MarkdownContent } from "@/components/markdown-content"

export default function FileStructurePage() {
  const content = `
# File Structure

\`\`\`
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── ui/              # Shadcn UI components
│   ├── features/        # Feature-specific components
│   └── layouts/         # Layout components
├── lib/                 # Shared utilities
│   ├── supabase/        # Supabase client and helpers
│   ├── mcp/             # MCP integration
│   └── utils/           # General utilities
├── domain/              # Domain layer
│   ├── entities/        # Business entities
│   ├── interfaces/      # Repository interfaces
│   └── use-cases/       # Business logic use cases
├── application/         # Application layer
│   ├── services/        # Application services
│   └── interfaces/      # Service interfaces
├── infrastructure/      # Infrastructure layer
│   ├── repositories/    # Repository implementations
│   └── services/        # External services
└── types/               # TypeScript type definitions
\`\`\`
`

  return (
    <div>
      <MarkdownContent content={content} />
    </div>
  )
}
