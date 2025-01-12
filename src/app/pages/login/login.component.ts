import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/User/user.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onClick() {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (response) => {
          this.notificationService.showNotification(
            'Login successful',
            'success'
          );
          const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(response),
            'jkanslknlakscnlisacoipjpoascjpojacs55'
          ).toString();
          localStorage.setItem('TodoList', encryptedData);
          this.router.navigate(['/tasks']);
        },
        (error) => {
          this.notificationService.showNotification(
            'Login failed, Check Email or Password',
            'error'
          );
        }
      );
    }
  }
}
