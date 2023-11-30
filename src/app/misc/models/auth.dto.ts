import { UserRole } from "./user-role.enum";

export interface AuthDto{
    firstname:string;
    lastname:string;
    phone_number:number;
    password:string;
}