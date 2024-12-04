import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RNC } from '@/lib/types/welding';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

interface RNCListProps {
  rncs: RNC[];
}

export function RNCList({ rncs }: RNCListProps) {
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
        <Dialog key={rnc.id}>
          <DialogTrigger asChild>
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
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                RNC-{rnc.id}
                <Badge variant={rnc.status === 'open' ? 'destructive' : 'secondary'}>
                  {rnc.status === 'open' ? 'Ouvert' : 'Fermé'}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <h4 className="text-base font-medium">Cause</h4>
                <p className="text-primary">{rnc.cause}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-base font-medium">Description</h4>
                <p className="text-primary whitespace-pre-wrap">{rnc.description}</p>
              </div>
              {rnc.reference && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="text-base font-medium">Référence</h4>
                    <p className="text-primary">{rnc.reference}</p>
                  </div>
                </>
              )}
              <Separator />
              <div className="space-y-4">
                <h4 className="text-base font-medium">Événements</h4>
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
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
