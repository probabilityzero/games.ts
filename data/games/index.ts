export type GameStatus = "available" | "new" | "beta" | "coming-soon" | "updated";
export type GameGenre = "trivia" | "puzzle" | "strategy" | "arcade" | "word" | "board" | "multiplayer";

export interface GameTag {
  label: string;
  color: "blue" | "green" | "orange" | "purple" | "pink" | "yellow" | "red" | "teal";
}

export interface Game {
  id: string;
  slug: string;
  href: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  /** Tailwind gradient CSS string for the banner background */
  bannerGradient: string;
  /** Accent colour used for glows / highlights */
  accentColor: string;
  tags: GameTag[];
  genre: GameGenre[];
  players: string;
  minPlayers: number;
  maxPlayers: number;
  status: GameStatus;
  statusLabel?: string;
  rating: number; // 0-5
  totalRatings: number;
  playCount: number;
  estimatedTime: string;
  difficulty: "easy" | "medium" | "hard" | "variable";
  features: string[];
  isFeatured: boolean;
  isNew: boolean;
  isFree: boolean;
  /** ISO date string */
  lastUpdated: string;
  /** relative position for the emoji in the banner, e.g. Tailwind classes */
  iconSize?: string;
}

export const games: Game[] = [
  {
    id: "hunch",
    slug: "hunch",
    href: "/hunch",
    title: "Hunch",
    shortDescription: "Guess the mystery animal or country through clever hints.",
    longDescription:
      "Put your knowledge to the test in Hunch — a sleek guessing game where every round hides a mystery animal or country behind a curtain of progressive hints. The fewer hints you need, the higher your score. Challenge friends or go solo across multiple categories.",
    icon: "🧠",
    bannerGradient: "from-violet-600 via-purple-500 to-indigo-600",
    accentColor: "#7c3aed",
    tags: [
      { label: "Trivia", color: "purple" },
      { label: "Solo", color: "blue" },
      { label: "Party", color: "pink" },
      { label: "Animals", color: "green" },
      { label: "Geography", color: "teal" },
    ],
    genre: ["trivia", "puzzle"],
    players: "1–4",
    minPlayers: 1,
    maxPlayers: 4,
    status: "available",
    rating: 4.7,
    totalRatings: 312,
    playCount: 8420,
    estimatedTime: "5–15 min",
    difficulty: "variable",
    features: [
      "Progressive hint system",
      "Animals & Countries modes",
      "Score tracking",
      "1–4 local players",
      "Instant round replay",
    ],
    isFeatured: true,
    isNew: false,
    isFree: true,
    lastUpdated: "2026-02-20",
    iconSize: "text-6xl",
  },
  {
    id: "quiz",
    slug: "quiz",
    href: "/quiz",
    title: "Quiz",
    shortDescription: "Race through knowledge categories and prove you're the smartest in the room.",
    longDescription:
      "Quiz is a fast-paced knowledge battle spanning science, geography, pop culture and more. Pick a category, choose your difficulty, and climb the leaderboard. Full progress tracking and category breakdowns let you see exactly where you shine — and where to study harder.",
    icon: "📚",
    bannerGradient: "from-emerald-500 via-teal-500 to-cyan-600",
    accentColor: "#059669",
    tags: [
      { label: "Knowledge", color: "green" },
      { label: "Solo", color: "blue" },
      { label: "Timed", color: "orange" },
      { label: "Science", color: "teal" },
      { label: "History", color: "yellow" },
    ],
    genre: ["trivia"],
    players: "1",
    minPlayers: 1,
    maxPlayers: 1,
    status: "updated",
    statusLabel: "Recently Updated",
    rating: 4.5,
    totalRatings: 198,
    playCount: 12750,
    estimatedTime: "10–20 min",
    difficulty: "variable",
    features: [
      "Multiple categories",
      "Difficulty levels",
      "Progress tracking",
      "Detailed score breakdown",
      "Streak system",
    ],
    isFeatured: false,
    isNew: false,
    isFree: true,
    lastUpdated: "2026-02-24",
  },
  {
    id: "tictactoe",
    slug: "tictactoe",
    href: "/tictactoe",
    title: "Tic-Tac-Toe",
    shortDescription: "The classic 3-in-a-row battle, now online with real-time multiplayer.",
    longDescription:
      "Tic-Tac-Toe reimagined for the web. Challenge a friend in live real-time matches powered by sockets — no accounts, no waiting. Pure Xs and Os. Simple, snappy, and endlessly competitive.",
    icon: "❌",
    bannerGradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    accentColor: "#e11d48",
    tags: [
      { label: "Multiplayer", color: "red" },
      { label: "Real-time", color: "pink" },
      { label: "Classic", color: "purple" },
      { label: "2 Players", color: "orange" },
    ],
    genre: ["board", "multiplayer", "strategy"],
    players: "2",
    minPlayers: 2,
    maxPlayers: 2,
    status: "available",
    rating: 4.2,
    totalRatings: 87,
    playCount: 3200,
    estimatedTime: "2–5 min",
    difficulty: "easy",
    features: [
      "Real-time multiplayer",
      "Socket-powered",
      "No account needed",
      "Instant match start",
    ],
    isFeatured: false,
    isNew: false,
    isFree: true,
    lastUpdated: "2026-01-15",
  },
  {
    id: "wordsmith",
    slug: "wordsmith",
    href: "/wordsmith",
    title: "Wordsmith",
    shortDescription: "Unscramble letters and race the clock to form as many words as possible.",
    longDescription:
      "Given a set of scrambled letters, how many words can you build? Wordsmith rewards vocabulary, lateral thinking, and speed. Compete solo for a high score or pass the phone in party mode.",
    icon: "🔤",
    bannerGradient: "from-amber-400 via-orange-500 to-red-500",
    accentColor: "#f59e0b",
    tags: [
      { label: "Word", color: "yellow" },
      { label: "Party", color: "pink" },
      { label: "Solo", color: "blue" },
      { label: "Timed", color: "orange" },
    ],
    genre: ["word", "arcade"],
    players: "1–6",
    minPlayers: 1,
    maxPlayers: 6,
    status: "coming-soon",
    statusLabel: "Coming Soon",
    rating: 0,
    totalRatings: 0,
    playCount: 0,
    estimatedTime: "5–10 min",
    difficulty: "medium",
    features: [
      "Time-pressure rounds",
      "Solo & party modes",
      "Dynamic letter pools",
      "Global leaderboard (planned)",
    ],
    isFeatured: false,
    isNew: true,
    isFree: true,
    lastUpdated: "2026-02-26",
  },
  {
    id: "maprace",
    slug: "maprace",
    href: "/maprace",
    title: "Map Race",
    shortDescription: "Pin the country on the map before time runs out — geography at warp speed.",
    longDescription:
      "A country name flashes on screen. You have seconds to click the right spot on a blank world map. The faster and more accurate, the more points. Map Race turns geography into an adrenaline rush.",
    icon: "🗺️",
    bannerGradient: "from-sky-500 via-blue-500 to-indigo-500",
    accentColor: "#0ea5e9",
    tags: [
      { label: "Geography", color: "teal" },
      { label: "Timed", color: "orange" },
      { label: "Solo", color: "blue" },
    ],
    genre: ["trivia", "arcade"],
    players: "1",
    minPlayers: 1,
    maxPlayers: 1,
    status: "coming-soon",
    statusLabel: "Coming Soon",
    rating: 0,
    totalRatings: 0,
    playCount: 0,
    estimatedTime: "5–15 min",
    difficulty: "hard",
    features: [
      "Interactive world map",
      "Multiple difficulty tiers",
      "Country & capital modes",
      "Time-attack scoring",
    ],
    isFeatured: false,
    isNew: true,
    isFree: true,
    lastUpdated: "2026-02-26",
  },
];

/** Featured games for the hero carousel */
export const featuredGames = games.filter((g) => g.isFeatured);

/** Available (playable) games */
export const availableGames = games.filter(
  (g) => g.status === "available" || g.status === "updated" || g.status === "new"
);

/** Games coming soon */
export const comingSoonGames = games.filter((g) => g.status === "coming-soon");

/** Get a game by its slug */
export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

/** Tag colour map → Tailwind classes */
export const tagColorMap: Record<string, { bg: string; text: string }> = {
  blue:   { bg: "bg-blue-500/15",   text: "text-blue-400" },
  green:  { bg: "bg-emerald-500/15",text: "text-emerald-400" },
  orange: { bg: "bg-orange-500/15", text: "text-orange-400" },
  purple: { bg: "bg-violet-500/15", text: "text-violet-400" },
  pink:   { bg: "bg-pink-500/15",   text: "text-pink-400" },
  yellow: { bg: "bg-amber-500/15",  text: "text-amber-400" },
  red:    { bg: "bg-rose-500/15",   text: "text-rose-400" },
  teal:   { bg: "bg-teal-500/15",   text: "text-teal-400" },
};
