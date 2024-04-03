import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: NonNullableFormBuilder) {}
}
