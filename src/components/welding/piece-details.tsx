import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn, formatPieceStatus, getPieceStatusColor } from '@/lib/utils';
import { WeldingPiece } from '@/lib/types/welding';

interface PieceDetailsProps {
  piece: WeldingPiece;
}

export function PieceDetails({ piece }: PieceDetailsProps) {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary font-nunito">Détails de la pièce</h2>
        <Badge variant="outline" className={cn("px-2 py-1", getPieceStatusColor(piece.status))}>
          {formatPieceStatus(piece.status)}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-sm text-textSecondary font-nunito">ID</span>
          <span className="font-medium text-primary font-nunito">{piece.id}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-sm text-textSecondary font-nunito">Projet</span>
          <span className="font-medium text-primary font-nunito">{piece.projectNumber}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-sm text-textSecondary font-nunito">Division</span>
          <span className="font-medium text-primary font-nunito">{piece.division}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-textSecondary font-nunito">Nom</span>
          <span className="font-medium text-primary font-nunito">{piece.name}</span>
        </div>
      </div>
    </Card>
  );
}