import Link from "next/link";
import {
  games,
  featuredGames,
  availableGames,
  comingSoonGames,
  tagColorMap,
  type Game,
} from "@/data/games";

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function StarRating({ rating, total }: { rating: number; total: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center gap-1">
      <span className="flex">
        {Array.from({ length: full }).map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {half && (
          <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5  fill-white/20" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </span>
      <span className="text-[11px] ">{total > 0 ? total.toLocaleString() : "No ratings yet"}</span>
    </span>
  );
}

function StatusBadge({ game }: { game: Game }) {
  if (game.status === "coming-soon")
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-zinc-700 text-zinc-300 uppercase">
        Coming Soon
      </span>
    );
  if (game.status === "new" || game.isNew)
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-emerald-500/20 text-emerald-400 uppercase">
        New
      </span>
    );
  if (game.status === "updated")
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-blue-500/20 text-blue-400 uppercase">
        Updated
      </span>
    );
  if (game.status === "beta")
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-amber-500/20 text-amber-400 uppercase">
        Beta
      </span>
    );
  return null;
}

function DifficultyDot({ difficulty }: { difficulty: Game["difficulty"] }) {
  const colors: Record<string, string> = {
    easy: "bg-emerald-400",
    medium: "bg-amber-400",
    hard: "bg-rose-400",
    variable: "bg-violet-400",
  };
  const labels: Record<string, string> = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    variable: "Variable",
  };
  return (
    <span className="flex items-center gap-1.5 text-[11px] ">
      <span className={`w-1.5 h-1.5 rounded-full ${colors[difficulty]}`} />
      {labels[difficulty]}
    </span>
  );
}

/* ─── Featured Hero Card ────────────────────────────────────────────────────── */

