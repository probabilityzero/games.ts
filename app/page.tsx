import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Games</h1>
          <div className="rounded-full bg-muted px-3 py-1 text-sm">Collections</div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/hunch" className="group block bg-card rounded-2xl p-6 shadow-md transform transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-2xl">🧠</div>
              <div>
                <h2 className="text-xl font-semibold">Hunch</h2>
                <p className="text-sm text-muted-foreground">Guess the animal or country</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">Free</span>
              <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">1-4 players</span>
            </div>
          </Link>

          <Link href="/tictactoe" className="group block bg-card rounded-2xl p-6 shadow-md transform transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center text-2xl">❌</div>
              <div>
                <h2 className="text-xl font-semibold">Quiz</h2>
                <p className="text-sm text-muted-foreground">Multiplayer classic</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">Free</span>
              <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">2 players</span>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
