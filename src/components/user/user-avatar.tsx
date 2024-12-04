import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/contexts/user-context';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  className?: string;
}

export function UserAvatar({ className }: UserAvatarProps) {
  const user = useUser();

  return (
    <Avatar 
      className={cn(
        "h-9 w-9 border-2 border-white/20",
        "transition-all duration-200 hover:scale-105",
        "cursor-pointer shadow-sm",
        className
      )}
    >
      <AvatarImage 
        src={user.image} 
        alt={user.name}
        className="object-cover"
      />
      <AvatarFallback className="bg-secondary text-white">
        {user.name.split(' ').map(n => n[0]).join('')}
      </AvatarFallback>
    </Avatar>
  );
}