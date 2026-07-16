"use client";

import { useState, useRef, useEffect } from "react";
import { getPronunciationFeedback } from "@/ai/flows/pronunciation-feedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

type Feedback = {
  score: number;
  feedback: string;
} | null;

const phrases = [
  "Tashi delek", // (Hello/Greetings)
  "Thuk-je-che", // (Thank you)
  "Kham-sang?", // (How are you?)
  "La-so", // (Yes)
  "Me-le", // (No)
];

export function PronunciationPractice() {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState(phrases[0]);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      setFeedback(null);
      audioChunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          if (!base64Audio) return;

          setIsLoading(true);
          try {
            const result = await getPronunciationFeedback({
              audioDataUri: base64Audio,
              textToPronounce: selectedPhrase,
            });
            setFeedback(result);
          } catch (error) {
            console.error("AI feedback error:", error);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Could not get feedback. Please try again.",
            });
          } finally {
            setIsLoading(false);
          }
        };
      };

      recorder.start();
    } catch (err) {
      console.error("Could not start recording:", err);
      toast({
        variant: "destructive",
        title: "Microphone Error",
        description: "Could not access microphone. Please check your browser permissions.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  const scoreData = feedback ? [{ name: 'score', value: feedback.score * 100, fill: 'hsl(var(--accent))' }] : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice a Phrase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Select onValueChange={setSelectedPhrase} defaultValue={selectedPhrase}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a phrase to practice" />
              </SelectTrigger>
              <SelectContent>
                {phrases.map((phrase) => (
                  <SelectItem key={phrase} value={phrase}>
                    {phrase}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={toggleRecording}
              disabled={isLoading}
              className="w-full sm:w-auto"
              variant={isRecording ? "destructive" : "default"}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : isRecording ? (
                <Square className="mr-2 h-4 w-4" />
              ) : (
                <Mic className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Analyzing..." : isRecording ? "Stop" : "Record"}
            </Button>
        </div>

        {(isLoading || feedback) && (
            <div className="grid md:grid-cols-3 gap-6 pt-4">
                <div className="md:col-span-1 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold mb-2">Your Score</h3>
                    {isLoading ? (
                        <div className="h-[150px] w-[150px] flex items-center justify-center">
                            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
                        </div>
                    ) : feedback && (
                       <div className="h-[150px] w-[150px] relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart 
                                innerRadius="70%" 
                                outerRadius="100%" 
                                data={scoreData} 
                                startAngle={90} 
                                endAngle={-270}
                            >
                                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                <RadialBar 
                                    background 
                                    dataKey='value' 
                                    cornerRadius={10}
                                    className="fill-primary/20"
                                />
                            </RadialBarChart>
                         </ResponsiveContainer>
                         <div className="absolute inset-0 flex items-center justify-center">
                             <span className="text-3xl font-bold">{Math.round(feedback.score * 100)}</span>
                         </div>
                       </div>
                    )}
                </div>
                <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-2">AI Feedback</h3>
                    {isLoading ? (
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                            <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                            <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                        </div>
                    ) : feedback && (
                        <Alert>
                            <Star className="h-4 w-4" />
                            <AlertTitle>Tutor's Advice</AlertTitle>
                            <AlertDescription>
                                {feedback.feedback}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
