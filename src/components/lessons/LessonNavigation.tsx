
"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, X, HelpCircle } from "lucide-react";
import Link from "next/link";

interface LessonNavigationProps {
  progress: number;
  showRomanized: boolean;
  onToggleRomanized: () => void;
  title: string;
}

export function LessonNavigation({
  progress,
  showRomanized,
  onToggleRomanized,
  title
}: LessonNavigationProps) {
  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/lessons">
            <X className="h-5 w-5" />
          </Link>
        </Button>
        
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</span>
            <span className="text-xs font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center gap-1">
          <Button 
            variant={showRomanized ? "ghost" : "secondary"} 
            size="icon" 
            onClick={onToggleRomanized}
            title={showRomanized ? "Hide Training Wheels" : "Show Training Wheels"}
            className="rounded-full"
          >
            {showRomanized ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
