import { useUser } from '@/contexts/user-context';
import { UserAvatar } from './user-avatar';

export function UserProfile() {
  const user = useUser();
  
  return (
    <div className="flex items-center gap-3">
      <p className="text-sm font-medium text-white">
        {user.name}
      </p>
      <UserAvatar />
    </div>
  );
}