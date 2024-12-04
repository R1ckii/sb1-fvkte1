import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Scan, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WeldingPiece } from '@/lib/types/welding';
import { cn } from '@/lib/utils';

interface PieceScannerProps {
  onPieceScanned: (piece: WeldingPiece) => void;
}

const MOCK_PIECES: Partial<WeldingPiece>[] = [
  {
    id: 'P-2024-007',
    projectNumber: '2024-317',
    division: 'Division C',
    name: 'Support arrière',
    status: 'REV',
  },
  {
    id: 'P-2024-008',
    projectNumber: '2024-318',
    division: 'Division B',
    name: 'Connecteur latéral',
    status: 'DIM',
  },
  {
    id: 'P-2024-009',
    projectNumber: '2024-319',
    division: 'Division A',
    name: 'Poutre centrale',
    status: 'PRO',
  },
];

let scanCounter = 0;

export function PieceScanner({ onPieceScanned }: PieceScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const { success } = useToast();

  const simulateScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const randomPiece = MOCK_PIECES[Math.floor(Math.random() * MOCK_PIECES.length)];
      const scannedPiece: WeldingPiece = {
        ...randomPiece as WeldingPiece,
        id: `P-2024-${(10 + scanCounter++).toString().padStart(3, '0')}`,
        scannedAt: new Date().toISOString(),
      };
      
      onPieceScanned(scannedPiece);
      setIsScanning(false);
      success({
        title: 'Scan réussi',
        description: `La pièce ${scannedPiece.name} a été scannée avec succès`,
        duration: 2000
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100%-5rem)]">
      <div className="w-full max-w-sm mx-auto">
        {isScanning ? (
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 backdrop-blur-sm">
              {/* Simulated camera view */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20" />
              
              {/* Scanning overlay */}
              <div className="absolute inset-12 border-2 border-primary/30 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-primary/80 animate-[scan_2s_ease-in-out_infinite] blur-[1px]" />
                </div>
                
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary -translate-x-1 -translate-y-1" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary translate-x-1 -translate-y-1" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary -translate-x-1 translate-y-1" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary translate-x-1 translate-y-1" />
              </div>

              {/* Camera icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-16 h-16 text-primary/20" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-lg font-medium text-primary">Scan en cours...</p>
              <p className="text-sm text-textSecondary">
                Maintenez le code-barres dans le cadre
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 text-center">
            <div className="aspect-[4/3] rounded-2xl bg-black/5 flex flex-col items-center justify-center p-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Scan className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-primary">
                  Prêt à scanner
                </p>
                <p className="text-sm text-textSecondary">
                  Positionnez le code-barres dans le cadre
                </p>
              </div>
            </div>

            <Button 
              onClick={simulateScan} 
              size="lg"
              className={cn(
                "w-full h-12 text-base font-medium",
                "transition-all duration-200",
                "hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              Commencer le scan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
