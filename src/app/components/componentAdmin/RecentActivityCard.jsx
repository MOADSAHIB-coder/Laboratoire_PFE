import React from "react";

export default function RecentActivityCard({ message, time }) {
  return (
    <div className="flex items-start justify-between rounded-2xl border border-slate-200 px-4 py-3">
      <div>
        <p className="text-sm text-slate-700">{message}</p>
        <p className="mt-1 text-xs text-slate-500">{time}</p>
      </div>
    </div>
  );
}
