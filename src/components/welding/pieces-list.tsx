import { WeldingPiece } from '@/lib/types/welding';
import { cn, formatPieceStatus, getPieceStatusColor } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Scan } from 'lucide-react';

interface PiecesListProps {
  pieces: WeldingPiece[];
  selectedPieceId: string | null;
  onPieceSelect: (piece: WeldingPiece) => void;
  onScanClick?: () => void;
}

export function PiecesList({ pieces, selectedPieceId, onPieceSelect, onScanClick }: PiecesListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary font-nunito">
          Pièces scannées ({pieces.length})
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onScanClick}
        >
          <Scan className="h-4 w-4" />
          Scanner
        </Button>
      </div>
      <div className="space-y-2">
        {pieces.map((piece) => (
          <button
            key={piece.id}
            onClick={() => onPieceSelect(piece)}
            className={cn(
              "w-full p-4 rounded-lg border transition-all duration-200",
              "hover:border-primary/20 hover:bg-primary/5",
              "text-left",
              selectedPieceId === piece.id
                ? "border-primary/30 bg-primary/10"
                : "border-gray-200 bg-white"
            )}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-primary">{piece.id}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      getPieceStatusColor(piece.status),
                      "text-white"
                    )}>
                      {formatPieceStatus(piece.status)}
                    </span>
                  </div>
                  <p className="text-sm text-textSecondary">{piece.name}</p>
                </div>
                <span className="text-xs text-textSecondary">
                  {format(new Date(piece.scannedAt), "d MMM yyyy 'à' HH:mm", { locale: fr })}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="space-y-0.5">
                  <span className="text-textSecondary">Projet</span>
                  <p className="font-medium text-primary">{piece.projectNumber}</p>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="space-y-0.5">
                  <span className="text-textSecondary">Division</span>
                  <p className="font-medium text-primary">{piece.division}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
