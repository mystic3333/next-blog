import type { Metadata } from "next"
import SCL90Test from "@/components/SCL90Test"

export const metadata: Metadata = {
  title: "SCL-90 症状自评量表",
  description: "症状自评量表（SCL-90），包含90个项目，从感觉、情感、思维、意识、行为至生活习惯、人际关系、饮食睡眠等，用于评定心理健康状况",
}

export default function SCL90Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">
        SCL-90 症状自评量表
      </h1>
      <p className="mt-2" style={{ color: "var(--muted)" }}>
        症状自评量表（Symptom Checklist 90）
      </p>

      <div
        className="mt-6 rounded-xl border p-4 text-sm leading-relaxed"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <p>
          <strong>指导语：</strong>以下列出了 90 个问题，请仔细阅读每一条，然后根据最近
          <strong>一星期以内</strong>下述情况影响您的实际感觉，选择最合适的等级。
        </p>
        <p className="mt-2">
          等级说明：<strong>1</strong>=没有、<strong>2</strong>=很轻、<strong>3</strong>=中等、
          <strong>4</strong>=偏重、<strong>5</strong>=严重
        </p>
        <p className="mt-2" style={{ color: "var(--muted)" }}>
          请逐条填写，不要遗漏。完成后提交即可查看各因子得分和结果分析。
        </p>
      </div>

      <div className="mt-8">
        <SCL90Test />
      </div>
    </div>
  )
}
