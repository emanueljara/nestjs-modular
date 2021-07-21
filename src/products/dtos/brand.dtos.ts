import { IsString, IsUrl, IsNotEmpty } from 'class-validator';
//import { PartialType } from '@nestjs/mapped-types';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { TiposMarcas } from '../marcas.enum';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    enum: TiposMarcas,
    default: TiposMarcas.falabella,
    description: 'nombre de la marca',
  })
  readonly name: TiposMarcas = TiposMarcas.falabella;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ required: false, readOnly: true })
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
