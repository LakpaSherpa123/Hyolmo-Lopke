"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Progress } from "@/components/ui/progress";

const chartData = [
  { day: "Mon", lessons: 20 },
  { day: "Tue", lessons: 45 },
  { day: "Wed", lessons: 30 },
  { day: "Thu", lessons: 60 },
  { day: "Fri", lessons: 25 },
  { day: "Sat", lessons: 75 },
  { day: "Sun", lessons: 50 },
];

const chartConfig = {
  lessons: {
    label: "XP Earned",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function ProgressTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Weekly XP earned from lessons and practice.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-muted-foreground">Overall Progress</span>
            <span className="font-semibold">Level 3</span>
          </div>
          <Progress value={45} aria-label="Overall progress 45%" />
           <p className="text-xs text-muted-foreground mt-1">450/1000 XP to Level 4</p>
        </div>
        <div>
            <ChartContainer config={chartConfig} className="h-[150px] w-full">
              <BarChart accessibilityLayer data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: -10 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                 <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis tickLine={false} axisLine={false} tickMargin={10} width={20} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="lessons" fill="var(--color-lessons)" radius={4} />
              </BarChart>
            </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
