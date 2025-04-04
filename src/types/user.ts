// types/user.ts
export interface User {
    id: number
    name: string
    email: string
    phone: string
    address?: string
    username?: string
    website?: string
    company?: {
      name: string
      catchPhrase: string
      bs: string
    }
    geo_location?: {
      latitude: string
      longitude: string
    }
  }
  