import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { chainStatus } from '../chain-status.enum';

export class updateChainDto {
  @IsNotEmpty()
  id: string;
  @IsOptional()
  title?: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  period?: number;

  @IsOptional()
  @IsEnum(chainStatus)
  status?: chainStatus;
}
