"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Volume2, Loader2, RotateCcw, Check, Star } from "lucide-react";
import { getSpokenText } from "@/ai/flows/text-to-speech";
import { getDrawingFeedback } from "@/ai/flows/drawing-feedback";
import type { DrawingFeedbackOutput } from "@/ai/flows/drawing-feedback";
import { useToast } from "@/hooks/use-toast";
import { DrawingCanvas } from "@/components/alphabets/DrawingCanvas";
import type { DrawingCanvasRef } from "@/components/alphabets/DrawingCanvas";


const sherpaAlphabet = [
  { char: 'ཀ', pronunciation: 'ka' }, { char: 'ཁ', pronunciation: 'kha' }, { char: 'ག', pronunciation: 'ga' }, { char: 'ང', pronunciation: 'nga' },
  { char: 'ཅ', pronunciation: 'cha' }, { char: 'ཆ', pronunciation: 'chha' }, { char: 'ཇ', pronunciation: 'ja' }, { char: 'ཉ', pronunciation: 'nya' },
  { char: 'ཏ', pronunciation: 'ta' }, { char: 'ཐ', pronunciation: 'tha' }, { char: 'ད', pronunciation: 'da' }, { char: 'ན', pronunciation: 'na' },
  { char: 'པ', pronunciation: 'pa' }, { char: 'ཕ', pronunciation: 'pha' }, { char: 'བ', pronunciation: 'ba' }, { char: 'མ', pronunciation: 'ma' },
  { char: 'ཙ', pronunciation: 'tsa' }, { char: 'ཚ', pronunciation: 'tsha' }, { char: 'ཛ', pronunciation: 'dza' }, { char: 'ཝ', pronunciation: 'wa' },
  { char: 'ཞ', pronunciation: 'zha' }, { char: 'ཟ', pronunciation: 'za' }, { char: 'འ', pronunciation: 'a' }, { char: 'ཡ', pronunciation: 'ya' },
  { char: 'ར', pronunciation: 'ra' }, { char: 'ལ', pronunciation: 'la' }, { char: 'ཤ', pronunciation: 'sha' }, { char: 'ས', pronunciation: 'sa' },
  { char: 'ཧ', pronunciation: 'ha' }, { char: 'ཨ', pronunciation: 'a' }
];

export default function AlphabetsPage() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const [drawingFeedback, setDrawingFeedback] = useState<DrawingFeedbackOutput | null>(null);
  const [isCheckingDrawing, setIsCheckingDrawing] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<DrawingCanvasRef>(null);
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
  
  const handleClearCanvas = () => {
    canvasRef.current?.clearCanvas();
    setDrawingFeedback(null);
  };

  const handleCheckDrawing = async (character: string) => {
    const drawingData = canvasRef.current?.getCanvasData();
    if (!drawingData) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not get drawing data. Please draw something first.",
        });
        return;
    }
    
    setIsCheckingDrawing(true);
    setDrawingFeedback(null);
    try {
        const feedback = await getDrawingFeedback({
            userDrawingDataUri: drawingData,
            characterToDraw: character
        });
        setDrawingFeedback(feedback);
        // You can still use the feedback, e.g. for a toast
        toast({
            title: `Score: ${Math.round(feedback.score * 100)}/100`,
            description: feedback.feedback,
        })
    } catch (error) {
        console.error("Error getting drawing feedback:", error);
        toast({
            variant: "destructive",
            title: "AI Error",
            description: "Could not get feedback from AI. Please try again.",
        });
    } finally {
        setIsCheckingDrawing(false);
    }
  };

  const onDialogOpenChange = (open: boolean) => {
    if(!open) {
        setDrawingFeedback(null);
    }
  }

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">The Sherpa Alphabet</h1>
            <p className="text-muted-foreground">Click on a character to learn its sound and practice writing.</p>
        </div>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
        {sherpaAlphabet.map((item, index) => (
          <Dialog key={index} onOpenChange={onDialogOpenChange}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg hover:border-primary transition-all cursor-pointer aspect-square flex flex-col items-center justify-center">
                <CardContent className="p-2 text-center">
                  <span className="text-4xl font-bold">{item.char}</span>
                  <span className="text-sm text-muted-foreground mt-2 block">{item.pronunciation}</span>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span className="text-2xl">Practice Writing: <span className="font-bold text-4xl">{item.char}</span></span>
                   <Button variant="outline" size="icon" onClick={() => handlePlaySound(item.pronunciation)} disabled={!!loadingAudio}>
                    {loadingAudio === item.pronunciation ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        <Volume2 className="h-6 w-6" />
                    )}
                  </Button>
                </DialogTitle>
                <DialogDescription>
                  Trace the character to practice writing.<br/>Pronunciation: <span className="font-bold">{item.pronunciation}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4">
                <DrawingCanvas ref={canvasRef} character={item.char} />
                <div className="flex gap-2 w-full max-w-[300px]">
                    <Button variant="outline" className="w-full" onClick={handleClearCanvas}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Clear
                    </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
