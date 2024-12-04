import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RNCFormData } from '@/lib/types/welding';
import { useUser } from '@/contexts/user-context';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface RNCFormProps {
  pieceId: string;
  onSubmit: (data: RNCFormData) => void;
}

export function RNCForm({ pieceId, onSubmit }: RNCFormProps) {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const { error } = useToast();
  const [formData, setFormData] = useState<RNCFormData>({
    pieceId,
    cause: '',
    description: '',
    reference: '',
    createdBy: user.name,
  });

  // Update formData when pieceId changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      pieceId, // Update the pieceId while preserving other form data
    }));
  }, [pieceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cause.trim() || !formData.description.trim()) {
      error({
        title: 'Champs requis',
        description: 'Veuillez remplir tous les champs obligatoires'
      });
      return;
    }
    onSubmit(formData);
    setOpen(false);
    setFormData({ ...formData, cause: '', description: '', reference: '' });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh] rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Nouvel événement</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="cause" className="text-base">
              Cause <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cause"
              value={formData.cause}
              onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
              placeholder="Ex: Dimension hors tolérance"
              className="h-12"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez en détail la non-conformité observée"
              className="min-h-[150px] resize-none"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference" className="text-base">
              Référence
            </Label>
            <Input
              id="reference"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              placeholder="Ex: NCR-2024-001"
              className="h-12"
            />
          </div>
          <div className="flex gap-3 pt-4 sticky bottom-0 bg-background pb-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" className="flex-1 h-12">
              Créer le RNC
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
