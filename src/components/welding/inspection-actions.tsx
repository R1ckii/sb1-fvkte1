import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PieceStatus, InspectionAction } from '@/lib/types/welding';
import { 
  Ruler, 
  Eye, 
  Prohibit, 
  Wrench, 
  ArrowBendUpRight 
} from '@phosphor-icons/react';

interface InspectionActionsProps {
  status: PieceStatus;
}

const inspectionActions: InspectionAction[] = [
  {
    type: 'dimensional',
    label: 'Dimensionnel',
    isEnabled: (status) => {
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
    type: 'visual',
    label: 'Visuel',
    isEnabled: (status) => {
      switch (status) {
        case 'REV':
        case 'RNC':
        case 'PRO':
          return true;
        default:
          return false;
      }
    },
  },
  {
    type: 'weldless',
    label: 'Sans soudure',
    isEnabled: (status) => {
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
    isEnabled: (status) => {
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
    isEnabled: (status) => {
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

const actionIcons = {
  dimensional: Ruler,
  visual: Eye,
  weldless: Prohibit,
  bolting: Wrench,
  camber: ArrowBendUpRight,
} as const;

export function InspectionActions({ status }: InspectionActionsProps) {
  const handleAction = (action: InspectionAction) => {
    toast.success(`Inspection ${action.label.toLowerCase()} initiée`);
  };

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-primary font-nunito">Actions d'inspection</h2>
      <div className="grid grid-cols-2 gap-3">
        {inspectionActions.map((action) => {
          const Icon = actionIcons[action.type];
          return (
            <Button
              key={action.type}
              variant="outline"
              className="h-auto py-3 px-4 flex flex-col items-center gap-2 hover:bg-primary/5"
              disabled={!action.isEnabled(status)}
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
          );
        })}
      </div>
    </Card>
  );
}