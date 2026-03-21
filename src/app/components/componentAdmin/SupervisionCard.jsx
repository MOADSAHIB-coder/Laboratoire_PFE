import React from "react";

const toneClasses = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  slate: "bg-slate-50 text-slate-700 border-slate-200",
};

export default function SupervisionCard({ label, value, tone = "slate" }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${toneClasses[tone] || toneClasses.slate}`}
    >
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-2 text-2xl font-extrabold tracking-tight">{value}</p>
    </div>
  );
}
