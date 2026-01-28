"use client"

import Link from "next/link"
import { getAllCategories, quizzes } from "@/data/quiz"
import { useEffect, useState } from "react"
import { getAllProgress } from "@/lib/quiz-storage"
import { getUserProfile } from "@/lib/profile-storage"
import { HiQuestionMarkCircle, HiLightningBolt, HiCheckCircle, HiArrowRight } from "react-icons/hi"
import type { QuizProgress } from "@/lib/quiz-storage"
import type { UserProfile } from "@/lib/profile-storage"
import AppFooter from "@/components/layout/app-header"

export default function Home() {
  const [progress, setProgress] = useState<Record<string, QuizProgress>>({})
  const [mounted, setMounted] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    setProgress(getAllProgress())
    const savedProfile = getUserProfile()
    if (savedProfile) {
      setProfile(savedProfile)
    }
    setMounted(true)
  }, [])

  const categories = getAllCategories()

  if (!mounted) {
    return null
  }

  const totalQuizzes = quizzes.length
  const completedQuizzes = Object.values(progress).filter(p => p.attempts.length > 0).length
  const totalQuestions = quizzes.reduce((sum, q) => sum + q.questions.length, 0)

  return (
    <>
    <main className="min-h-screen bg-background transition-smooth">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-10 lg:py-12">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12 transition-enter">
          <div className="text-center mb-4 md:mb-6">
            <div className="relative inline-block">
              <div className="absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-accent/10 rounded-full blur-2xl"></div>
              
              <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-2 md:mb-3">
                <span className="block bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  QUIZDAY
                </span>
              </h1>
              
              <div className="relative flex items-center justify-center gap-2 md:gap-3">
                <div className="h-px w-6 md:w-10 bg-linear-to-r from-transparent via-primary to-transparent"></div>
                <p className="text-base md:text-lg lg:text-xl font-light tracking-[0.3em] text-muted-foreground">
                  BY <span className="font-semibold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">HAN</span>
                </p>
                <div className="h-px w-6 md:w-10 bg-linear-to-r from-transparent via-accent to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed px-4">
              Participate every quizday and win prizes! Test your knowledge across topics and challenge yourself with the weekly quizzes.
            </p>

            {profile && (
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 border border-primary/20 rounded-full">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <span className="text-xs md:text-sm">
                  Welcome back, <span className="font-semibold text-primary">{profile.name}!</span>
                </span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto pt-4 md:pt-6">
              <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-primary/30 transition-all">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                  {totalQuizzes}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Total Quizzes</div>
              </div>
              <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-accent/30 transition-all">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-br from-accent to-accent/70 bg-clip-text text-transparent">
                  {totalQuestions}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Questions</div>
              </div>
              <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-green-500/30 transition-all">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-500">
                  {completedQuizzes}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6 md:space-y-10">
          {categories.map((category) => {
            const categoryQuizzes = quizzes.filter((q) => q.category === category)
            return (
              <div key={category}>
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{category}</h2>
                  <div className="flex-1 h-px bg-linear-to-r from-border to-transparent"></div>
                  <span className="text-xs md:text-sm text-muted-foreground">{categoryQuizzes.length} quizzes</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                  {categoryQuizzes.map((quiz) => {
                    const quizProgress = progress[quiz.id]
                    const hasAttempts = quizProgress && quizProgress.attempts.length > 0
                    const lastAttempt = hasAttempts ? quizProgress!.attempts[quizProgress!.attempts.length - 1] : null
                    const percentage = lastAttempt
                      ? Math.round((lastAttempt.score / lastAttempt.totalQuestions) * 100)
                      : 0

                    return (
                      <Link key={quiz.id} href={`/${quiz.slug}`}>
                        <div className="group h-full bg-card border border-border rounded-lg md:rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer flex flex-col active:scale-[0.98]">
                          <div className="relative">
                            <div
                              className={`w-full aspect-video bg-linear-to-br ${quiz.accentColor} relative overflow-hidden flex items-center justify-center`}
                            >
                              {quiz.bannerImage && (
                                <img
                                  src={quiz.bannerImage}
                                  alt={quiz.title + " banner"}
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                              )}

                              <div className="absolute inset-0 bg-black/10" />

                              <div className="absolute bottom-0 left-0 right-0 h-24 z-10 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

                              {hasAttempts && (
                                <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-white/95 text-green-600 text-[10px] md:text-xs font-semibold px-2 md:px-2.5 py-1 md:py-1.5 rounded-full shadow-sm flex items-center gap-1">
                                  <HiCheckCircle className="w-3 h-3" />
                                  Completed
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 px-3 pb-2 flex flex-col grow z-20 border-b border-border">
                                {quiz.tags && quiz.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 pb-1">
                                    {quiz.tags.slice(0, 3).map((tag) => (
                                      <span
                                        key={tag}
                                        className="bg-white/20 text-white backdrop-blur-sm border border-white/30 capitalize text-[10px] md:text-xs px-2 py-px md:py-0.5 rounded-2xl"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <h3 className="text-base md:text-lg font-semibold line-clamp-2 text-white">
                                  {quiz.title}
                                </h3>
                                <p className="text-xs md:text-sm text-white/80 line-clamp-1">
                                  {quiz.description}
                                </p>
                              </div>
                            </div>
                          </div>

                        <div className="px-4 py-3 space-y-2 md:space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-start gap-1.5 md:gap-2">
                              <HiQuestionMarkCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground mt-0.5 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] md:text-xs text-muted-foreground">Questions</div>
                                <div className="text-xs md:text-sm font-semibold">{quiz.questions.length}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-1.5 md:gap-2">
                              <HiLightningBolt className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground mt-0.5 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] md:text-xs text-muted-foreground">Difficulty</div>
                                <div className={`text-xs md:text-sm font-semibold capitalize ${
                                  quiz.difficulty === 'easy' ? 'text-green-500' :
                                  quiz.difficulty === 'medium' ? 'text-yellow-500' :
                                  'text-red-500'
                                }`}>
                                  {quiz.difficulty}
                                </div>
                              </div>
                            </div>
                          </div>

                          {hasAttempts ? (
                            <div className="space-y-1.5 md:space-y-2 bg-accent/10 rounded-lg p-2.5 md:p-3 mt-auto">
                              <div className="flex items-center justify-between text-[10px] md:text-xs font-medium">
                                <span className="text-muted-foreground">Your Score</span>
                                <span className={`font-bold ${
                                  percentage >= 80 ? 'text-green-500' :
                                  percentage >= 60 ? 'text-yellow-500' :
                                  'text-red-500'
                                }`}>
                                  {percentage}%
                                </span>
                              </div>
                              <div className="w-full bg-muted/50 rounded-full h-1.5 md:h-2 overflow-hidden">
                                <div
                                  className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                                    percentage >= 80 ? 'bg-green-500' :
                                    percentage >= 60 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <button className="group/btn w-full bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground rounded-lg p-2.5 md:p-3 text-center mt-auto transition-all duration-200 hover:shadow-md active:scale-95">
                              <span className="text-xs md:text-sm font-semibold inline-flex items-center gap-1.5 md:gap-2 group-hover/btn:gap-2.5 transition-all">
                                Start Quiz
                                <HiArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                              </span>
                            </button>
                          )} 
                        </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
    <AppFooter /></>
  )
}
