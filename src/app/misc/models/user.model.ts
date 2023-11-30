import { UserRole } from "./user-role.enum";

export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public phone_number: string,
    public role: UserRole
  ) {}
}
