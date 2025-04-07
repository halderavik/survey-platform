"use client"

import { useEffect, useRef } from "react"

interface SurveyResponseChartProps {
  surveyId: string;
}

export function SurveyResponseChart({ surveyId }: SurveyResponseChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Sample data - responses per day for the last 30 days
    const data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 1)

    // Chart dimensions
    const chartWidth = canvas.width - 60
    const chartHeight = canvas.height - 60
    const barWidth = chartWidth / data.length - 2

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, chartHeight + 30)
    ctx.lineTo(chartWidth + 50, chartHeight + 30)
    ctx.strokeStyle = "#e2e8f0"
    ctx.stroke()

    // Draw bars
    const maxValue = Math.max(...data)

    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight
      const x = 50 + index * (barWidth + 2)
      const y = chartHeight + 30 - barHeight

      // Create gradient
      const gradient = ctx.createLinearGradient(0, y, 0, chartHeight + 30)
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.8)")
      gradient.addColorStop(1, "rgba(99, 102, 241, 0.2)")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw date label for every 5th bar
      if (index % 5 === 0) {
        ctx.fillStyle = "#94a3b8"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(`${30 - index}d`, x + barWidth / 2, chartHeight + 45)
      }
    })

    // Draw y-axis labels
    ctx.fillStyle = "#94a3b8"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "right"

    for (let i = 0; i <= 5; i++) {
      const value = Math.round((i / 5) * maxValue)
      const y = chartHeight + 30 - (i / 5) * chartHeight
      ctx.fillText(value.toString(), 35, y + 3)

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

