import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { STATUS_INFO } from '@/lib/utils';
import { Info } from '@phosphor-icons/react';

export function StatusLegend() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg"
        >
          <Info weight="duotone" className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-nunito">Légende des statuts</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {Object.entries(STATUS_INFO).map(([status, info]) => (
            <div key={status} className="flex items-start space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${info.color}`} />
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium">
                  {status}
                </code>
              </div>
              <div>
                <h3 className="font-medium text-primary font-nunito">{info.label}</h3>
                <p className="text-sm text-textSecondary font-nunito">{info.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}