
"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, PlayCircle, Star, Trophy, CheckCircle2, MessageCircle, Sparkles, GraduationCap, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
  {
    title: "Tier 1: Foundation",
    description: "Phonetic recognition and survival basics.",
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    icon: Sparkles,
    lessons: [
      { id: "alphabets", title: "Sherpa Script", status: "In Progress", strikes: 1, xp: 100, type: "Alphabet" },
      { id: "1", title: "Survival Phrases", status: "Completed", strikes: 3, xp: 50, type: "Phrases" },
    ]
  },
  {
    title: "Tier 2: Novice",
    description: "Subject-Object-Verb connections.",
    color: "text-green-500",
    bgColor: "bg-green-500",
    icon: MessageCircle,
    lessons: [
      { id: "4", title: "Numbers 1-100", status: "Not Started", strikes: 0, xp: 150, type: "Vocabulary" },
      { id: "2", title: "Self Intro", status: "Not Started", strikes: 0, xp: 75, type: "Grammar" },
    ]
  },
  {
    title: "Tier 3: Intermediate",
    description: "Conversational navigation.",
    color: "text-orange-500",
    bgColor: "bg-orange-500",
    icon: BookOpen,
    lessons: [
      { id: "questions", title: "Asking Questions", status: "Locked", strikes: 0, xp: 200, type: "Grammar" },
    ]
  },
  {
    title: "Tier 4: Advanced",
    description: "Fluency & Storytelling.",
    color: "text-purple-500",
    bgColor: "bg-purple-500",
    icon: GraduationCap,
    lessons: [
      { id: "stories", title: "Mountain Tales", status: "Locked", strikes: 0, xp: 500, type: "Comprehension" },
    ]
  }
];

export default function LessonsPage() {
  return (
    <div className="flex-1 space-y-12 p-4 md:p-8 pt-6 max-w-4xl mx-auto pb-24">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Hyolmo Learning Path</h1>
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

      <div className="space-y-24 relative">
        <div className="absolute left-1/2 top-24 bottom-0 w-1 bg-muted -translate-x-1/2 hidden md:block" />

        {tiers.map((tier, tierIdx) => (
          <div key={tierIdx} className="space-y-12 relative">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className={cn("p-3 rounded-2xl bg-white shadow-sm border-2 transition-transform hover:scale-110", tier.color)}>
                <tier.icon className="h-8 w-8" />
              </div>
              <h2 className={cn("text-2xl font-bold", tier.color)}>{tier.title}</h2>
              <p className="text-muted-foreground max-w-sm text-sm">{tier.description}</p>
            </div>
            
            <div className="flex flex-col items-center gap-16">
              {tier.lessons.map((lesson, index) => {
                const isLocked = lesson.status === "Locked";
                const isCompleted = lesson.status === "Completed";
                const lessonPath = lesson.id === "alphabets" ? "/dashboard/alphabets" : `/dashboard/lessons/${lesson.id}`;

                return (
                  <div key={lesson.id} className="relative flex flex-col items-center group w-full max-w-xs">
                    <Link 
                      href={!isLocked ? lessonPath : '#'}
                      className={cn(
                        "relative z-10 w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-all hover:scale-105 shadow-xl border-b-[6px] active:border-b-0 active:translate-y-1",
                        isLocked ? "bg-muted text-muted-foreground cursor-not-allowed border-muted-foreground/20" : 
                        isCompleted ? "bg-primary text-primary-foreground border-primary-foreground/30" : 
                        "bg-white border-primary text-primary border-4"
                      )}
                    >
                      {isLocked ? <Lock className="h-10 w-10" /> : 
                       isCompleted ? <CheckCircle2 className="h-10 w-10" /> : 
                       <PlayCircle className="h-10 w-10" />}
                    </Link>

                    {/* Mastery Strike Indicators */}
                    <div className="absolute top-2 -right-4 flex flex-col gap-1 z-20">
                      {[1, 2, 3].map((strike) => (
                        <div 
                          key={strike}
                          className={cn(
                            "w-3 h-3 rounded-full border shadow-sm",
                            lesson.strikes >= strike ? tier.bgColor : "bg-white"
                          )}
                        />
                      ))}
                    </div>

                    <Card className={cn(
                      "mt-6 w-full text-center transition-all shadow-md",
                      isLocked ? "opacity-50" : "hover:border-primary border-2"
                    )}>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{lesson.type}</span>
                          <span className="text-xs font-bold text-orange-500">+{lesson.xp} XP</span>
                        </div>
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      </CardHeader>
                    </Card>

                    {index < tier.lessons.length - 1 && (
                      <div className="absolute top-24 w-1 h-16 bg-muted z-0 hidden md:block" />
                    )}
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
