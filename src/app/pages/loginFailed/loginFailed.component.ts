import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzResultModule } from 'ng-zorro-antd/result';
@Component({
  selector: 'app-loginFailed',
  templateUrl: './loginFailed.component.html',
  styleUrls: ['./loginFailed.component.css'],
  standalone: true,
  imports: [NzResultModule, CommonModule],
})
export class LoginFailedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
