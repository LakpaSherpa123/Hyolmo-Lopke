"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send, Languages, Info, History, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function TranslateSubmissionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Submission Sent!",
        description: "Your translation has been sent to the verification queue.",
      });
    }, 1500);
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/contributor/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Contribute</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Translate a Prompt</CardTitle>
          <CardDescription>
            Provide the Hyolmo equivalent for the following English and Nepali text.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Languages className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Reference Prompt</span>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">English</Label>
                  <p className="text-lg font-semibold">Where can I find fresh water?</p>
                </div>
                <div className="pt-2">
                  <Label className="text-xs text-muted-foreground">Nepali</Label>
                  <p className="text-lg font-medium">मैले ताजा पानी कहाँ पाउन सक्छु?</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hyolmo-text">Hyolmo Translation</Label>
                <Textarea 
                  id="hyolmo-text" 
                  placeholder="Enter the Hyolmo text here..." 
                  className="min-h-[100px] text-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Pronunciation Recording</Label>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" className="flex-1 h-12 gap-2">
                    <Mic className="h-4 w-4" />
                    Record Audio
                  </Button>
                  <p className="text-xs text-muted-foreground flex items-center">
                    Optional but highly recommended for quality.
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit for Verification
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg text-blue-700 text-sm">
        <Info className="h-5 w-5 shrink-0 mt-0.5" />
        <p>
          <strong>Quality Note:</strong> Most Hyolmo speakers use Tibetan script for formal writing. If you're unsure of the spelling, provide a phonetic Romanized version in the notes.
        </p>
      </div>
    </div>
  );
}
