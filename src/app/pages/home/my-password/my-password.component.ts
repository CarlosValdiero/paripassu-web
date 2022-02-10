import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PasswordDTO } from 'src/app/dtos/password-dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-my-password',
  templateUrl: './my-password.component.html',
  styleUrls: ['./my-password.component.scss']
})
export class MyPasswordComponent {

  @Input() myPassword: PasswordDTO = new PasswordDTO();
  @Output() deletePasswordEvent = new EventEmitter<void>();

  constructor(
    private readonly localStorageService: LocalStorageService
  ) { }

  deletePassword(): void {
    this.localStorageService.clearMyPassword();
    this.deletePasswordEvent.emit();
  }

}
