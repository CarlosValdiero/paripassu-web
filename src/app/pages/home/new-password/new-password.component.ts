import { Component, EventEmitter, Output } from '@angular/core';
import { PasswordDTO } from 'src/app/dtos/password-dto';
import { PasswordType } from 'src/app/enums/password-type';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {

  @Output() myPasswordEvent = new EventEmitter<PasswordDTO>();

  constructor(
    private readonly passwordService: PasswordService,
    private readonly localStorageService: LocalStorageService
  ) { }


  newPasswordTypeN(): void {
    this.newPassword(PasswordType.N);
  }

  newPasswordTypeP(): void {
    this.newPassword(PasswordType.P);
  }

  newPassword(passwordType: PasswordType): void {
    this.passwordService.newPassword(passwordType).subscribe({
      next: (data) => {
        this.localStorageService.saveMyPassword(data);
        this.myPasswordEvent.emit(data);
      },
      error: (e) => {
        console.log("deu ruim")
      } 
    });
  }
}

