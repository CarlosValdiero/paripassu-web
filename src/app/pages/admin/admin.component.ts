import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PasswordDTO } from 'src/app/dtos/password-dto';
import { PasswordService } from 'src/app/services/password.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  currentPassword: PasswordDTO = new PasswordDTO();
  subscriptionCurrentPassword?: Subscription;

  constructor(
    private readonly passwordService: PasswordService,
    private readonly webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.getCurrentPassword();
    this.subscriptionCurrentPassword = this.webSocketService.getMessageCurrent().subscribe((data) => {
      this.currentPassword = data;
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.unsubscribeCurrent(this.subscriptionCurrentPassword);
  }

  getCurrentPassword(): void {
    this.passwordService.getCurrentPassword().subscribe({
      next: (data) => {
        if(data) {
          this.currentPassword = data;
        } else {
          this.currentPassword = new PasswordDTO();
        }
      },
      error: (e) => {
        console.log("deu ruim")
      } 
    });
  }
}
