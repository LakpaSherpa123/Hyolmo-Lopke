import { Mountain } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  isCollapsed?: boolean;
  isSherpaLearn?: boolean;
};

export function Logo({ className, isCollapsed = false, isSherpaLearn = false }: LogoProps) {
  const logoText = isSherpaLearn ? "PeakSpeak" : "Hyolmo Lopke";
  const logoIconColor = isSherpaLearn ? "text-primary" : "text-accent";
  
  return (
    <Link href={isSherpaLearn ? "/" : "/dashboard"} className={cn("flex items-center gap-2", className)}>
      <div className={cn("p-1 rounded-md", isSherpaLearn ? "bg-primary" : "")}>
        <Mountain className={cn("size-6", isSherpaLearn ? "text-primary-foreground" : logoIconColor)} />
      </div>
      {!isCollapsed && (
        <span className={cn("text-lg font-bold", isSherpaLearn ? "text-foreground" : "text-sidebar-foreground")}>
          {logoText}
        </span>
      )}
    </Link>
  );
}
