"use client"

import React, { useEffect, useRef, useState } from "react"

type Point = { x: number; y: number }

function fitCircle(points: Point[]) {
  if (points.length < 3) return null
  let sumX = 0,
    sumY = 0,
    sumX2 = 0,
    sumY2 = 0,
    sumXY = 0,
    sumX3 = 0,
    sumY3 = 0,
    sumX2Y = 0,
    sumXY2 = 0

  const n = points.length
  for (const p of points) {
    const x = p.x
    const y = p.y
    const x2 = x * x
    const y2 = y * y
    sumX += x
    sumY += y
    sumX2 += x2
    sumY2 += y2
    sumXY += x * y
    sumX3 += x2 * x
    sumY3 += y2 * y
    sumX2Y += x2 * y
    sumXY2 += x * y2
  }

  const C = n * sumX2 - sumX * sumX
  const D = n * sumXY - sumX * sumY
  const E = n * sumX3 + n * sumXY2 - (sumX2 + sumY2) * sumX
  const G = n * sumY2 - sumY * sumY
  const H = n * sumX2Y + n * sumY3 - (sumX2 + sumY2) * sumY

  const denom = 2 * (C * G - D * D)
  if (Math.abs(denom) < 1e-6) return null

  const a = (G * E - D * H) / denom
  const b = (C * H - D * E) / denom

  const centerX = a
  const centerY = b

  // radius: mean distance to center
  const dists = points.map((p) => Math.hypot(p.x - centerX, p.y - centerY))
  const radius = dists.reduce((s, v) => s + v, 0) / dists.length

  return { centerX, centerY, radius, dists }
}

export default function CirclePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [running, setRunning] = useState(false)
  const [drawing, setDrawing] = useState(false)
  const [points, setPoints] = useState<Point[]>([])
  const [result, setResult] = useState<null | { accuracy: number; details: any }>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // if user has drawn points, redraw stroke
    if (points.length > 0) {
      ctx.lineWidth = 4
      ctx.strokeStyle = "#0b84ff"
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
      ctx.stroke()
    }
  }, [points])

  function resizeCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.round(rect.width)
    canvas.height = Math.round(rect.height)
    // redraw points scaled to new resolution
    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (points.length) {
      ctx.lineWidth = 4
      ctx.strokeStyle = "#0b84ff"
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
      ctx.stroke()
    }
  }

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [points])

  function toCanvasPos(evt: PointerEvent | React.PointerEvent) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const x = (evt as PointerEvent).clientX - rect.left
    const y = (evt as PointerEvent).clientY - rect.top
    return { x, y }
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (!running) return
    const p = toCanvasPos(e)
    setPoints([p])
    setDrawing(true)
    const canvas = canvasRef.current!
    canvas.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!drawing) return
    const p = toCanvasPos(e)
    setPoints((prev) => [...prev, p])
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!running) return
    setDrawing(false)
    const canvas = canvasRef.current!
    try { canvas.releasePointerCapture(e.pointerId) } catch {}
  }

  function finish() {
    if (points.length < 10) {
      setResult({ accuracy: 0, details: { message: "Draw a larger circle (at least 10 points)." } })
      return
    }

    const fit = fitCircle(points)
    if (!fit) {
      setResult({ accuracy: 0, details: { message: "Could not fit a circle." } })
      return
    }

    const { centerX, centerY, radius, dists } = fit
    const meanAbsDev = dists.reduce((s, v) => s + Math.abs(v - radius), 0) / dists.length
    const relError = meanAbsDev / radius
    let accuracy = Math.max(0, Math.round((1 - relError) * 100))
    if (accuracy > 100) accuracy = 100

    setResult({ accuracy, details: { centerX, centerY, radius, meanAbsDev } })

    // draw overlay: fitted circle + ideal stroke
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // draw user stroke
    ctx.lineWidth = 4
    ctx.strokeStyle = "#0b84ff"
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
    ctx.stroke()

    // draw fitted circle
    ctx.lineWidth = 3
    ctx.strokeStyle = "#22c55e"
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.stroke()
  }

  function restart() {
    setRunning(false)
    setPoints([])
    setResult(null)
  }

  return (
    <div style={{ padding: 20 }}>
      {!running && (
        <div style={{ width: 420, height: 420, margin: "40px auto", position: "relative" }}>
          <div style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "#0b84ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 18px rgba(2,6,23,0.2)"
          }}>
            <button
              onClick={() => setRunning(true)}
              style={{
                padding: "14px 22px",
                borderRadius: 999,
                border: "none",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Start
            </button>
          </div>
        </div>
      )}

      {running && (
        <div style={{ width: "100%", maxWidth: 720, margin: "12px auto", textAlign: "center" }}>
          <div style={{ position: "relative"}}>
            <canvas
              ref={canvasRef}
              style={{ width: "100%", height: 600, display: "block", touchAction: "none" }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            />
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}>
            <button onClick={restart} style={{ padding: "8px 12px", cursor: "pointer" }}>Retry</button>
            <button onClick={finish} style={{ padding: "8px 12px", cursor: "pointer" }}>Confirm</button>
          </div>

          {result && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Accuracy: {result.accuracy}%</div>
              <div style={{ color: "#475569", marginTop: 6 }}>
                {result.details?.message ?? `Mean deviation: ${result.details.meanAbsDev.toFixed(2)}px`}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
