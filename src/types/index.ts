export interface Service {
  id: string
  title: string
  description: string
  price: string
  icon: string
  order: number
  visible: boolean
}

export interface Photo {
  id: string
  url: string
  caption: string
  category: string
  created_at: string
}

export interface Review {
  id: string
  author: string
  text: string
  rating: number
  source: string
  visible: boolean
  created_at: string
}

export type Settings = Record<string, string>
