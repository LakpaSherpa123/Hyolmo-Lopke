"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, ArrowRight, Loader2 } from "lucide-react";
import Link from 'next/link';
import { getSpokenText } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';

const vocabulary = [
  { sherpa: "ཁྱེད་ཀྱི་མིང་ལ་ག་རེ་ཡིན།", english: "Khyeki ming-la kar-re? (What is your name?)", pronunciation: "khyeh-kee meeng-la kah-ray" },
  { sherpa: "ངའི་མིང་ལ་ ... ཡིན།", english: "Ngi ming-la ... yin (My name is ...)", pronunciation: "ngee meeng-la ... yeen" },
  { sherpa: "ཁྱེད་རང་ག་ནས་ཡིན་པ།", english: "Khyerang-la khang-ne yin? (Where are you from?)", pronunciation: "khyeh-rahng-la khahng-nay yeen" },
  { sherpa: "ང་ ... ནས་ཡིན།", english: "Nga ... ne yin (I am from ...)", pronunciation: "ngah ... nay yeen" },
  { sherpa: "ཁྱེད་རང་ལ་མཇལ་བ་དགའ་པོ་བྱུང་།", english: "Khyerang-la nyerpa-la ga-po jung (Nice to meet you)", pronunciation: "khyeh-rahng-la nyer-pa-la gah-po joong" },
];

export default function LessonTwoPage() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
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
          <h1 className="text-3xl font-bold tracking-tight font-headline">Lesson 2: Introducing Yourself</h1>
          <p className="text-muted-foreground">Learn how to share your name and where you're from.</p>
        </div>
        <Button asChild>
            <Link href="/dashboard/lessons/2/quiz">
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
