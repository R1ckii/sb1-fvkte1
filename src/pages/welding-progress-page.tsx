import { useState, useEffect } from 'react';
import { PageContainer } from '../components/layout/page-container';
import { InspectionActions } from '../components/welding/inspection-actions';
import { StatusLegend } from '../components/welding/status-legend';
import { PiecesList } from '../components/welding/pieces-list';
import { RNCForm } from '../components/welding/rnc/rnc-form';
import { RNCList } from '../components/welding/rnc/rnc-list';
import { PieceScanner } from '../components/welding/piece-scanner';
import { WeldingPiece, RNC, RNCFormData } from '../lib/types/welding';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../components/ui/sheet';

// Mock data for demonstration
const initialPieces: WeldingPiece[] = [
  {
    id: 'P-2024-001',
    projectNumber: '2024-317',
    division: 'Division A',
    name: 'Support principal',
    status: 'PRO',
    scannedAt: '2024-03-20T10:30:00Z',
  },
  {
    id: 'P-2024-002',
    projectNumber: '2024-317',
    division: 'Division B',
    name: 'Poutre latérale',
    status: 'DIM',
    scannedAt: '2024-03-20T11:15:00Z',
  },
  {
    id: 'P-2024-003',
    projectNumber: '2024-318',
    division: 'Division A',
    name: 'Connecteur avant',
    status: 'RNC',
    scannedAt: '2024-03-20T11:45:00Z',
  },
];

const STORAGE_KEY = 'welding-rncs';

export function WeldingProgressPage() {
  const [pieces, setPieces] = useState<WeldingPiece[]>(initialPieces);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(initialPieces[0].id);
  const [rncs, setRncs] = useState<RNC[]>(() => {
    // Initialize RNCs from localStorage
    const storedRncs = localStorage.getItem(STORAGE_KEY);
    return storedRncs ? JSON.parse(storedRncs) : [];
  });
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  const selectedPiece = pieces.find(p => p.id === selectedPieceId) || pieces[0];
  const pieceRNCs = rncs.filter(rnc => rnc.pieceId === selectedPieceId);

  // Persist RNCs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rncs));
  }, [rncs]);

  const handlePieceScanned = (newPiece: WeldingPiece) => {
    setPieces(prev => [newPiece, ...prev]);
    setSelectedPieceId(newPiece.id);
    setIsScannerOpen(false);
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
    
    setRncs(prevRncs => [...prevRncs, newRNC]);
    toast.success('RNC créé avec succès');
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-semibold text-primary font-nunito">
          Avancement du soudage
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <PiecesList
              pieces={pieces}
              selectedPieceId={selectedPieceId}
              onPieceSelect={(piece: WeldingPiece) => setSelectedPieceId(piece.id)}
              onScanClick={() => setIsScannerOpen(true)}
            />
            <InspectionActions status={selectedPiece.status} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-primary font-nunito">
                Rapports de non-conformité
              </h2>
              <RNCForm pieceId={selectedPiece.id} onSubmit={handleRNCSubmit} />
            </div>
            <RNCList rncs={pieceRNCs} />
          </div>
        </div>
      </div>
      <StatusLegend />
      <Sheet open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-xl">
          <SheetHeader>
            <SheetTitle>Scanner une pièce</SheetTitle>
          </SheetHeader>
          <PieceScanner onPieceScanned={handlePieceScanned} />
        </SheetContent>
      </Sheet>
    </PageContainer>
  );
}
