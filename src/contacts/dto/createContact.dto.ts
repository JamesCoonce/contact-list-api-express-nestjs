import { ApiModelProperty } from '@nestjs/swagger';

export class CreateContactDTO {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  firstName: string;

  @ApiModelProperty()
  lastName: string;

  @ApiModelProperty()
  address: string;

  @ApiModelProperty()
  telephoneNumber: string;
}
