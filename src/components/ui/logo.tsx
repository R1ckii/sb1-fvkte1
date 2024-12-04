import { cn } from '@/lib/utils';
import logoAdf from '@/assets/logo-adf-bleu.png';

interface LogoProps {
  size?: 'sm' | 'lg';
  variant?: 'default' | 'white';
  className?: string;
}

export function Logo({ size = 'lg', variant = 'default', className }: LogoProps) {
  return (
    <div className={cn(
      "flex items-center justify-center",
      className
    )}>
      <img 
        src={logoAdf} 
        alt="ADF Logo"
        className={cn(
          "h-auto transition-all duration-200",
          size === 'lg' ? "w-48" : "w-16", // Reduced from w-24 to w-16 for even smaller topbar logo
          variant === 'white' ? "brightness-0 invert" : "brightness-100"
        )}
      />
    </div>
  );
}