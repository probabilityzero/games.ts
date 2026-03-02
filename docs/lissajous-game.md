# Lissajous (Oscilloscope Match) — Concept & Math

Overview
- The game shows an oscilloscope-like Lissajous pattern (target) faintly and asks the player to tune sine-wave parameters to reproduce it.
- This evokes classic analog oscilloscope and synth visuals — a nostalgic mechanic many players find compelling.

Math / Physics Concepts
- Lissajous curves are parametric plots: x = A_x sin(f_x t + φ), y = A_y sin(f_y t).
- The visual depends on the frequency ratio f_x:f_y and the phase φ — small integer ratios create closed, symmetric patterns.

Why this works as a game
- It's tactile and exploratory — players tinker with knobs (frequency, phase, amplitude) and immediately see results.
- The target patterns naturally encourage replay: different integer ratios produce strikingly different, often nostalgic shapes.
- There's depth: matching exact phase & amplitude yields a precise scoring problem beyond simple recognition.

Scoring approach (implemented)
- Sample both target and user curves densely over t in [0, 2π].
- Compute average pointwise distance between sampled curves (mean distance).
- Convert distance into an accuracy percentage (smaller distance → higher score).

Design notes
- Use integer frequency targets (1–8) to get classic closed figures.
- Allow amplitude and phase tweaking to give players control beyond simple frequency guessing.
- Add time-limited or progressive rounds (harder targets) to increase engagement.

File
- Implementation: `app/lissajous/page.tsx`
