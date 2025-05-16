export enum BCStatus {
  ISSUED = 'issued',
  RECEIVED = 'received',
  CANCELLED = 'cancelled'
}

export interface BC {
  reference: string;
  date: Date;
  fournisseurId: string;
  demandeAchatId: string;
  projetId: string;
  montantTotal: number;
  status: BCStatus;
} 