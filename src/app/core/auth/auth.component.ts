import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewContainerRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ForgetPasswordComponent } from '../../pages/forgetPassword/forgetPassword.component';
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
    ForgetPasswordComponent,
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
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
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

  goToReset = () => {
    this.modal.create({
      nzContent: ForgetPasswordComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => {
            this.modal.closeAll();
          },
        },
      ],
    });
  };

  register = () => {
    this.modal.create({
      nzContent: RegisterComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => {
            this.modal.closeAll();
          },
        },
      ],
    });
  };
}
