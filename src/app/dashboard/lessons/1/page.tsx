
"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Volume2, ArrowRight, Loader2, Info } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { getSpokenText } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';

const vocabulary = [
  { 
    sherpa: "བཀྲ་ཤིས་བདེ་ལེགས", 
    english: "Hello / Greetings", 
    pronunciation: "tah-shee deh-lek",
    hint: "greeting people",
    image: "https://picsum.photos/seed/greet/400/300" 
  },
  { 
    sherpa: "ཐུགས་རྗེ་ཆེ་", 
    english: "Thank you", 
    pronunciation: "thook-jay-chay",
    hint: "gratitude heart",
    image: "https://picsum.photos/seed/thanks/400/300"
  },
  { 
    sherpa: "ཁམས་བཟང་།", 
    english: "How are you?", 
    pronunciation: "khahm-sahng",
    hint: "conversation face",
    image: "https://picsum.photos/seed/status/400/300"
  },
  { 
    sherpa: "བདེ་ལེགས་", 
    english: "Goodbye", 
    pronunciation: "deh-lek",
    hint: "waving hand",
    image: "https://picsum.photos/seed/bye/400/300"
  },
];

export default function LessonOnePage() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handlePlaySound = async (text: string) => {
    if (loadingAudio) return;

    setLoadingAudio(text);
    setAudioUrl(null);

    try {
      const result = await getSpokenText(text);
      if (result.media) {
        setAudioUrl(result.media);
        audioRef.current?.load();
        audioRef.current?.play();
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate audio. Please try again.",
      });
    } finally {
      setLoadingAudio(null);
    }
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Tier 1: Survival Phrases</h1>
          <p className="text-muted-foreground">Focus on phonetic recognition and basic social interaction.</p>
        </div>
        <Button asChild size="lg" className="shadow-lg">
            <Link href="/dashboard/lessons/1/quiz">
                Start Lesson Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {vocabulary.map((item, index) => (
          <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all border-2 hover:border-primary">
            <div className="relative h-48 w-full overflow-hidden">
                <Image 
                    src={item.image} 
                    alt={item.english} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105"
                    data-ai-hint={item.hint}
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl font-bold">{item.sherpa}</CardTitle>
                <Button variant="secondary" size="icon" className="rounded-full shadow-md" onClick={() => handlePlaySound(item.sherpa)} disabled={!!loadingAudio}>
                    {loadingAudio === item.sherpa ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Volume2 className="h-5 w-5" />
                    )}
                </Button>
              </div>
              <CardDescription className="text-lg font-medium text-primary uppercase tracking-tight">
                {item.english}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-secondary/50 rounded-lg border border-border">
                <p className="text-sm font-semibold flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    Pronunciation: <span className="italic text-foreground">"{item.pronunciation}"</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {audioUrl && (
        <audio ref={audioRef} hidden>
          <source src={audioUrl} type="audio/wav" />
        </audio>
      )}
    </div>
  );
}
