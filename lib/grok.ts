import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

export async function getProductRecommendations(prompt: string) {
  try {
    const { text } = await generateText({
      model: xai("grok-1"),
      prompt: `You are a design assistant helping with interior design projects. Based on the following description, suggest 5 products that would work well together. For each product, provide a name, brief description, estimated price range, and category.

Description: ${prompt}

Format your response as a JSON array with the following structure:
[
  {
    "name": "Product Name",
    "description": "Brief description",
    "price": "Price range (e.g., $100-$200)",
    "category": "Category (e.g., Furniture, Lighting, Textiles, Decor)"
  }
]

Only respond with the JSON array, no other text.`,
    })

    // Parse the JSON response
    const recommendations = JSON.parse(text)
    return { recommendations }
  } catch (error) {
    console.error("Error getting AI recommendations:", error)
    throw new Error("Failed to get product recommendations")
  }
}

export async function getDesignSuggestions(moodBoardItems: any[]) {
  try {
    // Extract relevant information from mood board items
    const colors = moodBoardItems.filter((item) => item.type === "color").map((item) => item.content)

    const textElements = moodBoardItems.filter((item) => item.type === "text").map((item) => item.content)

    const productElements = moodBoardItems
      .filter((item) => item.type === "product")
      .map((item) => item.style?.productName || "Unknown product")

    const { text } = await generateText({
      model: xai("grok-1"),
      prompt: `You are a design assistant helping with interior design projects. Based on the following elements in a mood board, provide design suggestions and tips.

Colors: ${colors.join(", ") || "None"}
Text elements: ${textElements.join(", ") || "None"}
Products: ${productElements.join(", ") || "None"}

Provide 3-5 design suggestions that would complement these elements. Consider color harmony, style consistency, and practical design principles.

Format your response as a JSON array with the following structure:
[
  {
    "title": "Suggestion title",
    "description": "Detailed suggestion"
  }
]

Only respond with the JSON array, no other text.`,
    })

    // Parse the JSON response
    const suggestions = JSON.parse(text)
    return { suggestions }
  } catch (error) {
    console.error("Error getting AI design suggestions:", error)
    throw new Error("Failed to get design suggestions")
  }
}
