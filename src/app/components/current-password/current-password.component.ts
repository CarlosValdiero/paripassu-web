import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-password',
  templateUrl: './current-password.component.html',
  styleUrls: ['./current-password.component.scss']
})
export class CurrentPasswordComponent implements OnInit {

  @Input() value?: string;

  constructor() { }

  ngOnInit(): void {
    this.value
  }
  

}
