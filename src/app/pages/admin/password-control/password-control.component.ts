import { Component, OnInit } from '@angular/core';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-password-control',
  templateUrl: './password-control.component.html',
  styleUrls: ['./password-control.component.scss']
})
export class PasswordControlComponent implements OnInit {

  constructor(
    private readonly passwordService: PasswordService
  ) { }

  ngOnInit(): void {
  }

  nextPassword(): void {
    this.passwordService.nextPassword().subscribe({
      next: (data) => {
        alert("sucesso próxima senha")
      },
      error: (e) => {
        console.log("deu ruim")
      } 
    });
  }

  resetSequencia(): void {
    this.passwordService.resetSequence().subscribe({
      next: (data) => {
        alert("sucesso reiniciar")
      },
      error: (e) => {
        console.log("deu ruim")
      } 
    });
  }

}
