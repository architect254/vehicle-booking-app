export enum UserRole {
  ADMIN = `Admin`,
  COMPANY_MANAGER = `Company Manager`,
  VEHICLE_MANAGER = `Vehicle Manager`,
}

export interface User {
  id?: string;
  name: string;
  email: string;
  company: string;
  role: UserRole;
}
