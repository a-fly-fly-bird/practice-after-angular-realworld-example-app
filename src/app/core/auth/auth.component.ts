import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterComponent } from '../../pages/register/register.component';
import { DemoNgZorroAntdModule } from './../../ng-zorro-antd.module';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    RegisterComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private fb: NonNullableFormBuilder,
  ) {}
  isVisible = false;
  isOkLoading = false;

  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.authService
        .login({
          account: this.validateForm.value.username!,
          password: this.validateForm.value.password!,
        })
        .subscribe({
          next: () => this.router.navigate(['/home']),
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  goToReset = () => {};

  register = () => {
    this.showModal();
  };

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
