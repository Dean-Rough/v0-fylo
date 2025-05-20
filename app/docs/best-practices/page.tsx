import { MarkdownContent } from "@/components/markdown-content"

export default function BestPracticesPage() {
  const content = `
# Best Practices for Sustainable Codebase

- Use interfaces to define contracts between layers
- Apply SOLID principles throughout the codebase
- Implement dependency injection for better testability
- Create feature modules rather than technical modules
- Write comprehensive tests for each layer (unit, integration, e2e)
- Document complex logic with inline comments
- Use strict TypeScript to catch errors early
- Create reusable components with well-defined props
- Implement proper error handling across application boundaries
- Establish coding standards and enforce with linting
`

  return (
    <div>
      <MarkdownContent content={content} />
    </div>
  )
}
