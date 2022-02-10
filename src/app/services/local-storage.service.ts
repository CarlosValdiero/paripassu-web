import { Injectable } from "@angular/core";
import { PasswordDTO } from "../dtos/password-dto";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    saveMyPassword(myPassword: PasswordDTO): void {
        localStorage.setItem("myPassword", JSON.stringify(myPassword));
    }

    getMyPassword(): PasswordDTO {
        const myPassword = localStorage.getItem("myPassword");
        return myPassword? JSON.parse(myPassword): undefined;
    }

    clearMyPassword(): void {
        localStorage.removeItem("myPassword");
    }
}