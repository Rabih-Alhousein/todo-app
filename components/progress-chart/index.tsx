"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function ProgressChart({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const data = useMemo(() => {
    const safeTotal = Math.max(total, 0);
    const done = Math.min(Math.max(completed, 0), safeTotal);
    const remaining = Math.max(safeTotal - done, 0);
    return [
      { name: "Completed", value: done },
      { name: "Remaining", value: remaining },
    ];
  }, [completed, total]);

  const COLORS = ["var(--primary)", "var(--muted)"];

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full max-w-xs">
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--background)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                borderRadius: 8,
              }}
              labelStyle={{ color: "var(--foreground)" }}
              itemStyle={{ color: "var(--foreground)" }}
              formatter={(value: number, name: string) => [value, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-center text-sm text-foreground">
        <span className="font-semibold">{percent}%</span> done
      </div>
    </div>
  );
}
