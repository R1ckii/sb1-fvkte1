import { useState } from 'react';
import { WeldingPiece, InspectionActionType, RNC, RNCFormData } from '../../lib/types/welding';
import { InspectionActions, actionIcons } from './inspection-actions';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn, getPieceStatusColor, formatPieceStatus } from '../../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RNCList } from './rnc/rnc-list';
import { RNCForm } from './rnc/rnc-form';

interface PieceCardProps {
  piece: WeldingPiece;
  rncs: RNC[];
  isSelected: boolean;
  onClick: (piece: WeldingPiece) => void;
  onInspectionAction?: (pieceId: string, actionType: InspectionActionType) => void;
  onDeleteInspection?: (pieceId: string, actionType: InspectionActionType, date: string) => void;
  onRNCSubmit?: (data: RNCFormData) => void;
}

const isPieceConform = (piece: WeldingPiece, rncs: RNC[]): boolean => {
  // Check if there are any RNCs for this piece
  if (rncs.length > 0) {
    return false;
  }
  // Also check if all inspections are conform
  return piece.inspectionHistory?.every(inspection => inspection.isConform !== false) ?? true;
};

export function PieceCard({ 
  piece, 
  rncs,
  isSelected, 
  onClick, 
  onInspectionAction,
  onDeleteInspection,
  onRNCSubmit
}: PieceCardProps) {
  const [showActions, setShowActions] = useState(false);
  const isConform = isPieceConform(piece, rncs);

  const handleClick = () => {
    onClick(piece);
    setShowActions(!showActions);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't toggle if clicking:
    // 1. Inside the actions content
    // 2. Inside any dialog/sheet/modal
    // 3. Inside any form elements
    if (
      target.closest('.actions-content') !== null ||
      target.closest('[role="dialog"]') !== null ||
      target.closest('form') !== null ||
      target.closest('button') !== null ||
      target.closest('input') !== null ||
      target.closest('select') !== null ||
      target.closest('textarea') !== null
    ) {
      return;
    }
    handleClick();
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isSelected && "border-primary"
      )}
      onClick={handleCardClick}
    >
      <CardContent className={cn(
        "p-4 transition-all duration-200",
        showActions && isSelected && "pb-6"
      )}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{piece.name}</h3>
              {isConform && (
                <Badge 
                  variant="default"
                  className="bg-green-600 hover:bg-green-600/80"
                >
                  Conforme
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">{piece.id}</p>
            <p className="text-sm text-gray-500">
              {piece.projectNumber} - {piece.division}
            </p>
            {piece.inspectionHistory?.length > 0 && (
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
        {showActions && isSelected && (
          <div className="mt-4 space-y-4 actions-content">
            {onInspectionAction && (
              <div className="pt-4 border-t">
                <InspectionActions 
                  status={piece.status} 
                  pieceId={piece.id}
                  inspectionHistory={piece.inspectionHistory || []}
                  onAction={onInspectionAction}
                  onDeleteAction={onDeleteInspection}
                />
              </div>
            )}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-primary font-nunito">
                  Événements
                </h2>
                {onRNCSubmit && <RNCForm pieceId={piece.id} onSubmit={onRNCSubmit} />}
              </div>
              <RNCList rncs={rncs} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
