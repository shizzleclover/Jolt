'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';

const chartData = [
  { day: 'Mon', score: 75 },
  { day: 'Tue', score: 82 },
  { day: 'Wed', score: 68 },
  { day: 'Thu', score: 90 },
  { day: 'Fri', score: 85 },
  { day: 'Sat', score: 78 },
  { day: 'Sun', score: 92 },
];

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--primary))",
  },
};

export default function PerformanceChart() {
  return (
    <div className="h-64 w-full">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 5 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="day" 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={10} 
                        fontSize={12}
                    />
                    <YAxis 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={10}
                        fontSize={12}
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                        cursor={false}
                        content={<ChartTooltipContent 
                            formatter={(value) => `${value}%`}
                            indicator="dot"
                        />}
                    />
                    <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    </div>
  );
}
