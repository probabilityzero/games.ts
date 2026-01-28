export * from './types'

import geo from './geo-001'
import genCapitals from './gen-001' 
import physics from './sci-001'
import biology from './sci-002'

export const quizzes = [geo, genCapitals, physics, biology]
export function getQuizBySlug(slug: string) {
  return quizzes.find((quiz) => quiz.slug === slug)
}

export function getQuizzesByCategory(category: string) {
  return quizzes.filter((quiz) => quiz.category === category)
}

export function getAllCategories() {
  const categories = new Set(quizzes.map((quiz) => quiz.category))
  return Array.from(categories).sort()
}
