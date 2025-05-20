// Domain entities
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  name: string
  description?: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface MoodBoard {
  id: string
  name: string
  project_id: string
  layout_data?: MoodBoardLayout
  created_at: string
  updated_at: string
}

export interface MoodBoardLayout {
  items: MoodBoardItem[]
  background: string
  size: { width: number; height: number }
}

export interface MoodBoardItem {
  id: string
  type: "image" | "text" | "color" | "product"
  content: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
  zIndex: number
  style?: Record<string, any>
}

export interface Product {
  id: string
  name: string
  description?: string
  price?: number
  supplier_id?: string
  category?: string
  tags?: string[]
  image_urls?: string[]
  specs?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Supplier {
  id: string
  name: string
  contact_info?: Record<string, any>
  website?: string
  created_at: string
  updated_at: string
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  full_name?: string
}

// API response types
export interface ApiResponse<T> {
  data?: T
  error?: string
}
