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
        console.log("sucesso próxima senha")
      },
      error: (e) => {
        alert("Ocorreu um erro ao solicitar próxima senha!")
      } 
    });
  }

  resetSequencia(): void {
    this.passwordService.resetSequence().subscribe({
      next: (data) => {
        console.log("sucesso reiniciar")
      },
      error: (e) => {
        alert("Ocorreu um erro ao reiniciar senhas!")
      } 
    });
  }

}
