import { Type } from 'class-transformer'
import { IsIn, IsInt, Min } from 'class-validator'

export class PaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10
}
