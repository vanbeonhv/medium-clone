export class CreateUserDto {
  //this is payload and we should not change it
  //that's why readonly here
  readonly username: string;

  readonly email: string;

  readonly password: string;
}
