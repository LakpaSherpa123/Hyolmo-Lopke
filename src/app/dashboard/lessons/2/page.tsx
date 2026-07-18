
"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, ArrowRight, Loader2, Turtle, Rabbit, Layers } from "lucide-react";
import { getSpokenText } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';
import { LessonNavigation } from '@/components/lessons/LessonNavigation';
import { TriScriptBlock } from '@/components/lessons/TriScriptBlock';
import { Badge } from '@/components/ui/badge';

const vocabulary = [
  { 
    tibetan: "ཁྱེད་ཀྱི་མིང་ལ་ག་རེ་ཡིན།", 
    devanagari: "ख्येगी मिङला कारे यीन?",
    romanized: "khyeh-kee meeng-la kah-ray",
    english: "What is your name?" 
  },
  { 
    tibetan: "ངའི་མིང་ལ་ ... ཡིན།", 
    devanagari: "ङे मिङला ... यीन",
    romanized: "ngee meeng-la ... yeen",
    english: "My name is ..." 
  },
];

export default function LessonTwoPage() {
  const [showRomanized, setShowRomanized] = useState(true);
  const [slowMotion, setSlowMotion] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handlePlaySound = async (text: string) => {
    if (loadingAudio) return;
    setLoadingAudio(text);
    try {
      const result = await getSpokenText(text.replace('...', ''));
      if (result.media) {
        setAudioUrl(result.media);
        if (audioRef.current) {
          audioRef.current.playbackRate = slowMotion ? 0.5 : 1.0;
          setTimeout(() => audioRef.current?.play(), 100);
        }
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not generate audio." });
    } finally {
      setLoadingAudio(null);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-24">
      <LessonNavigation 
        title="Tier 2: Self Intro" 
        progress={10} 
        showRomanized={showRomanized} 
        onToggleRomanized={() => setShowRomanized(!showRomanized)} 
      />

      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 mt-4">
        <div className="bg-green-50 border-2 border-green-200 p-6 rounded-3xl flex gap-4 items-start text-green-800 shadow-sm">
          <Layers className="h-6 w-6 shrink-0 mt-1" />
          <div className="space-y-1">
            <h4 className="font-bold text-lg">Tier 2 Transition: SOV Syntax</h4>
            <p className="text-sm">Notice the Subject-Object-Verb order. Use the Snail Toggle to hear specific tonal drops.</p>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <Button 
            variant={slowMotion ? "default" : "outline"} 
            onClick={() => setSlowMotion(!slowMotion)}
            className="rounded-full gap-2 border-2 px-6 h-12 shadow-md transition-all active:scale-95"
          >
            {slowMotion ? <Turtle className="h-5 w-5" /> : <Rabbit className="h-5 w-5" />}
            <span className="font-bold">{slowMotion ? "Slow (0.5x)" : "Normal Speed"}</span>
          </Button>
        </div>

        <div className="space-y-6">
          {vocabulary.map((item, index) => (
            <Card key={index} className="border-2 rounded-3xl shadow-lg transition-all hover:border-primary overflow-hidden">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 w-full space-y-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20">{item.english}</Badge>
                  <TriScriptBlock 
                    tibetan={item.tibetan}
                    devanagari={item.devanagari}
                    romanized={item.romanized}
                    showRomanized={showRomanized}
                    className="w-full text-left items-start"
                    variant="ghost"
                  />
                </div>
                <Button 
                  size="icon" 
                  className="h-20 w-20 rounded-full shadow-xl active:scale-95 transition-transform" 
                  onClick={() => handlePlaySound(item.tibetan)}
                  disabled={!!loadingAudio}
                >
                  {loadingAudio === item.tibetan ? <Loader2 className="animate-spin" /> : <Volume2 className="h-10 w-10" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center pt-12 space-y-4">
          <div className="flex flex-wrap justify-center gap-3">
            {["ངའི་", "མིང་ལ་", "བཀྲ་ཤིས་", "ཡིན།"].map((chip) => (
              <Button key={chip} variant="outline" className="h-14 px-6 rounded-2xl border-2 font-headline text-xl shadow-md border-b-4">
                {chip}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground font-medium italic">Drag word chips into correct SOV order (Word Bank Intro)</p>
          
          <Button size="lg" className="h-14 px-12 rounded-2xl text-lg font-bold shadow-xl border-b-4 mt-8">
            Check Translation <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
      
      {audioUrl && <audio ref={audioRef} src={audioUrl} hidden />}
    </div>
  );
}
