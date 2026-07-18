
"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Volume2, ArrowRight, Loader2, HelpCircle, Layers } from "lucide-react";
import Link from 'next/link';
import { getSpokenText } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const vocabulary = [
  { sherpa: "ཁྱེད་ཀྱི་མིང་ལ་ག་རེ་ཡིན།", english: "What is your name?", pronunciation: "khyeh-kee meeng-la kah-ray" },
  { sherpa: "ངའི་མིང་ལ་ ... ཡིན།", english: "My name is ...", pronunciation: "ngee meeng-la ... yeen" },
  { sherpa: "ཁྱེད་རང་ག་ནས་ཡིན་པ།", english: "Where are you from?", pronunciation: "khyeh-rahng-la khahng-nay yeen" },
  { sherpa: "ང་ ... ནས་ཡིན།", english: "I am from ...", pronunciation: "ngah ... nay yeen" },
  { sherpa: "ཁྱེད་རང་ལ་མཇལ་བ་དགའ་པོ་བྱུང་།", english: "Nice to meet you", pronunciation: "khyeh-rahng-la nyer-pa-la gah-po joong" },
];

export default function LessonTwoPage() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const [slowMotion, setSlowMotion] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handlePlaySound = async (text: string) => {
    if (loadingAudio) return;

    setLoadingAudio(text);
    setAudioUrl(null);

    try {
      const result = await getSpokenText(text.replace('...', ''));
      if (result.media) {
        setAudioUrl(result.media);
        if (audioRef.current) {
            audioRef.current.playbackRate = slowMotion ? 0.6 : 1.0;
            audioRef.current.load();
            audioRef.current.play();
        }
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
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Badge variant="secondary" className="mb-2">Tier 2: Novice</Badge>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Lesson 2: Self Intro</h1>
          <p className="text-muted-foreground">Transitioning from words to simple SOV connections.</p>
        </div>
        <Button asChild>
            <Link href="/dashboard/lessons/2/quiz">
                Practice with Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex gap-3 text-blue-800 text-sm">
        <Layers className="h-5 w-5 shrink-0" />
        <p><strong>Tier 2 Concept:</strong> Notice how Sherpa sentences often place the verb at the end (Subject-Object-Verb). Practice dragging the word chips in your mind before listening.</p>
      </div>

      <div className="flex justify-end items-center gap-2 px-2">
        <span className="text-xs font-bold uppercase text-muted-foreground">Slow Motion Mode</span>
        <Button 
            variant={slowMotion ? "default" : "outline"} 
            size="sm" 
            className="rounded-full h-8 px-4"
            onClick={() => setSlowMotion(!slowMotion)}
        >
            {slowMotion ? "🐢 Slow (0.6x)" : "🐇 Normal"}
        </Button>
      </div>

      <div className="space-y-4">
        {vocabulary.map((item, index) => (
          <Card key={index} className="group hover:border-primary transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-2xl font-bold font-headline">{item.sherpa}</p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">{item.english}</Badge>
                    <span className="text-xs text-muted-foreground italic">({item.pronunciation})</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-full border-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all" 
                onClick={() => handlePlaySound(item.sherpa)} 
                disabled={!!loadingAudio}
              >
                {loadingAudio === item.sherpa ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                    <Volume2 className="h-6 w-6" />
                )}
              </Button>
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
