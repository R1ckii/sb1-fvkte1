import { useState } from 'react';
import { PageContainer } from '../components/layout/page-container';
import { StatusLegend } from '../components/welding/status-legend';
import { PieceCard } from '../components/welding/piece-card';
import { PieceScanner } from '../components/welding/piece-scanner';
import { WeldingPiece, RNC, RNCFormData, InspectionActionType } from '../lib/types/welding';
import { useToast } from '../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { QrCode } from 'lucide-react';

// Mock data for demonstration
const initialPieces: WeldingPiece[] = [
  {
    id: 'P-2024-001',
    projectNumber: '2024-317',
    division: 'Division A',
    name: 'Support principal',
    status: 'PRO',
    scannedAt: '2024-03-20T10:30:00Z',
    inspectionHistory: [],
  },
  {
    id: 'P-2024-002',
    projectNumber: '2024-317',
    division: 'Division B',
    name: 'Poutre latérale',
    status: 'DIM',
    scannedAt: '2024-03-20T11:15:00Z',
    inspectionHistory: [],
  },
  {
    id: 'P-2024-003',
    projectNumber: '2024-318',
    division: 'Division A',
    name: 'Connecteur avant',
    status: 'REV',
    scannedAt: '2024-03-20T11:45:00Z',
    inspectionHistory: [],
  },
];

export function WeldingProgressPage() {
  const [pieces, setPieces] = useState<WeldingPiece[]>(initialPieces);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(initialPieces[0].id);
  const [rncs, setRncs] = useState<RNC[]>([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { success } = useToast();
  
  const selectedPiece = pieces.find(p => p.id === selectedPieceId);

  const handlePieceScanned = (newPiece: WeldingPiece) => {
    setPieces(prev => [newPiece, ...prev]);
    setSelectedPieceId(newPiece.id);
    setIsScannerOpen(false);
  };

  const handleInspectionAction = (pieceId: string, actionType: InspectionActionType) => {
    setPieces(prev => prev.map(piece => {
      if (piece.id === pieceId) {
        return {
          ...piece,
          inspectionHistory: [
            ...piece.inspectionHistory,
            {
              type: actionType,
              date: new Date().toISOString()
            }
          ]
        };
      }
      return piece;
    }));
  };

  const handleDeleteInspection = (pieceId: string, actionType: InspectionActionType, date: string) => {
    setPieces(prev => prev.map(piece => {
      if (piece.id === pieceId) {
        return {
          ...piece,
          inspectionHistory: piece.inspectionHistory.filter(
            inspection => !(inspection.type === actionType && inspection.date === date)
          )
        };
      }
      return piece;
    }));
  };

  const handleRNCSubmit = (data: RNCFormData) => {
    const newRNC: RNC = {
      id: (rncs.length + 1).toString().padStart(3, '0'),
      pieceId: data.pieceId,
      cause: data.cause,
      description: data.description,
      reference: data.reference,
      createdBy: data.createdBy,
      createdAt: new Date().toISOString(),
      status: 'open',
      events: [
        {
          id: '1',
          rncId: (rncs.length + 1).toString().padStart(3, '0'),
          description: 'Ouverture du RNC',
          createdBy: data.createdBy,
          createdAt: new Date().toISOString(),
        }
      ],
    };
    
    // Add the new RNC
    setRncs(prevRncs => [...prevRncs, newRNC]);

    // Update the piece status to RNC
    setPieces(prev => prev.map(piece => {
      if (piece.id === data.pieceId) {
        return {
          ...piece,
          status: 'RNC'
        };
      }
      return piece;
    }));

    success({
      title: 'RNC créé',
      description: 'Le rapport de non-conformité a été créé avec succès',
      duration: 2000
    });
  };

  if (!selectedPiece) {
    return null; // Or some loading/error state
  }

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-primary font-nunito">
            Inspection
          </h1>
          <Button
            variant="outline"
            onClick={() => setIsScannerOpen(true)}
            className="flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            Scanner une pièce
          </Button>
        </div>
        <div className="space-y-4">
          {pieces.map((piece) => {
            const pieceRncs = rncs.filter(rnc => rnc.pieceId === piece.id);
            return (
              <PieceCard
                key={piece.id}
                piece={piece}
                rncs={pieceRncs}
                isSelected={piece.id === selectedPieceId}
                onClick={(piece) => setSelectedPieceId(piece.id)}
                onInspectionAction={handleInspectionAction}
                onDeleteInspection={handleDeleteInspection}
                onRNCSubmit={handleRNCSubmit}
              />
            );
          })}
        </div>
      </div>
      <StatusLegend />
      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Scanner une pièce</DialogTitle>
          </DialogHeader>
          <PieceScanner onPieceScanned={handlePieceScanned} />
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
