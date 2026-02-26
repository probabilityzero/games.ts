"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "./theme-provider"
import type { ReactNode } from "react"

/* ─── Nav items ──────────────────────────────────────────────────────────── */

interface NavItem {
  href: string
  label: string
  icon: ReactNode
  activeIcon: ReactNode
  exact?: boolean
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Home",
    exact: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m0 0H7a2 2 0 01-2-2v-5m10 7h3a2 2 0 002-2v-5m-9 7V12" />
      </svg>
    ),
    activeIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h3a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
  },
  {
    href: "/quiz",
    label: "Quiz",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    activeIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
    ),
  },
  {
    href: "/hunch",
    label: "Hunch",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    activeIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    href: "/tictactoe",
    label: "Tic-Tac-Toe",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    activeIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
]

/* ─── Page title map ─────────────────────────────────────────────────────── */

const PAGE_TITLES: Record<string, string> = {
  "/": "Games",
  "/quiz": "Quiz",
  "/hunch": "Hunch",
  "/tictactoe": "Tic-Tac-Toe",
}

function getPageMeta(pathname: string): { title: string; parent: string | null } {
  if (PAGE_TITLES[pathname]) return { title: PAGE_TITLES[pathname], parent: null }
  // Sub-routes: e.g. /quiz/gen-001
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length >= 2) {
    const parentPath = "/" + segments.slice(0, -1).join("/")
    const parentTitle = PAGE_TITLES[parentPath] ?? segments.slice(-2, -1)[0]
    return { title: segments[segments.length - 1].replace(/-/g, " "), parent: parentPath }
  }
  return { title: pathname.replace(/\//g, ""), parent: null }
}

/* ─── isActive ───────────────────────────────────────────────────────────── */

function isActive(itemHref: string, pathname: string, exact?: boolean) {
  if (exact) return pathname === itemHref
  return pathname === itemHref || pathname.startsWith(itemHref + "/")
}

/* ─── Theme toggle icon ──────────────────────────────────────────────────── */

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-xl text-white/40 hover:text-white/80 hover:bg-white/8 transition-all duration-150"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd"/>
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
        </svg>
      )}
    </button>
  )
}

/* ─── macOS Traffic Lights ───────────────────────────────────────────────── */

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5 px-4">
      <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] shadow-sm" />
      <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a22a] shadow-sm" />
      <span className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] shadow-sm" />
    </div>
  )
}

/* ─── Back button ────────────────────────────────────────────────────────── */

function BackButton({ to }: { to: string }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(to)}
      className="flex items-center gap-1 text-white/60 hover:text-white text-sm font-medium transition-colors duration-150 px-1"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {PAGE_TITLES[to] ?? "Back"}
    </button>
  )
}

/* ─── Desktop Sidebar ────────────────────────────────────────────────────── */

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="fixed top-0 left-0 h-screen w-[220px] flex flex-col z-30 bg-[#0a0a0e]/95 backdrop-blur-xl border-r border-white/7">
      {/* macOS titlebar area — with traffic lights */}
      <div className="h-11 flex items-center shrink-0 border-b border-white/6">
        <TrafficLights />
      </div>

      {/* App identity */}
      <div className="px-4 py-4 flex items-center gap-3 border-b border-white/6">
        <div className="w-8 h-8 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm shadow-md shrink-0">
          🎮
        </div>
        <div className="min-w-0">
          <p className="text-white font-bold text-sm leading-none">Games</p>
          <p className="text-white/35 text-[11px] mt-0.5">by Han</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        <p className="px-3 pt-1 pb-2 text-[10px] font-semibold text-white/25 uppercase tracking-widest">Library</p>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, pathname, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <span className={`shrink-0 transition-colors ${active ? "text-white" : "text-white/40 group-hover:text-white/60"}`}>
                {active ? item.activeIcon : item.icon}
              </span>
              <span className="truncate">{item.label}</span>
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom controls */}
      <div className="px-3 py-3 border-t border-white/6 flex items-center justify-between">
        <span className="text-[11px] text-white/20">v1.0</span>
        <ThemeToggle />
      </div>
    </aside>
  )
}

/* ─── Desktop Titlebar ───────────────────────────────────────────────────── */

function Titlebar({ pathname }: { pathname: string }) {
  const { title, parent } = getPageMeta(pathname)
  return (
    <header className="fixed top-0 w-full h-11 z-20 flex items-center px-5 gap-3 bg-[#0e0e12]/80 backdrop-blur-xl border-b border-white/6">
      {parent ? (
        <BackButton to={parent} />
      ) : (
        <h1 className="text-white/70 font-semibold text-sm capitalize">{title}</h1>
      )}
    </header>
  )
}

/* ─── Mobile Top Header ──────────────────────────────────────────────────── */

function MobileHeader({ pathname }: { pathname: string }) {
  const { title, parent } = getPageMeta(pathname)
  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-14 flex items-center px-4 gap-3 bg-[#0a0a0e]/95 backdrop-blur-xl border-b border-white/7 safe-top">
      {parent ? (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs shadow">
            🎮
          </div>
          <span className="text-white font-bold text-base">{title}</span>
        </div>
      ) : (
        <BackButton to="/" />
      )}
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  )
}

/* ─── Mobile Bottom Tabs ─────────────────────────────────────────────────── */

function BottomTabs({ pathname }: { pathname: string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex bg-[#0a0a0e]/95 backdrop-blur-xl border-t border-white/7 safe-bottom">
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href, pathname, item.exact)
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 group transition-colors duration-150"
          >
            <span className={`transition-all duration-150 ${active ? "text-violet-400 scale-110" : "text-white/35 group-hover:text-white/60"}`}>
              {active ? item.activeIcon : item.icon}
            </span>
            <span className={`text-[10px] font-medium leading-none transition-colors ${active ? "text-violet-400" : "text-white/30"}`}>
              {item.label}
            </span>
            {active && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-violet-400 rounded-t-full" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

/* ─── App Shell ──────────────────────────────────────────────────────────── */

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/"

  return (
    <div className="min-h-screen relative bg-background text-foreground">
      {/* ── Desktop layout (md+) ── */}
      <div className="hidden md:block">
        {/* <Sidebar pathname={pathname} /> */}
        <Titlebar pathname={pathname} />
        {/* Content: sidebar offset + titlebar offset */}
        <main className="pt-11 min-h-screen">
          {children}
        </main>
      </div>

      {/* ── Mobile layout (< md) ── */}
      <div className="md:hidden">
        <MobileHeader pathname={pathname} />
        {/* Content: top header + bottom tabs */}
        <main className="pt-14 pb-[72px] min-h-screen">
          {children}
        </main>
        {/* <BottomTabs pathname={pathname} /> */}
      </div>
    </div>
  )
}