function FeaturedCard({ game }: { game: Game }) {
  const isPlayable = game.status !== "coming-soon";
  return (
    <div className="relative rounded-2xl overflow-hidden border shadow-2xl group">
      <div className={`absolute inset-0 bg-linear-to-br ${game.bannerGradient} opacity-90`} />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: game.accentColor }}
      />

      <div className="relative z-10 p-8 md:p-12 min-h-80 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-white/15 uppercase backdrop-blur-sm border">
              ★ Featured
            </span>
            <StatusBadge game={game} />
          </div>
          <div className="text-5xl drop-shadow-xl select-none">{game.icon}</div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight drop-shadow-lg">
            {game.title}
          </h2>
          <p className="text-white/75 text-base md:text-lg mb-5 max-w-xl leading-relaxed">
            {game.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm ">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {game.players} players
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {game.estimatedTime}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {game.playCount.toLocaleString()} plays
            </span>
            {game.rating > 0 && <StarRating rating={game.rating} total={game.totalRatings} />}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {game.tags.slice(0, 5).map((tag) => (
              <span
                key={tag.label}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm border"
              >
                {tag.label}
              </span>
            ))}
          </div>

          {isPlayable ? (
            <Link
              href={game.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-bold text-sm shadow-lg hover:bg-white/90 active:scale-95 transition-all duration-150"
            >
              Play Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10  font-bold text-sm border cursor-not-allowed">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Game Card ─────────────────────────────────────────────────────────────── */

function GameCard({ game }: { game: Game }) {
  const isPlayable = game.status !== "coming-soon";

  const inner = (
    <div
      className={`group flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-white/3 backdrop-blur-sm shadow-xl transition-all duration-300 h-full ${
        isPlayable
          ? "hover hover:shadow-2xl hover:-translate-y-1 hover:bg-white/6 cursor-pointer"
          : "opacity-70 cursor-default"
      }`}
    >
      {/* Banner */}
      <div className="relative h-36 overflow-hidden shrink-0">
        <div className={`absolute inset-0 bg-linear-to-br ${game.bannerGradient}`} />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        {isPlayable && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
            style={{ backgroundColor: game.accentColor }}
          />
        )}
        <div className="absolute bottom-3 left-4 text-4xl drop-shadow-xl select-none">{game.icon}</div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          {game.isFree && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/40  backdrop-blur-sm border">
              Free
            </span>
          )}
          <StatusBadge game={game} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-bold text-lg leading-tight mb-1">{game.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{game.shortDescription}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {game.tags.slice(0, 3).map((tag) => {
            const colors = tagColorMap[tag.color] ?? tagColorMap["blue"];
            return (
              <span key={tag.label} className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${colors.bg} ${colors.text}`}>
                {tag.label}
              </span>
            );
          })}
        </div>

        <div className="border-t border-white/[0.07]" />

        <div className="flex items-center justify-between text-[11px] ">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {game.players} players
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {game.estimatedTime}
          </span>
          <DifficultyDot difficulty={game.difficulty} />
        </div>

        <div className="flex items-center justify-between">
          {game.rating > 0 ? (
            <StarRating rating={game.rating} total={game.totalRatings} />
          ) : (
            <span className="text-[11px]  italic">No ratings yet</span>
          )}
          {game.playCount > 0 && (
            <span className="text-[11px] ">{game.playCount.toLocaleString()} plays</span>
          )}
        </div>

        <div className="mt-auto pt-1">
          {isPlayable ? (
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {game.genre.slice(0, 2).map((g) => (
                  <span key={g} className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5  capitalize">
                    {g}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold  group-hover:transition-colors duration-200">
                Play
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          ) : (
            <span className="text-xs  italic">Available soon</span>
          )}
        </div>
      </div>
    </div>
  );

  return isPlayable ? (
    <Link href={game.href} className="block h-full">
      {inner}
    </Link>
  ) : (
    <div className="block h-full">{inner}</div>
  );
}

/* ─── Section Heading ───────────────────────────────────────────────────────── */

function SectionHeading({ title, subtitle, count }: { title: string; subtitle?: string; count?: number }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h2 className="text-xl font-bold tracking-tight">
          {title}
          {count !== undefined && (
            <span className="ml-2 text-sm font-medium ">({count})</span>
          )}
        </h2>
        {subtitle && <p className="text-sm  mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ─── Stat Pill ─────────────────────────────────────────────────────────────── */

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-5 py-3 rounded-xl bg-white/4 border border-white/7 shrink-0">
      <span className="text-lg font-extrabold text-white">{value}</span>
      <span className="text-[11px]  uppercase tracking-wider whitespace-nowrap">{label}</span>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const featured = featuredGames[0] ?? games[0];
  const totalPlays = games.reduce((s, g) => s + g.playCount, 0);
  const totalRatings = games.reduce((s, g) => s + g.totalRatings, 0);

  return (
    <div className="min-h-screen relative border-foreground/10">
      {/* Ambient background blobs — fixed so they cover the whole viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-600/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-rose-600/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">

        {/* Toolbar: search + count */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8  text-sm flex-1 max-w-xs">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search games…
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/8  text-xs font-medium whitespace-nowrap">
            {games.length} games
          </span>
        </div>

        {/* Stats strip */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          <StatPill label="Total Games" value={String(games.length)} />
          <StatPill label="Available" value={String(availableGames.length)} />
          <StatPill label="Coming Soon" value={String(comingSoonGames.length)} />
          <StatPill label="Total Plays" value={totalPlays.toLocaleString()} />
          <StatPill label="Ratings" value={totalRatings.toLocaleString()} />
        </div>

        {/* Featured */}
        <section>
          <SectionHeading title="Featured" subtitle="Editor's pick" />
          <FeaturedCard game={featured} />
        </section>

        {/* Available Now */}
        <section>
          <SectionHeading title="Available Now" subtitle="Jump in and play" count={availableGames.length} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        {comingSoonGames.length > 0 && (
          <section>
            <SectionHeading title="Coming Soon" subtitle="On the horizon" count={comingSoonGames.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {comingSoonGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-white/[0.07] pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ">
          <span>© {new Date().getFullYear()} Games by Han. All games are free to play.</span>
          <span>Made with ❤️ and Next.js</span>
        </footer>
      </div>
    </div>
  );
}