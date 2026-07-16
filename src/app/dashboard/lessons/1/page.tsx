"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, ArrowRight, Loader2 } from "lucide-react";
import Link from 'next/link';
import { getSpokenText } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';

const vocabulary = [
  { sherpa: "བཀྲ་ཤིས་བདེ་ལེགས", english: "Tashi delek (Hello / Greetings)", pronunciation: "tah-shee deh-lek" },
  { sherpa: "ཐུགས་རྗེ་ཆེ་", english: "Thuk-je-che (Thank you)", pronunciation: "thook-jay-chay" },
  { sherpa: "ཁམས་བཟང་།", english: "Kham-sang? (How are you?)", pronunciation: "khahm-sahng" },
  { sherpa: "བདེ་ལེགས་", english: "De-lek (Goodbye (informal))", pronunciation: "deh-lek" },
  { sherpa: "ལགས་སོ།", english: "La-so (Yes)", pronunciation: "lah-so" },
  { sherpa: "མེད་ལེ།", english: "Me-le (No)", pronunciation: "meh-lay" },
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
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Lesson 1: Basic Greetings</h1>
          <p className="text-muted-foreground">Learn essential phrases for everyday conversations.</p>
        </div>
        <Button asChild>
            <Link href="/dashboard/lessons/1/quiz">
                Practice with a Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vocabulary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {vocabulary.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <div>
                <p className="text-2xl font-semibold">{item.sherpa}</p>
                <p className="text-sm text-muted-foreground">{item.english} <span className="italic">({item.pronunciation})</span></p>
              </div>
              <Button variant="outline" size="icon" onClick={() => handlePlaySound(item.sherpa)} disabled={!!loadingAudio}>
                {loadingAudio === item.sherpa ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <Volume2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {audioUrl && (
        <audio ref={audioRef} hidden>
          <source src={audioUrl} type="audio/wav" />
        </audio>
      )}
    </div>
  );
}
