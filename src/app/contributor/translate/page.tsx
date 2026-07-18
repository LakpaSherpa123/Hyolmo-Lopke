"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send, Languages, Info, ArrowLeft, Loader2, Play, Square, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { suggestScripts } from "@/ai/flows/translation-copilot";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TranslateSubmissionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [region, setRegion] = useState("helambu");
  
  // Script State
  const [devanagari, setDevanagari] = useState("");
  const [tibetan, setTibetan] = useState("");
  const [romanization, setRomanization] = useState("");

  // Audio State
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const { toast } = useToast();

  const handleAiCopilot = async () => {
    if (!devanagari) {
      toast({ title: "Input needed", description: "Please enter Devanagari first." });
      return;
    }
    setIsAiLoading(true);
    try {
      const result = await suggestScripts({ hyolmoDevanagari: devanagari });
      setTibetan(result.tibetanScript);
      setRomanization(result.romanization);
      toast({ title: "Drafts generated!", description: "AI suggested Tibetan and Romanization scripts." });
    } catch (error) {
      toast({ variant: "destructive", title: "AI Error", description: "Could not generate drafts." });
    } finally {
      setIsAiLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/ogg; codecs=opus" });
        setAudioUrl(URL.createObjectURL(blob));
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      toast({ variant: "destructive", title: "Mic Error", description: "Could not access microphone." });
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Submission Sent!",
        description: "Your translation has been sent to the verification queue.",
      });
      // Reset form
      setDevanagari("");
      setTibetan("");
      setRomanization("");
      setAudioUrl(null);
    }, 1500);
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/contributor/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Translation Workbench</h1>
        </div>
        <div className="flex items-center gap-2 bg-secondary p-2 rounded-lg">
          <MapPin className="h-4 w-4 text-primary" />
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px] border-none shadow-none bg-transparent">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="helambu">Helambu (Standard)</SelectItem>
              <SelectItem value="melamchi">Melamchi Valley</SelectItem>
              <SelectItem value="lamjung">Lamjung District</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Reference */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">Seed Prompt</CardTitle>
              <CardDescription>Use this English and Nepali context for your translation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-xs text-muted-foreground">English Base</Label>
                <p className="text-2xl font-bold">Where is the nearest water source?</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Nepali Base</Label>
                <p className="text-2xl font-medium">सबैभन्दा नजिकको पानीको मुहान कहाँ छ?</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg text-blue-700 text-sm border border-blue-100">
            <Info className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p><strong>Guideline:</strong> Focus on colloquial Helambu dialect if possible.</p>
              <p>The AI Copilot can help you with Tibetan script and phonetics once you enter the Devanagari.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Workbench */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Hyolmo Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="devanagari">Hyolmo (Devanagari)</Label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary gap-1"
                    onClick={handleAiCopilot}
                    disabled={isAiLoading || !devanagari}
                  >
                    {isAiLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    AI Suggest Scripts
                  </Button>
                </div>
                <Input 
                  id="devanagari" 
                  value={devanagari}
                  onChange={(e) => setDevanagari(e.target.value)}
                  placeholder="Enter Devanagari here..." 
                  className="h-12 text-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tibetan">Tibetan (Sambhota)</Label>
                  <Input 
                    id="tibetan" 
                    value={tibetan}
                    onChange={(e) => setTibetan(e.target.value)}
                    placeholder="Tibetan Script..." 
                    className="h-12 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roman">Phonetic Romanization</Label>
                  <Input 
                    id="roman" 
                    value={romanization}
                    onChange={(e) => setRomanization(e.target.value)}
                    placeholder="e.g., ta-shi de-lek" 
                    className="h-12"
                  />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Label>Audio Capture</Label>
                <div className="flex items-center gap-4">
                  <Button 
                    type="button" 
                    variant={isRecording ? "destructive" : "outline"}
                    className="h-14 w-14 rounded-full animate-in fade-in"
                    onClick={isRecording ? stopRecording : startRecording}
                  >
                    {isRecording ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </Button>
                  <div className="flex-1">
                    {isRecording ? (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                        <span className="text-sm font-medium">Recording Audio...</span>
                      </div>
                    ) : audioUrl ? (
                      <div className="flex items-center gap-2">
                        <Button type="button" size="sm" variant="secondary" onClick={() => new Audio(audioUrl).play()}>
                          <Play className="h-4 w-4 mr-2" />
                          Listen to Capture
                        </Button>
                        <Button type="button" size="sm" variant="ghost" onClick={() => setAudioUrl(null)}>Retake</Button>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">Click mic to record pronunciation.</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardContent className="pt-0">
               <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit to Peer Review
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
