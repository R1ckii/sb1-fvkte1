import { useToast } from '../../hooks/use-toast';
import { Button } from '../ui/button';
import { PieceStatus, InspectionAction, InspectionActionType, InspectionHistory } from '../../lib/types/welding';
import { 
  Ruler, 
  Eye, 
  Prohibit, 
  Wrench, 
  ArrowBendUpRight,
  Trash
} from '@phosphor-icons/react';
import { useState, useEffect, useRef } from 'react';

interface InspectionActionsProps {
  status: PieceStatus;
  pieceId: string;
  inspectionHistory: InspectionHistory[];
  onAction: (pieceId: string, actionType: InspectionActionType) => void;
  onDeleteAction?: (pieceId: string, actionType: InspectionActionType, date: string) => void;
}

const inspectionActions: InspectionAction[] = [
  {
    type: 'weldless',
    label: 'Sans soudure',
    isEnabled: (status: PieceStatus) => {
      switch (status) {
        case 'REV':
        case 'RNC':
        case 'DIM':
        case 'PRO':
          return true;
        default:
          return false;
      }
    },
  },
  {
    type: 'bolting',
    label: 'Boulonnage',
    isEnabled: (status: PieceStatus) => {
      switch (status) {
        case 'REV':
        case 'RNC':
        case 'DIM':
        case 'PRO':
          return true;
        default:
          return false;
      }
    },
  },
  {
    type: 'camber',
    label: 'Cambrure',
    isEnabled: (status: PieceStatus) => {
      switch (status) {
        case 'REV':
        case 'RNC':
          return true;
        default:
          return false;
      }
    },
  },
];

export const actionIcons = {
  dimensional: Ruler,
  visual: Eye,
  weldless: Prohibit,
  bolting: Wrench,
  camber: ArrowBendUpRight,
} as const;

export function InspectionActions({ status, pieceId, inspectionHistory, onAction, onDeleteAction }: InspectionActionsProps) {
  const [pressedAction, setPressedAction] = useState<InspectionActionType | null>(null);
  const [progress, setProgress] = useState(0);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  const { success, error, info } = useToast();

  const handleAction = (action: InspectionAction) => {
    onAction(pieceId, action.type);
    success({
      title: 'Date ajoutée',
      description: `${action.label.toLowerCase()}`,
      duration: 2000
    });
  };

  const handleDelete = (actionType: InspectionActionType) => {
    const dates = inspectionHistory
      .filter(inspection => inspection.type === actionType)
      .map(inspection => inspection.date);
    
    if (dates.length > 0 && onDeleteAction) {
      dates.forEach(date => {
        onDeleteAction(pieceId, actionType, date);
      });
      error({
        title: 'Date supprimée',
        description: 'La date a été supprimée avec succès',
        duration: 2000
      });
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from bubbling up to the card
    info({
      title: 'Supprimer la date',
      description: 'Maintenez le bouton pendant 3 secondes pour supprimer la date',
      duration: 2000
    });
  };

  const startPress = (actionType: InspectionActionType, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Stop event from bubbling up to the card
    setPressedAction(actionType);
    setProgress(0);

    // Start the delete timer
    pressTimer.current = setTimeout(() => {
      handleDelete(actionType);
      setPressedAction(null);
      setProgress(0);
    }, 3000);

    // Start the progress timer
    progressTimer.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (progressTimer.current) clearInterval(progressTimer.current);
          return 100;
        }
        return prev + 3.33; // 100% / 30 (for smooth animation over 3 seconds)
      });
    }, 100);
  };

  const endPress = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Stop event from bubbling up to the card
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (progressTimer.current) clearInterval(progressTimer.current);
    setPressedAction(null);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {inspectionActions.map((action) => {
        const Icon = actionIcons[action.type];
        const actionDates = inspectionHistory.filter(inspection => inspection.type === action.type);
        const hasDate = actionDates.length > 0;
        const isPressed = pressedAction === action.type;
        
        return (
          <div key={action.type} className="flex items-center gap-1 w-full">
            <Button
              variant="outline"
              className={`h-auto py-2 px-3 flex flex-row items-center gap-2 flex-1 justify-start ${hasDate ? 'bg-primary/5' : 'hover:bg-primary/5'}`}
              disabled={!action.isEnabled(status) || hasDate}
              onClick={() => handleAction(action)}
            >
              <Icon 
                weight="duotone" 
                className="h-5 w-5 text-primary" 
              />
              <span className="text-sm font-medium text-primary/80 font-nunito">
                {action.label}
              </span>
            </Button>
            {hasDate && (
              <Button
                variant="ghost"
                size="icon"
                className="relative h-[38px] w-[38px] bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 overflow-hidden"
                onMouseDown={(e) => startPress(action.type, e)}
                onMouseUp={endPress}
                onMouseLeave={endPress}
                onTouchStart={(e) => startPress(action.type, e)}
                onTouchEnd={endPress}
                onClick={handleDeleteClick}
                title="Maintenir 3 secondes pour supprimer"
              >
                <Trash weight="bold" className={`h-4 w-4 relative z-10 transition-transform ${isPressed ? 'scale-90' : 'scale-100'}`} />
                {isPressed && (
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-red-200 transition-all duration-100"
                    style={{ height: `${progress}%` }}
                  />
                )}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
