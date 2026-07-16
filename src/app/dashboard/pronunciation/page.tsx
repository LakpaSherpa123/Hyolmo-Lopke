import { PronunciationPractice } from "@/components/pronunciation/PronunciationPractice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function PronunciationPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Pronunciation Practice</h1>
        <p className="text-muted-foreground">
          Use our AI tutor to perfect your Sherpa accent.
        </p>
      </div>
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>How it works</AlertTitle>
        <AlertDescription>
          Select a phrase, click the microphone to record your pronunciation, and get instant feedback and a score from our AI.
        </AlertDescription>
      </Alert>
      <PronunciationPractice />
    </div>
  );
}
