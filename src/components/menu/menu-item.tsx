import { Icon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  icon: Icon;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function MenuItem({ icon: IconComponent, label, onClick, className }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center w-full h-full",
        "bg-white rounded-xl p-2.5",
        "transition-all duration-200",
        "hover:scale-[1.02] hover:shadow-md hover:bg-primary/5",
        "active:scale-[0.98]",
        "shadow-sm shadow-primary/5", // Reduced shadow intensity
        "border border-primary/10",
        className
      )}
    >
      <div className="relative flex items-center justify-center w-full mb-2">
        <IconComponent 
          size={32}
          weight="duotone"
          className="text-primary"
        />
      </div>
      <div className="w-full">
        <p className="text-xs font-[500] text-primary text-center leading-tight font-nunito">
          {label}
        </p>
      </div>
    </button>
  );
}