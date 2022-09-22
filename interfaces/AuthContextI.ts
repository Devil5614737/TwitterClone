import { UserI, UsersI } from "./User";
import { CurrentUserI } from "./UserI";

export interface AuthContextI{
    currentUser?:CurrentUserI
    
}