import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PieceStatus, StatusInfo } from './types/welding';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const STATUS_INFO: Record<PieceStatus, StatusInfo> = {
  REV: {
    label: 'En révision',
    color: 'bg-yellow-500',
    description: 'Marque en révision (Division en révision)',
  },
  RNC: {
    label: 'Non conforme',
    color: 'bg-yellow-500',
    description: 'Rapport de non-conformité ouvert (NCR)',
  },
  ANN: {
    label: 'Annulé',
    color: 'bg-red-500',
    description: 'Marque ou dessin annulé',
  },
  ATT: {
    label: 'En attente',
    color: 'bg-red-500',
    description: 'Dessin en attente',
  },
  EXIST: {
    label: "N'existe pas",
    color: 'bg-red-500',
    description: "L'ID n'existe pas",
  },
  DIM: {
    label: 'Dimensionnel',
    color: 'bg-orange-500',
    description: 'Inspection dimensionnelle non complété',
  },
  PRO: {
    label: 'Projet différent',
    color: 'bg-orange-500',
    description: 'Marque associée à un projet différent',
  },
};

export function formatPieceStatus(status: PieceStatus): string {
  return status;
}

export function getPieceStatusColor(status: PieceStatus): string {
  return STATUS_INFO[status].color;
}