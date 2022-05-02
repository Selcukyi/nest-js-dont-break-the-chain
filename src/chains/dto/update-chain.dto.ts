import { IsNotEmpty, isNotEmpty } from 'class-validator';
import { chainStatus } from '../chain.model';

export class updateChainDto {
  @IsNotEmpty()
  id: string;

  title?: string;
  description?: string;
  period?: number;
  status?: chainStatus;
}
