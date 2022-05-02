import internal from 'stream';
import { chainStatus } from '../chain.model';
export class GetChainsFilterDto {
  status?: chainStatus;
  search?: string;
  period?: number;
}
