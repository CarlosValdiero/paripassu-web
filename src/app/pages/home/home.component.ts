import { Component, OnInit } from '@angular/core';
import { PasswordDTO } from 'src/app/dtos/password-dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentPassword: PasswordDTO = new PasswordDTO();
  myPassword?: PasswordDTO;

  constructor(
    private readonly passwordService: PasswordService,
    private readonly localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.myPassword = this.localStorageService.getMyPassword();
    this.getCurrentPassword();
  }

  getCurrentPassword(): void {
    this.passwordService.getCurrentPassword().subscribe({
      next: (data) => {
        if(data) {
          this.currentPassword = data;
          this.verifyMyPassword();
        } else {
          this.currentPassword = new PasswordDTO();
        }
      },
      error: (e) => {
        console.log("deu ruim")
      } 
    });
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
