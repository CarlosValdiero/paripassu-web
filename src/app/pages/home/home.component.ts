import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PasswordDTO } from 'src/app/dtos/password-dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PasswordService } from 'src/app/services/password.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  currentPassword: PasswordDTO = new PasswordDTO();
  myPassword?: PasswordDTO;

  subscriptionCurrentPassword?: Subscription;

  constructor(
    private readonly passwordService: PasswordService,
    private readonly localStorageService: LocalStorageService,
    private readonly webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.myPassword = this.localStorageService.getMyPassword();
    this.getCurrentPassword();
    this.subscriptionCurrentPassword = this.webSocketService.getMessageCurrent().subscribe((data) => {
      this.setCurrentPassword(data);
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.unsubscribeCurrent(this.subscriptionCurrentPassword);
  }

  getCurrentPassword(): void {
    this.passwordService.getCurrentPassword().subscribe({
      next: (data) => {
        this.setCurrentPassword(data);
      },
      error: (e) => {
        console.log("deu ruim")
      } 
    });
  }

  setCurrentPassword(currentPassword: PasswordDTO): void {
    this.currentPassword = currentPassword;
    this.verifyMyPassword();
  }

  verifyMyPassword(): void {
    if(this.myPassword?.uuidSequence 
      && this.currentPassword?.uuidSequence 
      && this.myPassword.uuidSequence != this.currentPassword.uuidSequence) {
        this.localStorageService.clearMyPassword();
    }
  }

  setMyPassword(myPassword: PasswordDTO): void {
    this.myPassword = myPassword;
  }

  deletePassword(): void {
    this.myPassword = undefined;
  }

}
