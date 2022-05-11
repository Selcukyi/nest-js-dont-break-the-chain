import { IsEnum, IsOptional, IsString } from 'class-validator';

import { chainStatus } from '../chain-status.enum';
export class GetChainsFilterDto {
  @IsOptional()
  @IsEnum(chainStatus)
  status?: chainStatus;
  @IsOptional()
  @IsString()
  search?: string;
}
