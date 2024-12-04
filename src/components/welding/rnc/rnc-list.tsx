import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RNC } from '@/lib/types/welding';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

interface RNCListProps {
  rncs: RNC[];
  onAddEvent?: (rncId: string, description: string) => void;
}

export function RNCList({ rncs, onAddEvent }: RNCListProps) {
  if (rncs.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-textSecondary">Aucun événement</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {rncs.map((rnc) => (
        <Sheet key={rnc.id}>
          <SheetTrigger asChild>
            <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-primary">RNC-{rnc.id}</h3>
                    <Badge variant={rnc.status === 'open' ? 'destructive' : 'secondary'}>
                      {rnc.status === 'open' ? 'Ouvert' : 'Fermé'}
                    </Badge>
                  </div>
                  <p className="text-sm text-textSecondary line-clamp-2">{rnc.description}</p>
                  <p className="text-xs text-textSecondary">
                    {format(new Date(rnc.createdAt), "d MMM yyyy 'à' HH:mm", { locale: fr })}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 mt-1" />
              </div>
            </Card>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh] rounded-t-xl">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-3">
                RNC-{rnc.id}
                <Badge variant={rnc.status === 'open' ? 'destructive' : 'secondary'}>
                  {rnc.status === 'open' ? 'Ouvert' : 'Fermé'}
                </Badge>
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100%-5rem)] mt-6 pr-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-sm text-textSecondary mb-1">Cause</h4>
                  <p className="text-primary">{rnc.cause}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm text-textSecondary mb-1">Description</h4>
                  <p className="text-primary whitespace-pre-wrap">{rnc.description}</p>
                </div>
                {rnc.reference && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-sm text-textSecondary mb-1">Référence</h4>
                      <p className="text-primary">{rnc.reference}</p>
                    </div>
                  </>
                )}
                <Separator />
                <div>
                  <h4 className="font-medium text-sm text-textSecondary mb-3">Événements</h4>
                  <div className="space-y-4">
                    {rnc.events.map((event, index) => (
                      <div key={event.id} className="relative pl-4">
                        {index !== rnc.events.length - 1 && (
                          <div className="absolute left-[7px] top-4 bottom-0 w-[2px] bg-gray-200" />
                        )}
                        <div className="flex gap-3">
                          <div className="w-3 h-3 rounded-full bg-primary mt-1.5 shrink-0" />
                          <div className="space-y-1">
                            <p className="text-primary">{event.description}</p>
                            <p className="text-xs text-textSecondary">
                              {event.createdBy} - {format(new Date(event.createdAt), "d MMM yyyy 'à' HH:mm", { locale: fr })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}