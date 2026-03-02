# Circle Game — Algorithm & Scoring

## Overview

This document explains how the Circle game measures how "perfect" a user-drawn circle is.

User flow:
- The player clicks **Start** on a filled circle.
- A blank canvas opens and the player draws a circular stroke.
- When finished, the app fits a mathematical circle to the stroke, measures deviations, and reports an accuracy percentage.

## Circle fitting

We use an algebraic least-squares circle fit on the collected pointer samples. The routine computes the circle center (x, y) and an average radius by minimizing algebraic error terms (closed-form via sums of powers of coordinates).

From the fitted center we compute per-sample radial distances and derive the mean absolute radial deviation:

- meanAbsDev = mean(|dist(point, center) - radius|)

Radial relative error = meanAbsDev / radius.

## Circumference comparison

A second signal comes from comparing the user's drawn path length to the circumference of the fitted circle:

- userPath = sum of distances between consecutive pointer samples
- circumference = 2π * radius
- circRelError = |userPath - circumference| / circumference

This helps catch strokes that have the right shape but wrong scale (too small/large) or strokes that are irregular in length.

## Combined scoring

We combine the two errors into a single accuracy score to be stricter and more robust:

- radial weight: 0.6
- circumference weight: 0.4

combinedError = clamp(0, 1, 0.6 * radialRelError + 0.4 * circRelError)

accuracy% = round((1 - combinedError) * 100)

The weights were chosen to emphasize radial conformity (shape) while still considering perimeter agreement. Adjust `wRad` and `wCirc` in the source to tune behavior.

## Result details

When the game reports results it includes:

- `accuracy` — final percentage shown to the player
- `meanAbsDev` — mean radial deviation in pixels
- `radRelError` — radial relative error (dimensionless)
- `userPath` — measured path length in pixels
- `circumference` — fitted circle circumference in pixels
- `circRelError` — circumference relative error (dimensionless)

## Tuning notes

- Increase `wCirc` to penalize size/length mismatch more.
- Increase required minimum points (currently 10) for more stable fits on touch devices.
- Consider smoothing or resampling the stroke before fitting to reduce jitter impact.

## File

Implementation: `app/circle/page.tsx`
