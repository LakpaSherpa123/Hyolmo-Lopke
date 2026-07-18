
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, PlayCircle, Star, Trophy, CheckCircle2, BookOpen, MessageCircle, Sparkles, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
  {
    title: "Tier 1: Foundation (Absolute Beginner)",
    description: "Focus on phonetic recognition and basic survival vocabulary.",
    color: "text-blue-500",
    icon: Sparkles,
    lessons: [
      { id: "alphabets", title: "Sherpa Script", description: "Trace and recognize characters.", status: "In Progress", xp: 100, type: "Alphabet" },
      { id: "1", title: "Survival Phrases", description: "Hello, Thank You, and Greetings.", status: "Completed", xp: 50, type: "Phrases" },
    ]
  },
  {
    title: "Tier 2: Novice (Basic Connection)",
    description: "Transition to simple subject-object connections and high-frequency categories.",
    color: "text-green-500",
    icon: MessageCircle,
    lessons: [
      { id: "4", title: "Numbers 1-100", description: "Counting and simple quantities.", status: "Not Started", xp: 150, type: "Vocabulary" },
      { id: "2", title: "Self Intro", description: "Sharing your name and origin.", status: "Not Started", xp: 75, type: "Grammar" },
      { id: "colors", title: "Colors & Objects", description: "Describing the world around you.", status: "Locked", xp: 100, type: "Vocabulary" },
    ]
  },
  {
    title: "Tier 3: Intermediate (Conversational)",
    description: "Navigate social interactions and ask important questions.",
    color: "text-orange-500",
    icon: BookOpen,
    lessons: [
      { id: "questions", title: "Asking Questions", description: "Who, What, Where, Why.", status: "Locked", xp: 200, type: "Grammar" },
      { id: "tenses", title: "Past & Future", description: "Describing events in time.", status: "Locked", xp: 250, type: "Grammar" },
    ]
  },
  {
    title: "Tier 4: Advanced (Fluency)",
    description: "Native-like comprehension and cultural storytelling.",
    color: "text-purple-500",
    icon: GraduationCap,
    lessons: [
      { id: "idioms", title: "Idiomatic Expressions", description: "Colloquialisms and metaphors.", status: "Locked", xp: 300, type: "Cultural" },
      { id: "stories", title: "Mountain Tales", description: "Listen to authentic Sherpa legends.", status: "Locked", xp: 500, type: "Comprehension" },
    ]
  }
];

export default function LessonsPage() {
  return (
    <div className="flex-1 space-y-12 p-4 md:p-8 pt-6 max-w-4xl mx-auto pb-24">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Hyolmo Learning Path</h1>
        <p className="text-muted-foreground text-lg italic">The journey of a thousand miles begins with a single word.</p>
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
        {/* Background vertical progress line */}
        <div className="absolute left-1/2 top-24 bottom-0 w-1 bg-muted -translate-x-1/2 hidden md:block" />

        {tiers.map((tier, tierIdx) => (
          <div key={tierIdx} className="space-y-12 relative">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className={cn("p-3 rounded-2xl bg-white shadow-sm border-2", tier.color)}>
                <tier.icon className="h-8 w-8" />
              </div>
              <h2 className={cn("text-2xl font-bold", tier.color)}>{tier.title}</h2>
              <p className="text-muted-foreground max-w-md">{tier.description}</p>
            </div>
            
            <div className="flex flex-col items-center gap-12">
              {tier.lessons.map((lesson, index) => {
                const isLocked = lesson.status === "Locked";
                const isCompleted = lesson.status === "Completed";
                const isInProgress = lesson.status === "In Progress";
                const lessonPath = lesson.id === "alphabets" ? "/dashboard/alphabets" : `/dashboard/lessons/${lesson.id}`;

                return (
                  <div key={lesson.id} className="relative flex flex-col items-center group w-full max-w-sm">
                    <Link 
                      href={!isLocked ? lessonPath : '#'}
                      className={cn(
                        "relative z-10 w-20 h-20 rounded-3xl flex items-center justify-center transition-all hover:scale-105 shadow-xl border-b-4 active:border-b-0 active:translate-y-1",
                        isLocked ? "bg-muted text-muted-foreground cursor-not-allowed border-muted-foreground/20" : 
                        isCompleted ? "bg-primary text-primary-foreground border-primary-foreground/30" : 
                        "bg-white border-primary text-primary border-4"
                      )}
                    >
                      {isLocked ? <Lock className="h-10 w-10" /> : 
                       isCompleted ? <CheckCircle2 className="h-10 w-10" /> : 
                       <PlayCircle className="h-10 w-10" />}
                    </Link>

                    <Card className={cn(
                      "mt-6 w-full text-center transition-all",
                      isLocked ? "opacity-50" : "hover:border-primary"
                    )}>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{lesson.type}</span>
                          <span className="text-xs font-bold text-orange-500">+{lesson.xp} XP</span>
                        </div>
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        <CardDescription className="text-xs">{lesson.description}</CardDescription>
                      </CardHeader>
                    </Card>

                    {/* Desktop visual connection line between items */}
                    {index < tier.lessons.length - 1 && (
                      <div className="absolute top-20 w-1 h-12 bg-muted z-0 hidden md:block" />
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
