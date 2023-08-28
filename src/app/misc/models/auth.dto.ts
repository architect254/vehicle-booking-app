import { UserRole } from "./user-role.enum";

export interface AuthhDto{
    username:string;
    pin:number;
    role?:UserRole
}