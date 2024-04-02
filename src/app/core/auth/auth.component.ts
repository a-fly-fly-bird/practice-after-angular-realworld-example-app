import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemoNgZorroAntdModule } from './../../ng-zorro-antd.module';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule, DemoNgZorroAntdModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {

  constructor(private readonly authService: AuthService, private readonly router: Router, private fb: NonNullableFormBuilder) {

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

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
