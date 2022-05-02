import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";


export class CreateChainDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNumber()
  period: number;
}
