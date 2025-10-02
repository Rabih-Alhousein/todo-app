import { Card } from "@/components/ui/card";
import { ProgressChart } from "@/components/progress-chart";

export function ProgressCard({ completed, total }: { completed: number; total: number }) {
  return (
    <Card className="p-4">
      <div className="mb-3 text-sm text-muted-foreground">Progress</div>
      <div className="flex items-center justify-center">
        <ProgressChart completed={completed} total={total} />
      </div>
      <div className="text-muted-foreground text-center border-t border-border pt-2">
        <span className="font-medium text-foreground">{completed}</span> of {" "}
        <span className="font-medium text-foreground">{total}</span> tasks completed
      </div>
    </Card>
  );
}
