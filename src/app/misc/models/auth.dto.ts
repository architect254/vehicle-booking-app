import { UserRole } from "./user-role.enum";

export interface AuthDto{
    firstname:string;
    surname:string;
    phoneNo:number;
    password:string;
}