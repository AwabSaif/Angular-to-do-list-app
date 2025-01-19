import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/User/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onClick() {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    this.loaderService.showLoader();
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(
        (response) => {
          this.notificationService.showNotification(
            'Registration successful! Redirecting to login...',
            'success'
          );
          this.loaderService.hideLoader();
          this.router.navigate(['/login']);
        },
        (error) => {
          this.notificationService.showNotification('Register failed.', 'error');
          this.loaderService.hideLoader();
        }
      );
    }
  }
}
