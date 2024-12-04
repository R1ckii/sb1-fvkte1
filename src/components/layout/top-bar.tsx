import { Logo } from '@/components/ui/logo';
import { UserProfile } from '@/components/user/user-profile';
import { cn } from '@/lib/utils';

interface TopBarProps {
  className?: string;
}

export function TopBar({ className }: TopBarProps) {
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "h-14 px-4 bg-primary/95 backdrop-blur-sm",
        "flex items-center justify-between",
        "border-b border-white/10",
        "shadow-sm",
        className
      )}
    >
      <Logo variant="white" size="sm" />
      <UserProfile />
    </header>
  );
}