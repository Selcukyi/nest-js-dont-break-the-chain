export interface Chain {
  id: string;
  title: string;
  description: string;
  status: chainStatus;
  period: number;
}

export enum chainStatus {
  PASSIVE = 'PASSIVE',
  ON_GOING = 'ON_GOING',
}
