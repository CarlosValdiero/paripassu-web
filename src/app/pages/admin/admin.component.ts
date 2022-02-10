import { Component, OnInit } from '@angular/core';
import { PasswordDTO } from 'src/app/dtos/password-dto';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentPassword: PasswordDTO = new PasswordDTO();

  constructor(
    private readonly passwordService: PasswordService
  ) { }

  ngOnInit(): void {
    this.getCurrentPassword();
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
