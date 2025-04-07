"use client"

import { useEffect, useRef } from "react"

interface SurveyCompletionChartProps {
  surveyId: string;
}

export function SurveyCompletionChart({ surveyId }: SurveyCompletionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Sample data - completion rate over time
    const data = Array.from({ length: 30 }, () => Math.random() * 100)

    // Chart dimensions
    const chartWidth = canvas.width - 60
    const chartHeight = canvas.height - 60
    const pointSpacing = chartWidth / (data.length - 1)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, chartHeight + 30)
    ctx.lineTo(chartWidth + 50, chartHeight + 30)
    ctx.strokeStyle = "#e2e8f0"
    ctx.stroke()

    // Draw line
    ctx.beginPath()
    ctx.moveTo(50, chartHeight + 30 - (data[0] / 100) * chartHeight)

    for (let i = 1; i < data.length; i++) {
      const x = 50 + i * pointSpacing
      const y = chartHeight + 30 - (data[i] / 100) * chartHeight
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = "#6366f1"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw points
    data.forEach((value, index) => {
      const x = 50 + index * pointSpacing
      const y = chartHeight + 30 - (value / 100) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#6366f1"
      ctx.fill()

      // Draw date label for every 5th point
      if (index % 5 === 0) {
        ctx.fillStyle = "#94a3b8"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(`${30 - index}d`, x, chartHeight + 45)
      }
    })

    // Draw y-axis labels
    ctx.fillStyle = "#94a3b8"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "right"

    for (let i = 0; i <= 5; i++) {
      const value = i * 20
      const y = chartHeight + 30 - (i / 5) * chartHeight
      ctx.fillText(`${value}%`, 35, y + 3)

      // Draw horizontal grid line
      ctx.beginPath()
      ctx.moveTo(40, y)
      ctx.lineTo(chartWidth + 50, y)
      ctx.strokeStyle = "#e2e8f0"
      ctx.stroke()
    }
  }, [surveyId])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

