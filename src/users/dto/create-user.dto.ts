export class CreateUserDto {
  readonly name: string;
  readonly userName:string;
  readonly password:string;
  readonly books:{
    readonly past:[{
      readonly name:string;
      readonly userScore:number
      }],
      readonly present:[{
        readonly name:string
      }]
  }
  }