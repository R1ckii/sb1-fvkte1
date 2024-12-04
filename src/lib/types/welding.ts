export type InspectionStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

export type PieceStatus = 'REV' | 'RNC' | 'ANN' | 'ATT' | 'EXIST' | 'DIM' | 'PRO';

export type InspectionActionType = 'dimensional' | 'visual' | 'weldless' | 'bolting' | 'camber';

export interface InspectionHistory {
  type: InspectionActionType;
  date: string;
  isConform?: boolean;
}

export interface StatusInfo {
  label: string;
  color: string;
  description: string;
}

export interface WeldingPiece {
  id: string;
  projectNumber: string;
  division: string;
  name: string;
  status: PieceStatus;
  scannedAt: string;
  inspectionHistory: InspectionHistory[];
}

export interface RNC {
  id: string;
  pieceId: string;
  cause: string;
  description: string;
  reference?: string;
  createdBy: string;
  createdAt: string;
  status: 'open' | 'closed';
  events: RNCEvent[];
}

export interface RNCEvent {
  id: string;
  rncId: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

export type RNCFormData = Omit<RNC, 'id' | 'createdAt' | 'status' | 'events'>;

export interface InspectionAction {
  type: InspectionActionType;
  label: string;
  isEnabled: (status: PieceStatus) => boolean;
}
