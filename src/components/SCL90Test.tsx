"use client"

import { useState, useMemo, useCallback } from "react"
import { questions, dimensions, ratingLabels, ratings } from "@/data/scl-90"

interface Result {
  dimension: (typeof dimensions)[number]
  total: number
  average: number
  positive: boolean
}

type Phase = "question" | "flip-out" | "flip-in"

export default function SCL90Test() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [phase, setPhase] = useState<Phase>("question")

  const progress = Object.keys(answers).length
  const allAnswered = progress === questions.length
  const current = questions[currentIndex]

  const results: Result[] = useMemo(() => {
    if (!submitted) return []
    return dimensions.map((d) => {
      const total = d.items.reduce((sum, id) => sum + (answers[id] ?? 0), 0)
      const average = Math.round((total / d.items.length) * 100) / 100
      return { dimension: d, total, average, positive: average > 2 }
    })
  }, [submitted, answers])

  const totalScore = useMemo(() => {
    if (!submitted) return 0
    return Object.values(answers).reduce((a, b) => a + b, 0)
  }, [submitted, answers])

  const handleAnswer = useCallback(
    (value: number) => {
      if (phase !== "question") return
      setAnswers((prev) => ({ ...prev, [current.id]: value }))
      setPhase("flip-out")
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((i) => i + 1)
        }
        setPhase("flip-in")
        setTimeout(() => setPhase("question"), 50)
      }, 300)
    },
    [current?.id, currentIndex, phase]
  )

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold">测试结果</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div
            className="rounded-xl border p-4 text-center"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <div className="text-3xl font-bold">{totalScore}</div>
            <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              总分
            </div>
          </div>
          <div
            className="rounded-xl border p-4 text-center"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <div className="text-3xl font-bold">
              {allAnswered ? "是" : "否"}
            </div>
            <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              全部作答
            </div>
          </div>
          <div
            className="rounded-xl border p-4 text-center"
            style={{
              borderColor: totalScore > 160 ? "#ef4444" : "var(--border)",
              background: "var(--card)",
            }}
          >
            <div className="text-3xl font-bold">
              {totalScore > 160 ? "⚠️" : "✅"}
            </div>
            <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              {totalScore > 160 ? "建议进一步检查" : "总分正常"}
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {results.map((r) => (
            <div
              key={r.dimension.key}
              className="rounded-xl border p-4"
              style={{
                borderColor: r.positive ? "#f59e0b" : "var(--border)",
                background: "var(--card)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{r.dimension.name}</h3>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--muted)" }}>
                    {r.dimension.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{r.average}</div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>
                    均分 {r.positive ? "⚠️ > 2" : "✓ ≤ 2"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-8 rounded-xl border p-4 text-sm leading-relaxed"
          style={{ borderColor: "var(--border)", background: "var(--card)" }}
        >
          <h3 className="font-semibold">说明</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>全国常模：总分超过 160 分可考虑筛选阳性，建议进一步检查</li>
            <li>任一因子均分超过 2 分，提示在该方面可能存在需要关注的心理症状</li>
            <li>本测试仅供自我参考，不构成医学诊断</li>
            <li>如有需要，请咨询专业心理医生或心理咨询师</li>
          </ul>
        </div>
        <button
          onClick={() => {
            setAnswers({})
            setCurrentIndex(0)
            setSubmitted(false)
            setPhase("question")
          }}
          className="mt-6 rounded-lg border px-6 py-3 text-sm transition-all hover:opacity-70"
          style={{ borderColor: "var(--border)" }}
        >
          重新测试
        </button>
      </div>
    )
  }

  if (!current) return null

  const innerStyle: React.CSSProperties = {
    transition: "transform 0.35s ease, opacity 0.3s ease",
    transform:
      phase === "flip-out"
        ? "translateX(-40px)"
        : phase === "flip-in"
          ? "translateX(40px)"
          : "translateX(0px)",
    opacity: phase === "question" ? 1 : 0,
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm" style={{ color: "var(--muted)" }}>
          <span>
            第 {currentIndex + 1} / {questions.length} 题
          </span>
          <span>{Math.round((progress / questions.length) * 100)}%</span>
        </div>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full"
          style={{ background: "var(--border)" }}
        >
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${(progress / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="h-64 overflow-hidden">
        <div
          className="flex h-full flex-col items-center justify-center rounded-2xl border p-8 text-center"
          style={{
            ...innerStyle,
            borderColor: "var(--border)",
            background: "var(--card)",
          }}
        >
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            {current.id}
          </span>
          <p className="mt-4 text-xl leading-relaxed">{current.text}</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        {ratings.map((r) => (
          <button
            key={r}
            onClick={() => handleAnswer(r)}
            disabled={phase !== "question"}
            className="flex h-16 w-16 flex-col items-center justify-center rounded-xl border text-center transition-all hover:-translate-y-1 hover:shadow-lg disabled:pointer-events-none disabled:opacity-30"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
              color: "var(--foreground)",
            }}
          >
            <span className="text-lg font-bold">{r}</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>
              {ratingLabels[r - 1]}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {currentIndex > 0 && (
          <button
            onClick={() => {
              setPhase("flip-out")
              setTimeout(() => {
                setCurrentIndex((i) => i - 1)
                setPhase("flip-in")
                setTimeout(() => setPhase("question"), 50)
              }, 300)
            }}
            className="rounded-lg border px-4 py-2 text-sm transition-all hover:opacity-70"
            style={{ borderColor: "var(--border)" }}
          >
            上一题
          </button>
        )}
        {allAnswered && (
          <button
            onClick={() => setSubmitted(true)}
            className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600"
          >
            查看结果
          </button>
        )}
      </div>
    </div>
  )
}
