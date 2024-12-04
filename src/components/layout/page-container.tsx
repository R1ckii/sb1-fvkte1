import { cn } from '@/lib/utils';
import { TopBar } from './top-bar';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main 
        className={cn(
          "pt-14 pb-6",
          "min-h-[calc(100vh-3.5rem)]",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}