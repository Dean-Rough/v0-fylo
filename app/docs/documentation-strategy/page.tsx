import { MarkdownContent } from "@/components/markdown-content"

export default function DocumentationStrategyPage() {
  const content = `
# Documentation Strategy

## Architecture Documentation

- C4 model diagrams for system context, containers, components
- Architecture Decision Records (ADRs) for key decisions
- Dependency diagrams showing module relationships

## API Documentation

- OpenAPI/Swagger specifications for endpoints
- Type definitions and interfaces
- Authentication flow documentation

## Development Guidelines

- Coding standards and conventions
- Git workflow (branching strategy, PR templates)
- Testing requirements and coverage expectations

## User Documentation

- Feature guides with visual examples
- Admin documentation for system management
- Troubleshooting guides
`

  return (
    <div>
      <MarkdownContent content={content} />
    </div>
  )
}
