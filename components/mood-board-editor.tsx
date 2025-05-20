"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ImageIcon,
  Type,
  Palette,
  Package,
  Move,
  Trash,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronUp,
  ChevronDown,
  Plus,
  Upload,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import type { MoodBoard, MoodBoardItem, MoodBoardLayout, Product } from "@/types"
import { updateMoodBoardLayout } from "@/app/actions/mood-boards"
import { uploadMoodBoardImage } from "@/app/actions/uploads"
import { getAIProductRecommendations, getAIDesignSuggestions } from "@/app/actions/ai"
import { useToast } from "@/hooks/use-toast"

interface MoodBoardEditorProps {
  moodBoard: MoodBoard
  products?: Product[]
}

export function MoodBoardEditor({ moodBoard, products = [] }: MoodBoardEditorProps) {
  const [items, setItems] = useState<MoodBoardItem[]>(moodBoard.layout_data?.items || [])
  const [background, setBackground] = useState<string>(moodBoard.layout_data?.background || "#FFFFFF")
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const canvasRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMobile()
  const { toast } = useToast()

  const selectedItem = items.find((item) => item.id === selectedItemId)

  // Save the mood board layout
  const saveLayout = async () => {
    setIsSaving(true)
    setError(null)

    try {
      const layoutData: MoodBoardLayout = {
        items,
        background,
        size: moodBoard.layout_data?.size || { width: 1200, height: 800 },
      }

      const result = await updateMoodBoardLayout(moodBoard.id, layoutData)

      if (result.error) {
        setError(result.error)
        toast({
          title: "Error saving mood board",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Mood board saved",
          description: "Your changes have been saved successfully.",
        })
      }
    } catch (err) {
      console.error("Error saving mood board:", err)
      setError("An unexpected error occurred while saving.")
      toast({
        title: "Error saving mood board",
        description: "An unexpected error occurred while saving.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadMoodBoardImage(formData)

      if (result.error) {
        setError(result.error)
        toast({
          title: "Error uploading image",
          description: result.error,
          variant: "destructive",
        })
      } else if (result.data) {
        // Add the image to the mood board
        const newItem: MoodBoardItem = {
          id: `item-${Date.now()}`,
          type: "image",
          content: result.data.url,
          position: { x: 200, y: 200 },
          size: { width: 300, height: 200 },
          rotation: 0,
          zIndex: items.length + 1,
        }

        setItems([...items, newItem])
        setSelectedItemId(newItem.id)

        toast({
          title: "Image uploaded",
          description: "The image has been added to your mood board.",
        })
      }
    } catch (err) {
      console.error("Error uploading image:", err)
      setError("An unexpected error occurred while uploading the image.")
      toast({
        title: "Error uploading image",
        description: "An unexpected error occurred while uploading the image.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  // Get AI product recommendations
  const getRecommendations = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description to get product recommendations.",
        variant: "destructive",
      })
      return
    }

    setIsLoadingAI(true)
    setError(null)

    try {
      const result = await getAIProductRecommendations(aiPrompt)

      if (result.error) {
        setError(result.error)
        toast({
          title: "Error getting recommendations",
          description: result.error,
          variant: "destructive",
        })
      } else if (result.data) {
        setAiRecommendations(result.data)
      }
    } catch (err) {
      console.error("Error getting AI recommendations:", err)
      setError("An unexpected error occurred while getting recommendations.")
      toast({
        title: "Error getting recommendations",
        description: "An unexpected error occurred while getting recommendations.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingAI(false)
    }
  }

  // Get AI design suggestions based on current mood board
  const getSuggestions = async () => {
    setIsLoadingAI(true)
    setError(null)

    try {
      const result = await getAIDesignSuggestions(items)

      if (result.error) {
        setError(result.error)
        toast({
          title: "Error getting suggestions",
          description: result.error,
          variant: "destructive",
        })
      } else if (result.data) {
        setAiSuggestions(result.data)
      }
    } catch (err) {
      console.error("Error getting AI suggestions:", err)
      setError("An unexpected error occurred while getting suggestions.")
      toast({
        title: "Error getting suggestions",
        description: "An unexpected error occurred while getting suggestions.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingAI(false)
    }
  }

  // Handle item selection
  const handleItemClick = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedItemId(itemId)
  }

  // Handle canvas click (deselect)
  const handleCanvasClick = () => {
    setSelectedItemId(null)
  }

  // Handle item drag start
  const handleDragStart = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation()
    setIsDragging(true)
    setSelectedItemId(itemId)

    const item = items.find((i) => i.id === itemId)
    if (item) {
      const rect = (e.target as HTMLElement).getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  // Handle item drag
  const handleDrag = (e: React.MouseEvent) => {
    if (isDragging && selectedItemId && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect()
      const newX = (e.clientX - canvasRect.left - dragOffset.x) / zoom
      const newY = (e.clientY - canvasRect.top - dragOffset.y) / zoom

      setItems((prevItems) =>
        prevItems.map((item) => (item.id === selectedItemId ? { ...item, position: { x: newX, y: newY } } : item)),
      )
    }
  }

  // Handle item drag end
  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Handle item deletion
  const handleDeleteItem = () => {
    if (selectedItemId) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== selectedItemId))
      setSelectedItemId(null)
    }
  }

  // Handle item rotation
  const handleRotateItem = () => {
    if (selectedItemId) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === selectedItemId ? { ...item, rotation: (item.rotation + 15) % 360 } : item,
        ),
      )
    }
  }

  // Handle item z-index change
  const handleMoveForward = () => {
    if (selectedItemId) {
      setItems((prevItems) => {
        const newItems = [...prevItems]
        const index = newItems.findIndex((item) => item.id === selectedItemId)
        if (index < newItems.length - 1) {
          const item = newItems[index]
          const nextItem = newItems[index + 1]
          newItems[index] = { ...item, zIndex: nextItem.zIndex }
          newItems[index + 1] = { ...nextItem, zIndex: item.zIndex }
          newItems.sort((a, b) => a.zIndex - b.zIndex)
        }
        return newItems
      })
    }
  }

  const handleMoveBackward = () => {
    if (selectedItemId) {
      setItems((prevItems) => {
        const newItems = [...prevItems]
        const index = newItems.findIndex((item) => item.id === selectedItemId)
        if (index > 0) {
          const item = newItems[index]
          const prevItem = newItems[index - 1]
          newItems[index] = { ...item, zIndex: prevItem.zIndex }
          newItems[index - 1] = { ...prevItem, zIndex: item.zIndex }
          newItems.sort((a, b) => a.zIndex - b.zIndex)
        }
        return newItems
      })
    }
  }

  // Handle text content change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedItemId) {
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === selectedItemId ? { ...item, content: e.target.value } : item)),
      )
    }
  }

  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedItemId) {
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === selectedItemId ? { ...item, content: e.target.value } : item)),
      )
    }
  }

  // Handle background color change
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackground(e.target.value)
  }

  // Add new text item
  const handleAddText = () => {
    const newItem: MoodBoardItem = {
      id: `item-${Date.now()}`,
      type: "text",
      content: "New Text",
      position: { x: 200, y: 200 },
      size: { width: 200, height: 50 },
      rotation: 0,
      zIndex: items.length + 1,
      style: { fontSize: 18, fontWeight: "normal", color: "#333333" },
    }
    setItems([...items, newItem])
    setSelectedItemId(newItem.id)
  }

  // Add new color swatch
  const handleAddColor = () => {
    const newItem: MoodBoardItem = {
      id: `item-${Date.now()}`,
      type: "color",
      content: "#CCCCCC",
      position: { x: 200, y: 200 },
      size: { width: 100, height: 100 },
      rotation: 0,
      zIndex: items.length + 1,
    }
    setItems([...items, newItem])
    setSelectedItemId(newItem.id)
  }

  // Add product to mood board
  const handleAddProduct = (product: Product) => {
    const newItem: MoodBoardItem = {
      id: `item-${Date.now()}`,
      type: "product",
      content: product.image_urls?.[0] || "/diverse-products-still-life.png",
      position: { x: 200, y: 200 },
      size: { width: 200, height: 200 },
      rotation: 0,
      zIndex: items.length + 1,
      style: { productId: product.id, productName: product.name },
    }
    setItems([...items, newItem])
    setSelectedItemId(newItem.id)
  }

  // Add AI recommendation to mood board
  const handleAddRecommendation = (recommendation: any) => {
    const newItem: MoodBoardItem = {
      id: `item-${Date.now()}`,
      type: "text",
      content: `${recommendation.name}\n${recommendation.price}`,
      position: { x: 200, y: 200 },
      size: { width: 200, height: 80 },
      rotation: 0,
      zIndex: items.length + 1,
      style: { fontSize: 14, fontWeight: "bold", color: "#333333" },
    }
    setItems([...items, newItem])
    setSelectedItemId(newItem.id)
  }

  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  // Mouse events for drag and drop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDrag(e as unknown as React.MouseEvent)
      }
    }

    const handleMouseUp = () => {
      if (isDragging) {
        handleDragEnd()
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, selectedItemId])

  // Auto-save when items or background change
  useEffect(() => {
    const autoSaveTimeout = setTimeout(() => {
      if (moodBoard.id && (items.length > 0 || background !== "#FFFFFF")) {
        saveLayout()
      }
    }, 5000) // Auto-save after 5 seconds of inactivity

    return () => clearTimeout(autoSaveTimeout)
  }, [items, background])

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left sidebar - Tools */}
      <div className="w-full lg:w-64">
        <Card>
          <CardContent className="p-4">
            <Tabs defaultValue="elements">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="elements">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Elements</span>
                </TabsTrigger>
                <TabsTrigger value="images">
                  <ImageIcon className="h-4 w-4" />
                  <span className="sr-only">Images</span>
                </TabsTrigger>
                <TabsTrigger value="products">
                  <Package className="h-4 w-4" />
                  <span className="sr-only">Products</span>
                </TabsTrigger>
                <TabsTrigger value="ai">
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
                    <path d="M12 2a8 8 0 0 0-8 8c0 1.5.5 2.5 1.5 3.5L12 20l6.5-6.5c1-1 1.5-2 1.5-3.5a8 8 0 0 0-8-8z" />
                  </svg>
                  <span className="sr-only">AI</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="elements" className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={handleAddText} className="flex flex-col h-20 py-2">
                    <Type className="h-5 w-5 mb-1" />
                    <span>Add Text</span>
                  </Button>
                  <Button variant="outline" onClick={handleAddColor} className="flex flex-col h-20 py-2">
                    <Palette className="h-5 w-5 mb-1" />
                    <span>Add Color</span>
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={background}
                      onChange={handleBackgroundChange}
                      className="w-10 h-10 p-1"
                    />
                    <Input type="text" value={background} onChange={handleBackgroundChange} className="flex-1" />
                  </div>
                </div>

                <Button onClick={saveLayout} disabled={isSaving} className="w-full">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Mood Board"
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="images" className="space-y-4">
                <div className="flex flex-col gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                  />
                  <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="w-full">
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </>
                    )}
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-muted rounded-md overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
                        style={{
                          backgroundImage: `url(/placeholder.svg?height=200&width=200&query=interior design ${i + 1})`,
                          backgroundSize: "cover",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="products" className="space-y-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleAddProduct(product)}
                      >
                        <div className="aspect-square relative">
                          <img
                            src={product.image_urls?.[0] || "/placeholder.svg?height=300&width=300&query=product"}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-2">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-xs text-muted-foreground">${product.price?.toFixed(2) || "N/A"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-prompt">Describe what you're looking for</Label>
                  <Textarea
                    id="ai-prompt"
                    placeholder="E.g., Suggest products for a minimalist Scandinavian living room"
                    className="min-h-[100px]"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <Button className="w-full" onClick={getRecommendations} disabled={isLoadingAI || !aiPrompt.trim()}>
                    {isLoadingAI ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Suggestions"
                    )}
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {aiRecommendations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Recommendations</h4>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2">
                        {aiRecommendations.map((recommendation, index) => (
                          <div
                            key={index}
                            className="p-2 border rounded-md cursor-pointer hover:bg-muted"
                            onClick={() => handleAddRecommendation(recommendation)}
                          >
                            <h5 className="font-medium text-sm">{recommendation.name}</h5>
                            <p className="text-xs text-muted-foreground">{recommendation.price}</p>
                            <p className="text-xs">{recommendation.description}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={getSuggestions}
                  disabled={isLoadingAI || items.length === 0}
                >
                  {isLoadingAI ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Current Mood Board"
                  )}
                </Button>

                {aiSuggestions.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Design Suggestions</h4>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="p-2 border rounded-md">
                            <h5 className="font-medium text-sm">{suggestion.title}</h5>
                            <p className="text-xs">{suggestion.description}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Main canvas area */}
      <div className="flex-1 overflow-hidden">
        <Card className="h-full">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 0.5}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <div className="w-20 text-center text-sm">{Math.round(zoom * 100)}%</div>
                <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 2}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>

              {selectedItemId && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleMoveBackward}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleMoveForward}>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRotateItem}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDeleteItem}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-800 rounded-md">
              <div
                className="relative"
                style={{
                  width: `${moodBoard.layout_data?.size.width * zoom}px`,
                  height: `${moodBoard.layout_data?.size.height * zoom}px`,
                  background: background,
                  transform: `scale(${zoom})`,
                  transformOrigin: "0 0",
                }}
                onClick={handleCanvasClick}
                ref={canvasRef}
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={cn("absolute cursor-move", selectedItemId === item.id && "ring-2 ring-primary")}
                    style={{
                      left: `${item.position.x}px`,
                      top: `${item.position.y}px`,
                      width: `${item.size.width}px`,
                      height: `${item.size.height}px`,
                      transform: `rotate(${item.rotation}deg)`,
                      zIndex: item.zIndex,
                    }}
                    onClick={(e) => handleItemClick(item.id, e)}
                    onMouseDown={(e) => handleDragStart(e, item.id)}
                  >
                    {item.type === "image" || item.type === "product" ? (
                      <img src={item.content || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    ) : item.type === "text" ? (
                      <div className="w-full h-full flex items-center justify-center p-2" style={item.style}>
                        {item.content}
                      </div>
                    ) : item.type === "color" ? (
                      <div className="w-full h-full" style={{ backgroundColor: item.content }} />
                    ) : null}

                    {selectedItemId === item.id && (
                      <div className="absolute -top-4 -left-4 bg-background border rounded-full p-1 cursor-move">
                        <Move className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right sidebar - Properties */}
      {selectedItem && (
        <div className="w-full lg:w-64">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">Properties</h3>

              {selectedItem.type === "text" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="text-content">Text Content</Label>
                    <Textarea id="text-content" value={selectedItem.content} onChange={handleTextChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="text-color"
                        type="color"
                        value={selectedItem.style?.color || "#000000"}
                        className="w-10 h-10 p-1"
                      />
                      <Input type="text" value={selectedItem.style?.color || "#000000"} className="flex-1" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="font-size">Font Size</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        id="font-size"
                        defaultValue={[selectedItem.style?.fontSize || 16]}
                        max={72}
                        min={8}
                        step={1}
                        className="flex-1"
                      />
                      <span className="w-8 text-center">{selectedItem.style?.fontSize || 16}</span>
                    </div>
                  </div>
                </>
              )}

              {selectedItem.type === "color" && (
                <div className="space-y-2">
                  <Label htmlFor="color-value">Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="color-value"
                      type="color"
                      value={selectedItem.content}
                      onChange={handleColorChange}
                      className="w-10 h-10 p-1"
                    />
                    <Input type="text" value={selectedItem.content} onChange={handleColorChange} className="flex-1" />
                  </div>
                </div>
              )}

              {(selectedItem.type === "image" || selectedItem.type === "product") && (
                <>
                  <div className="space-y-2">
                    <Label>Image</Label>
                    <div className="aspect-video bg-muted rounded-md overflow-hidden">
                      <img
                        src={selectedItem.content || "/placeholder.svg"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {selectedItem.type === "product" && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{selectedItem.style?.productName}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        View Product Details
                      </Button>
                    </div>
                  )}
                </>
              )}

              <div className="space-y-2">
                <Label>Position & Size</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">X</Label>
                    <Input type="number" value={Math.round(selectedItem.position.x)} className="h-8" />
                  </div>
                  <div>
                    <Label className="text-xs">Y</Label>
                    <Input type="number" value={Math.round(selectedItem.position.y)} className="h-8" />
                  </div>
                  <div>
                    <Label className="text-xs">Width</Label>
                    <Input type="number" value={Math.round(selectedItem.size.width)} className="h-8" />
                  </div>
                  <div>
                    <Label className="text-xs">Height</Label>
                    <Input type="number" value={Math.round(selectedItem.size.height)} className="h-8" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rotation">Rotation</Label>
                <div className="flex items-center gap-2">
                  <Slider id="rotation" defaultValue={[selectedItem.rotation]} max={360} step={1} className="flex-1" />
                  <span className="w-12 text-center">{selectedItem.rotation}°</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
