'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { endOfWeek, startOfWeek, eachDayOfInterval, format, startOfYear, getDay } from 'date-fns';

const generateDummyData = () => {
  const data = [];
  const today = new Date();
  const startDate = startOfYear(today);
  const days = eachDayOfInterval({ start: startDate, end: today });
  
  for (const day of days) {
    const activityLevel = Math.floor(Math.random() * 5); // 0 to 4
    if (activityLevel > 0) {
        data.push({ date: format(day, 'yyyy-MM-dd'), count: activityLevel });
    }
  }
  return data;
};

const data = generateDummyData();
const activityByDate = new Map(data.map(item => [item.date, item.count]));

const today = new Date();
const weekStartsOn = 1; // Monday
const start = startOfWeek(startOfYear(today), { weekStartsOn });
const end = endOfWeek(today, { weekStartsOn });

const days = eachDayOfInterval({ start, end });

const weeks: Date[][] = [];
let currentWeek: Date[] = [];

days.forEach((day, i) => {
    if (i > 0 && getDay(day) === weekStartsOn) {
        weeks.push(currentWeek);
        currentWeek = [];
    }
    currentWeek.push(day);
});
if (currentWeek.length > 0) {
    weeks.push(currentWeek);
}

const weekDays = ['Mon', 'Wed', 'Fri'];
const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const getColorClass = (count: number | undefined) => {
  if (count === undefined) return 'bg-muted/50';
  if (count >= 4) return 'bg-primary/90';
  if (count >= 3) return 'bg-primary/70';
  if (count >= 2) return 'bg-primary/50';
  if (count >= 1) return 'bg-primary/30';
  return 'bg-muted/50';
};

export default function ActivityHeatmap() {
    return (
        <TooltipProvider>
            <div className="flex flex-col gap-2 overflow-x-auto p-1">
                <div className="grid grid-flow-col gap-x-3 self-start pl-8">
                    {monthLabels.map((label, i) => (
                        <div key={label} className="text-sm text-muted-foreground" style={{gridColumnStart: (i * 4) + 2}}>
                            {label}
                        </div>
                    ))}
                </div>
                <div className="flex gap-3">
                    <div className="grid grid-flow-row text-xs text-muted-foreground">
                        {weekDays.map(day => (
                            <div key={day} className="h-4 leading-4 mt-px">{day}</div>
                        ))}
                    </div>
                    <div className="grid grid-flow-col gap-1">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="grid grid-flow-row gap-1">
                                {Array.from({ length: 7 }).map((_, dayIndex) => {
                                    const dateInWeek = week.find(d => getDay(d) === (dayIndex + weekStartsOn) % 7);
                                    if (!dateInWeek) return <div key={dayIndex} className="size-3.5 rounded-sm" />;
                                    
                                    const dateStr = format(dateInWeek, 'yyyy-MM-dd');
                                    const activityCount = activityByDate.get(dateStr);

                                    return (
                                        <Tooltip key={dateStr}>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className={cn(
                                                        "size-3.5 rounded-sm",
                                                        getColorClass(activityCount)
                                                    )}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-sm">
                                                    {activityCount || 'No'} activity on {format(dateInWeek, 'MMM d, yyyy')}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}
