import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { DemoNgZorroAntdModule } from './../../ng-zorro-antd.module';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, DemoNgZorroAntdModule, ReactiveFormsModule],
  templateUrl: './forgetPassword.component.html',
  styleUrl: './forgetPassword.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgetPasswordComponent {
  validateForm: FormGroup<{
    account: FormControl<string>;
    password: FormControl<string>;
    confirm: FormControl<string>;
  }>;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    this.authService
      .reset({
        ...(this.validateForm.value as { account: string; password: string }),
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls.confirm.updateValueAndValidity(),
    );
  }

  confirmValidator: ValidatorFn = (control: AbstractControl) => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
  ) {
    this.validateForm = this.fb.group({
      account: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
  }
}
