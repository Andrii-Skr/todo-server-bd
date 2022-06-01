type UserDtoType = { email: string; _id: string; isActivated: boolean };

export class UserDto {
  email: string;
  id: string;
  isActivated: boolean;

  constructor(model: UserDtoType) {
    this.email = model.email;
    this.id = model._id.toString();
    this.isActivated = model.isActivated;
  }
}
