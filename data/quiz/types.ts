export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface Quiz {
  id: string
  slug: string
  title: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  questions: Question[]
  estimatedTime: number
  bannerImage: string
  accentColor: string
  icon: string
  tags?: string[]
}
