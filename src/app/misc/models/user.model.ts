import { UserRole } from "./user-role.enum";

export class User {
  constructor(
    public firstname: string,
    public surname: string,
    public phoneNo: string,
    public role: UserRole
  ) {}
}
