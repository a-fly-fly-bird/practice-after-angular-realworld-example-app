import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {

  constructor(private readonly authService: AuthService, private readonly router: Router) {

  }
  credentialControl = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login() {

  }

  onSubmit() {
    this.authService.login({
      account: this.credentialControl.value.username!,
      password: this.credentialControl.value.password!
    }).subscribe(
      {
        next: () => this.router.navigate(['/home']),
        error: (err) => {
          console.log(err)
        }
      }
    )
  }
}
