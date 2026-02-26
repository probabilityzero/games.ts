import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/layout/theme-provider"
import AppShell from "@/components/layout/app-shell"
import ProfileModalRoot from "@/components/profile/profile-modal-root"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Games by Han",
  description: "Test your knowledge with interactive quizzes",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" enableSystem>
          <AppShell>
            {children}
          </AppShell>
          <ProfileModalRoot />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
