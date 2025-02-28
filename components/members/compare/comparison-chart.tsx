"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface ComparisonChartProps {
    title: string
    labels: string[]
    user1Data: number[]
    user2Data: number[]
    user1Name: string
    user2Name: string
    isRadar?: boolean
}

export default function ComparisonChart({
    title,
    labels,
    user1Data,
    user2Data,
    user1Name,
    user2Name,
    isRadar = false,
}: ComparisonChartProps) {
    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)

    useEffect(() => {
        if (!chartRef.current) return

        // Destroy existing chart if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        const ctx = chartRef.current.getContext("2d")
        if (!ctx) return

        // Create chart based on type
        chartInstance.current = new Chart(ctx, {
            type: isRadar ? "radar" : "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: user1Name,
                        data: user1Data,
                        backgroundColor: "rgba(59, 130, 246, 0.7)",
                        borderColor: "rgba(59, 130, 246, 1)",
                        borderWidth: 2,
                        ...(isRadar && { pointBackgroundColor: "rgba(59, 130, 246, 1)" }),
                    },
                    {
                        label: user2Name,
                        data: user2Data,
                        backgroundColor: "rgba(239, 68, 68, 0.7)",
                        borderColor: "rgba(239, 68, 68, 1)",
                        borderWidth: 2,
                        ...(isRadar && { pointBackgroundColor: "rgba(239, 68, 68, 1)" }),
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            color: "white",
                        },
                    },
                },
                scales: isRadar
                    ? undefined
                    : {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: "rgba(255, 255, 255, 0.1)",
                            },
                            ticks: {
                                color: "rgba(255, 255, 255, 0.7)",
                            },
                        },
                        x: {
                            grid: {
                                color: "rgba(255, 255, 255, 0.1)",
                            },
                            ticks: {
                                color: "rgba(255, 255, 255, 0.7)",
                            },
                        },
                    },
                ...(isRadar && {
                    elements: {
                        line: {
                            tension: 0.2,
                        },
                    },
                    scales: {
                        r: {
                            angleLines: {
                                color: "rgba(255, 255, 255, 0.1)",
                            },
                            grid: {
                                color: "rgba(255, 255, 255, 0.1)",
                            },
                            pointLabels: {
                                color: "white",
                            },
                            ticks: {
                                color: "rgba(255, 255, 255, 0.7)",
                                backdropColor: "transparent",
                            },
                        },
                    },
                }),
            },
        })

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
        }
    }, [labels, user1Data, user2Data, user1Name, user2Name, isRadar])

    return (
        <Card className="p-6 bg-black/30 border-none text-white">
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <motion.div
                className="w-full h-[300px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <canvas ref={chartRef}></canvas>
            </motion.div>
        </Card>
    )
}

