"use client"

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Simple markdown parser for basic formatting
  const formatMarkdown = (text: string) => {
    // Process the text line by line
    const lines = text.split("\n")
    const formattedLines = lines.map((line, index) => {
      // Headers
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="scroll-m-20 text-4xl font-bold tracking-tight mt-6 mb-4">
            {line.substring(2)}
          </h1>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="scroll-m-20 text-3xl font-semibold tracking-tight mt-6 mb-4">
            {line.substring(3)}
          </h2>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6 mb-4">
            {line.substring(4)}
          </h3>
        )
      }
      if (line.startsWith("#### ")) {
        return (
          <h4 key={index} className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-4">
            {line.substring(5)}
          </h4>
        )
      }

      // Code blocks
      if (line.startsWith("```") && line.endsWith("```")) {
        return (
          <pre key={index} className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
            <code>{line.substring(3, line.length - 3)}</code>
          </pre>
        )
      }

      // Lists
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 list-disc">
            {line.substring(2)}
          </li>
        )
      }

      // Horizontal rule
      if (line.startsWith("=====")) {
        return <hr key={index} className="my-6" />
      }

      // Empty line
      if (line.trim() === "") {
        return <br key={index} />
      }

      // Regular paragraph
      return (
        <p key={index} className="leading-7 mb-4">
          {line}
        </p>
      )
    })

    return <div className="prose dark:prose-invert max-w-none">{formattedLines}</div>
  }

  return formatMarkdown(content)
}
