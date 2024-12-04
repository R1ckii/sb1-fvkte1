import { createContext, useContext, ReactNode } from 'react';
import { User } from '@/lib/types/user';
import christineImage from '@/assets/christine.png';

const defaultUser: User = {
  id: '1',
  name: 'Christine Dalle-Vedove',
  image: christineImage,
};

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <UserContext.Provider value={defaultUser}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}