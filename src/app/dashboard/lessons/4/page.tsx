
"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Volume2, ArrowRight, Loader2 } from "lucide-react";
import Link from 'next/link';
import { getSpokenText } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';

const numbers = [
    { sherpa: "གཅིག", english: "1 (One)", pronunciation: "chik" },
    { sherpa: "གཉིས", english: "2 (Two)", pronunciation: "nyi" },
    { sherpa: "གསུམ", english: "3 (Three)", pronunciation: "sum" },
    { sherpa: "བཞི", english: "4 (Four)", pronunciation: "zhi" },
    { sherpa: "ལྔ", english: "5 (Five)", pronunciation: "nga" },
    { sherpa: "དྲུག", english: "6 (Six)", pronunciation: "truk" },
    { sherpa: "བདུན", english: "7 (Seven)", pronunciation: "dün" },
    { sherpa: "བརྒྱད", english: "8 (Eight)", pronunciation: "gyé" },
    { sherpa: "དགུ", english: "9 (Nine)", pronunciation: "gu" },
    { sherpa: "བཅུ", english: "10 (Ten)", pronunciation: "chu" },
    { sherpa: "བཅུ་གཅིག", english: "11 (Eleven)", pronunciation: "chuk chik" },
    { sherpa: "བཅུ་གཉིས", english: "12 (Twelve)", pronunciation: "chuk nyi" },
    { sherpa: "བཅུ་གསུམ", english: "13 (Thirteen)", pronunciation: "chuk sum" },
    { sherpa: "བཅུ་བཞི", english: "14 (Fourteen)", pronunciation: "chu zhi" },
    { sherpa: "བཅོ་ལྔ", english: "15 (Fifteen)", pronunciation: "chö nga" },
    { sherpa: "བཅུ་དྲུག", english: "16 (Sixteen)", pronunciation: "chu truk" },
    { sherpa: "བཅུ་བདུན", english: "17 (Seventeen)", pronunciation: "chu dün" },
    { sherpa: "བཅོ་བརྒྱད", english: "18 (Eighteen)", pronunciation: "chob gyé" },
    { sherpa: "བཅུ་དགུ", english: "19 (Nineteen)", pronunciation: "chu gu" },
    { sherpa: "ཉི་ཤུ", english: "20 (Twenty)", pronunciation: "nyi shu" },
    { sherpa: "ཉི་ཤུ་རྩ་གཅིག", english: "21 (Twenty-one)", pronunciation: "nyi shu tsa chik" },
    { sherpa: "ཉི་ཤུ་རྩ་གཉིས", english: "22 (Twenty-two)", pronunciation: "nyi shu tsa nyi" },
    { sherpa: "ཉི་ཤུ་རྩ་གསུམ", english: "23 (Twenty-three)", pronunciation: "nyi shu tsa sum" },
    { sherpa: "ཉི་ཤུ་རྩ་བཞི", english: "24 (Twenty-four)", pronunciation: "nyi shu tsa zhi" },
    { sherpa: "ཉི་ཤུ་རྩ་ལྔ", english: "25 (Twenty-five)", pronunciation: "nyi shu tsa nga" },
    { sherpa: "ཉི་ཤུ་རྩ་དྲུག", english: "26 (Twenty-six)", pronunciation: "nyi shu tsa truk" },
    { sherpa: "ཉི་ཤུ་རྩ་བདུན", english: "27 (Twenty-seven)", pronunciation: "nyi shu tsa dün" },
    { sherpa: "ཉི་ཤུ་རྩ་བརྒྱད", english: "28 (Twenty-eight)", pronunciation: "nyi shu tsa gyé" },
    { sherpa: "ཉི་ཤུ་རྩ་དགུ", english: "29 (Twenty-nine)", pronunciation: "nyi shu tsa gu" },
    { sherpa: "སུམ་ཅུ", english: "30 (Thirty)", pronunciation: "sum chu" },
    { sherpa: "སུམ་ཅུ་སོ་གཅིག", english: "31 (Thirty-one)", pronunciation: "sum chu so chik" },
    { sherpa: "སུམ་ཅུ་སོ་གཉིས", english: "32 (Thirty-two)", pronunciation: "sum chu so nyi" },
    { sherpa: "སུམ་ཅུ་སོ་གསུམ", english: "33 (Thirty-three)", pronunciation: "sum chu so sum" },
    { sherpa: "སུམ་ཅུ་སོ་བཞི", english: "34 (Thirty-four)", pronunciation: "sum chu so zhi" },
    { sherpa: "སུམ་ཅུ་སོ་ལྔ", english: "35 (Thirty-five)", pronunciation: "sum chu so nga" },
    { sherpa: "སུམ་ཅུ་སོ་དྲུག", english: "36 (Thirty-six)", pronunciation: "sum chu so truk" },
    { sherpa: "སུམ་ཅུ་སོ་བདུན", english: "37 (Thirty-seven)", pronunciation: "sum chu so dün" },
    { sherpa: "སུམ་ཅུ་སོ་བརྒྱད", english: "38 (Thirty-eight)", pronunciation: "sum chu so gyé" },
    { sherpa: "སུམ་ཅུ་སོ་དགུ", english: "39 (Thirty-nine)", pronunciation: "sum chu so gu" },
    { sherpa: "བཞི་བཅུ", english: "40 (Forty)", pronunciation: "zhi chu" },
    { sherpa: "བཞི་བཅུ་ཞེ་གཅིག", english: "41 (Forty-one)", pronunciation: "zhi chu zhe chik" },
    { sherpa: "བཞི་བཅུ་ཞེ་གཉིས", english: "42 (Forty-two)", pronunciation: "zhi chu zhe nyi" },
    { sherpa: "བཞི་བཅུ་ཞེ་གསུམ", english: "43 (Forty-three)", pronunciation: "zhi chu zhe sum" },
    { sherpa: "བཞི་བཅུ་ཞེ་བཞི", english: "44 (Forty-four)", pronunciation: "zhi chu zhe zhi" },
    { sherpa: "བཞི་བཅུ་ཞེ་ལྔ", english: "45 (Forty-five)", pronunciation: "zhi chu zhe nga" },
    { sherpa: "བཞི་བཅུ་ཞེ་དྲུག", english: "46 (Forty-six)", pronunciation: "zhi chu zhe truk" },
    { sherpa: "བཞི་བཅུ་ཞེ་བདུན", english: "47 (Forty-seven)", pronunciation: "zhi chu zhe dün" },
    { sherpa: "བཞི་བཅུ་ཞེ་བརྒྱད", english: "48 (Forty-eight)", pronunciation: "zhi chu zhe gyé" },
    { sherpa: "བཞི་བཅུ་ཞེ་དགུ", english: "49 (Forty-nine)", pronunciation: "zhi chu zhe gu" },
    { sherpa: "ལྔ་བཅུ", english: "50 (Fifty)", pronunciation: "nga chu" },
    { sherpa: "ལྔ་བཅུ་ང་གཅིག", english: "51 (Fifty-one)", pronunciation: "nga chu nga chik" },
    { sherpa: "ལྔ་བཅུ་ང་གཉིས", english: "52 (Fifty-two)", pronunciation: "nga chu nga nyi" },
    { sherpa: "ལྔ་བཅུ་ང་གསུམ", english: "53 (Fifty-three)", pronunciation: "nga chu nga sum" },
    { sherpa: "ལྔ་བཅུ་ང་བཞི", english: "54 (Fifty-four)", pronunciation: "nga chu nga zhi" },
    { sherpa: "ལྔ་བཅུ་ང་ལྔ", english: "55 (Fifty-five)", pronunciation: "nga chu nga nga" },
    { sherpa: "ལྔ་བཅུ་ང་དྲུག", english: "56 (Fifty-six)", pronunciation: "nga chu nga truk" },
    { sherpa: "ལྔ་བཅུ་ང་བདུན", english: "57 (Fifty-seven)", pronunciation: "nga chu nga dün" },
    { sherpa: "ལྔ་བཅུ་ང་བརྒྱད", english: "58 (Fifty-eight)", pronunciation: "nga chu nga gyé" },
    { sherpa: "ལྔ་བཅུ་ང་དགུ", english: "59 (Fifty-nine)", pronunciation: "nga chu nga gu" },
    { sherpa: "དྲུག་ཅུ", english: "60 (Sixty)", pronunciation: "truk chu" },
    { sherpa: "དྲུག་ཅུ་རེ་གཅིག", english: "61 (Sixty-one)", pronunciation: "truk chu re chik" },
    { sherpa: "དྲུག་ཅུ་རེ་གཉིས", english: "62 (Sixty-two)", pronunciation: "truk chu re nyi" },
    { sherpa: "དྲུག་ཅུ་རེ་གསུམ", english: "63 (Sixty-three)", pronunciation: "truk chu re sum" },
    { sherpa: "དྲུག་ཅུ་རེ་བཞི", english: "64 (Sixty-four)", pronunciation: "truk chu re zhi" },
    { sherpa: "དྲུག་ཅུ་རེ་ལྔ", english: "65 (Sixty-five)", pronunciation: "truk chu re nga" },
    { sherpa: "དྲུག་ཅུ་རེ་དྲུག", english: "66 (Sixty-six)", pronunciation: "truk chu re truk" },
    { sherpa: "དྲུག་ཅུ་རེ་བདུན", english: "67 (Sixty-seven)", pronunciation: "truk chu re dün" },
    { sherpa: "དྲུག་ཅུ་རེ་བརྒྱད", english: "68 (Sixty-eight)", pronunciation: "truk chu re gyé" },
    { sherpa: "དྲུག་ཅུ་རེ་དགུ", english: "69 (Sixty-nine)", pronunciation: "truk chu re gu" },
    { sherpa: "བདུན་ཅུ", english: "70 (Seventy)", pronunciation: "dün chu" },
    { sherpa: "བདུན་ཅུ་དོན་གཅིག", english: "71 (Seventy-one)", pronunciation: "dün chu dön chik" },
    { sherpa: "བདུན་ཅུ་དོན་གཉིས", english: "72 (Seventy-two)", pronunciation: "dün chu dön nyi" },
    { sherpa: "བདུན་ཅུ་དོན་གསུམ", english: "73 (Seventy-three)", pronunciation: "dün chu dön sum" },
    { sherpa: "བདུན་ཅུ་དོན་བཞི", english: "74 (Seventy-four)", pronunciation: "dün chu dön zhi" },
    { sherpa: "བདུན་ཅུ་དོན་ལྔ", english: "75 (Seventy-five)", pronunciation: "dün chu dön nga" },
    { sherpa: "བདུན་ཅུ་དོན་དྲུག", english: "76 (Seventy-six)", pronunciation: "dün chu dön truk" },
    { sherpa: "བདུན་ཅུ་དོན་བདུན", english: "77 (Seventy-seven)", pronunciation: "dün chu dön dün" },
    { sherpa: "བདུན་ཅུ་དོན་བརྒྱད", english: "78 (Seventy-eight)", pronunciation: "dün chu dön gyé" },
    { sherpa: "བདུན་ཅུ་དོན་དགུ", english: "79 (Seventy-nine)", pronunciation: "dün chu dön gu" },
    { sherpa: "བརྒྱད་ཅུ", english: "80 (Eighty)", pronunciation: "gyé chu" },
    { sherpa: "བརྒྱད་ཅུ་གྱ་གཅིག", english: "81 (Eighty-one)", pronunciation: "gyé chu gya chik" },
    { sherpa: "བརྒྱད་ཅུ་གྱ་གཉིས", english: "82 (Eighty-two)", pronunciation: "gyé chu gya nyi" },
    { sherpa: "བརྒྱད་ཅུ་གྱ་གསུམ", english: "83 (Eighty-three)", pronunciation: "gyé chu gya sum" },
    { sherpa: "བརྒྱད་ཅུ་གྱ་བཞི", english: "84 (Eighty-four)", pronunciation: "gyé chu gya zhi" },
    { sherpa: "བརྒྱད་ཅུ་གྱ་ལྔ", english: "85 (Eighty-five)", pronunciation: "gyé chu gya nga" },
    { sherpa: "བརྒྱད་ཅུ་གྱ་དྲུག", english: "86 (Eighty-six)", pronunciation: "gyé chu gya truk" },
    { sherpa: "བརྒྱད་ཅུ་གྱ་བདུན", english: "87 (Eighty-seven)", pronunciation: "gyé chu gya dün" },
    { sherpa: "བརྒྱད་ཅུ་གྱ་བརྒྱད", english: "88 (Eighty-eight)", pronunciation: "gyé chu gya gyé" },
    { sherpa: "བརྒྱད་ཅུ་གྱ་དགུ", english: "89 (Eighty-nine)", pronunciation: "gyé chu gya gu" },
    { sherpa: "དགུ་བཅུ", english: "90 (Ninety)", pronunciation: "gu chu" },
    { sherpa: "དགུ་བཅུ་གོ་གཅིག", english: "91 (Ninety-one)", pronunciation: "gu chu go chik" },
    { sherpa: "དགུ་བཅུ་གོ་གཉིས", english: "92 (Ninety-two)", pronunciation: "gu chu go nyi" },
    { sherpa: "དགུ་བཅུ་གོ་གསུམ", english: "93 (Ninety-three)", pronunciation: "gu chu go sum" },
    { sherpa: "དགུ་བཅུ་གོ་བཞི", english: "94 (Ninety-four)", pronunciation: "gu chu go zhi" },
    { sherpa: "དགུ་བཅུ་གོ་ལྔ", english: "95 (Ninety-five)", pronunciation: "gu chu go nga" },
    { sherpa: "དགུ་བཅུ་གོ་དྲུག", english: "96 (Ninety-six)", pronunciation: "gu chu go truk" },
    { sherpa: "དགུ་བཅུ་གོ་བདུན", english: "97 (Ninety-seven)", pronunciation: "gu chu go dün" },
    { sherpa: "དགུ་བཅུ་གོ་བརྒྱད", english: "98 (Ninety-eight)", pronunciation: "gu chu go gyé" },
    { sherpa: "དགུ་བཅུ་གོ་དགུ", english: "99 (Ninety-nine)", pronunciation: "gu chu go gu" },
    { sherpa: "བརྒྱ", english: "100 (One Hundred)", pronunciation: "gya" },
];

export default function LessonFourPage() {
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
          <h1 className="text-3xl font-bold tracking-tight font-headline">Lesson 4: Numbers & Counting</h1>
          <p className="text-muted-foreground">Learn how to count from 1 to 100 in Sherpa.</p>
        </div>
        <Button asChild>
            <Link href="#">
                Practice with a Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>

       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {numbers.map((item, index) => (
            <Card key={index} className="flex flex-col">
                <CardContent className="p-4 flex-1 flex flex-col items-center justify-center text-center">
                    <p className="text-3xl font-bold">{item.sherpa}</p>
                    <p className="text-sm text-muted-foreground mt-2">{item.english}</p>
                    <p className="text-xs text-muted-foreground/80 italic">({item.pronunciation})</p>
                </CardContent>
                <div className="p-2 border-t">
                     <Button variant="ghost" size="sm" className="w-full" onClick={() => handlePlaySound(item.sherpa)} disabled={!!loadingAudio}>
                        {loadingAudio === item.sherpa ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Volume2 className="h-4 w-4" />
                        )}
                        <span className="ml-2">Listen</span>
                    </Button>
                </div>
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
