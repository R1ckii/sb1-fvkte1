import { useState } from 'react';
import { WeldingPiece, InspectionActionType } from '../../lib/types/welding';
import { InspectionActions, actionIcons } from './inspection-actions';
import { Card, CardContent } from '../ui/card';
import { cn, getPieceStatusColor, formatPieceStatus } from '../../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PieceCardProps {
  piece: WeldingPiece;
  isSelected: boolean;
  onClick: (piece: WeldingPiece) => void;
  onInspectionAction?: (pieceId: string, actionType: InspectionActionType) => void;
  onDeleteInspection?: (pieceId: string, actionType: InspectionActionType, date: string) => void;
}

export function PieceCard({ 
  piece, 
  isSelected, 
  onClick, 
  onInspectionAction,
  onDeleteInspection 
}: PieceCardProps) {
  const [showActions, setShowActions] = useState(false);

  const handleClick = () => {
    onClick(piece);
    setShowActions(!showActions);
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isSelected && "border-primary"
      )}
      onClick={handleClick}
    >
      <CardContent className={cn(
        "p-4 transition-all duration-200",
        showActions && isSelected && "pb-6"
      )}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{piece.name}</h3>
            <p className="text-sm text-gray-500">{piece.id}</p>
            <p className="text-sm text-gray-500">
              {piece.projectNumber} - {piece.division}
            </p>
            {piece.inspectionHistory.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {piece.inspectionHistory.map((inspection, index) => {
                  const Icon = actionIcons[inspection.type];
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-1 text-xs text-gray-600"
                      title={format(new Date(inspection.date), 'PPP à HH:mm', { locale: fr })}
                    >
                      <Icon weight="duotone" className="h-4 w-4 text-primary" />
                      <span>{format(new Date(inspection.date), 'dd/MM')}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium text-white",
            getPieceStatusColor(piece.status)
          )}>
            {formatPieceStatus(piece.status)}
          </span>
        </div>
        {showActions && isSelected && onInspectionAction && (
          <div className="mt-4 pt-4 border-t">
            <InspectionActions 
              status={piece.status} 
              pieceId={piece.id}
              inspectionHistory={piece.inspectionHistory}
              onAction={onInspectionAction}
              onDeleteAction={onDeleteInspection}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
