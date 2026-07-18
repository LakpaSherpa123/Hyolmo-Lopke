
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TriScriptBlockProps {
  tibetan: string;
  devanagari: string;
  romanized: string;
  showRomanized?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost" | "secondary";
}

export function TriScriptBlock({
  tibetan,
  devanagari,
  romanized,
  showRomanized = true,
  onClick,
  className,
  disabled,
  variant = "outline"
}: TriScriptBlockProps) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-auto py-6 px-8 flex flex-col gap-2 items-center justify-center transition-all hover:scale-105 border-2 min-w-[140px] rounded-2xl shadow-sm",
        className
      )}
    >
      <span className="text-3xl font-bold font-headline leading-tight">{tibetan}</span>
      <span className="text-sm font-medium text-muted-foreground leading-tight">{devanagari}</span>
      {showRomanized && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 leading-tight">
          {romanized}
        </span>
      )}
    </Button>
  );
}
