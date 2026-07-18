
"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, ArrowRight, Loader2, Info } from "lucide-react";
import Image from 'next/image';
import { getSpokenText } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';
import { LessonNavigation } from '@/components/lessons/LessonNavigation';
import { TriScriptBlock } from '@/components/lessons/TriScriptBlock';

const vocabulary = [
  { 
    tibetan: "བཀྲ་ཤིས་བདེ་ལེགས", 
    devanagari: "ताशी देलेक",
    romanized: "tah-shee deh-lek",
    english: "Hello / Greetings", 
    hint: "greeting people",
    image: "https://picsum.photos/seed/greet/400/300" 
  },
  { 
    tibetan: "ཐུགས་རྗེ་ཆེ་", 
    devanagari: "थुग जे छे",
    romanized: "thook-jay-chay",
    english: "Thank you", 
    hint: "gratitude heart",
    image: "https://picsum.photos/seed/thanks/400/300"
  },
  { 
    tibetan: "ཁམས་བཟང་།", 
    devanagari: "खाम साङ",
    romanized: "khahm-sahng",
    english: "How are you?", 
    hint: "conversation face",
    image: "https://picsum.photos/seed/status/400/300"
  },
  { 
    tibetan: "བདེ་ལེགས་", 
    devanagari: "देलेक",
    romanized: "deh-lek",
    english: "Goodbye", 
    hint: "waving hand",
    image: "https://picsum.photos/seed/bye/400/300"
  },
];

export default function LessonOnePage() {
  const [showRomanized, setShowRomanized] = useState(true);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handlePlaySound = async (text: string) => {
    if (loadingAudio) return;
    setLoadingAudio(text);
    try {
      const result = await getSpokenText(text);
      if (result.media) {
        setAudioUrl(result.media);
        setTimeout(() => audioRef.current?.play(), 100);
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
        title="Tier 1: Survival Phrases" 
        progress={25} 
        showRomanized={showRomanized} 
        onToggleRomanized={() => setShowRomanized(!showRomanized)} 
      />

      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 mt-4">
        <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-3xl flex gap-4 items-start text-blue-800">
          <Info className="h-6 w-6 shrink-0 mt-1" />
          <div className="space-y-1">
            <h4 className="font-bold text-lg italic">Rule of Three: Familiarity</h4>
            <p className="text-sm">Tap each card to hear the pronunciation. Try to memorize the script shapes before hiding the romanization.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vocabulary.map((item, index) => (
            <Card key={index} className="overflow-hidden border-2 rounded-3xl group transition-all hover:border-primary shadow-lg">
              <div className="relative h-56 w-full">
                <Image 
                  src={item.image} 
                  alt={item.english} 
                  fill 
                  className="object-cover"
                  data-ai-hint={item.hint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-xl drop-shadow-md">{item.english}</p>
                </div>
              </div>
              <CardContent className="p-6 flex items-center justify-between gap-4">
                <TriScriptBlock 
                  tibetan={item.tibetan}
                  devanagari={item.devanagari}
                  romanized={item.romanized}
                  showRomanized={showRomanized}
                  className="flex-1"
                  variant="ghost"
                />
                <Button 
                  size="icon" 
                  className="h-16 w-16 rounded-2xl shadow-xl active:scale-95 transition-transform" 
                  onClick={() => handlePlaySound(item.tibetan)}
                  disabled={!!loadingAudio}
                >
                  {loadingAudio === item.tibetan ? <Loader2 className="animate-spin" /> : <Volume2 className="h-8 w-8" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button size="lg" className="h-14 px-12 rounded-2xl text-lg font-bold shadow-xl border-b-4 border-primary-foreground/20">
            Next Level Quiz <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
      
      {audioUrl && <audio ref={audioRef} src={audioUrl} hidden />}
    </div>
  );
}
