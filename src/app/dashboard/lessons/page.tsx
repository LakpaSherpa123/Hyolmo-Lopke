"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, PlayCircle, Star, Trophy, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const units = [
  {
    title: "Unit 1: Foundations",
    description: "Start your journey with the basics of Hyolmo.",
    lessons: [
      { id: "1", title: "Greetings", description: "Hello, Goodbye, and Thank you.", status: "Completed", xp: 50, color: "bg-blue-500" },
      { id: "2", title: "Self Intro", description: "My name is...", status: "In Progress", xp: 75, color: "bg-green-500" },
      { id: "4", title: "Numbers", description: "Counting 1-100.", status: "Not Started", xp: 100, color: "bg-orange-500" },
    ]
  },
  {
    title: "Unit 2: Daily Life",
    description: "Navigate common situations in the Hyolmo community.",
    lessons: [
      { id: "3", title: "Family", description: "Relatives and friends.", status: "Locked", xp: 100, color: "bg-purple-500" },
      { id: "5", title: "Market", description: "Shopping and food.", status: "Locked", xp: 120, color: "bg-pink-500" },
      { id: "6", title: "Himalayas", description: "Nature and adventure.", status: "Locked", xp: 150, color: "bg-indigo-500" },
    ]
  }
];

export default function LessonsPage() {
  return (
    <div className="flex-1 space-y-12 p-4 md:p-8 pt-6 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Hyolmo Learning Path</h1>
        <p className="text-muted-foreground text-lg">Master the language step-by-step through our curated curriculum.</p>
        <div className="flex justify-center gap-4">
          <Badge variant="outline" className="px-4 py-1 flex gap-2 items-center">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span>450 Total XP</span>
          </Badge>
          <Badge variant="outline" className="px-4 py-1 flex gap-2 items-center">
            <Star className="h-4 w-4 text-orange-500" />
            <span>5 Day Streak</span>
          </Badge>
        </div>
      </div>

      <div className="space-y-16">
        {units.map((unit, unitIdx) => (
          <div key={unitIdx} className="space-y-8">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold">{unit.title}</h2>
              <p className="text-muted-foreground">{unit.description}</p>
            </div>
            
            <div className="flex flex-col items-center gap-8">
              {unit.lessons.map((lesson, index) => {
                const isLocked = lesson.status === "Locked";
                const isCompleted = lesson.status === "Completed";
                const isInProgress = lesson.status === "In Progress";

                return (
                  <div key={lesson.id} className="relative flex flex-col items-center group">
                    {/* Connection Line */}
                    {index < unit.lessons.length - 1 && (
                      <div className="absolute top-16 w-1 h-12 bg-border z-0" />
                    )}
                    
                    <Link 
                      href={!isLocked ? `/dashboard/lessons/${lesson.id}` : '#'}
                      className={cn(
                        "relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg",
                        isLocked ? "bg-muted text-muted-foreground cursor-not-allowed" : 
                        isCompleted ? "bg-primary text-primary-foreground" : 
                        "bg-white border-4 border-primary text-primary animate-pulse"
                      )}
                    >
                      {isLocked ? <Lock className="h-8 w-8" /> : 
                       isCompleted ? <CheckCircle2 className="h-8 w-8" /> : 
                       <PlayCircle className="h-8 w-8" />}
                    </Link>

                    <div className="mt-4 text-center">
                      <p className={cn("font-bold text-lg", isLocked && "text-muted-foreground")}>
                        {lesson.title}
                      </p>
                      <Badge variant={isCompleted ? "default" : "secondary"} className="mt-1">
                        {isCompleted ? "Done" : `+${lesson.xp} XP`}
                      </Badge>
                    </div>

                    {/* Popover Detail on Hover (Simple tooltip style) */}
                    <div className="opacity-0 group-hover:opacity-100 absolute left-20 top-0 bg-popover border p-4 rounded-lg shadow-xl w-48 transition-opacity pointer-events-none z-50">
                      <p className="font-semibold text-sm">{lesson.title}</p>
                      <p className="text-xs text-muted-foreground">{lesson.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
