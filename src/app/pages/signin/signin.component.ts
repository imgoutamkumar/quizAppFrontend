import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    RouterLink,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  logInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService
  ) {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signin() {
    if (this.logInForm.valid) {
      this.authService.loginUser(this.logInForm.value).subscribe({
        next: (val: any) => {
          localStorage.setItem('token', val.jwt);
          localStorage.setItem('role', val.role);

          //console.log(val);
          //console.log(val.jwt);

          console.log('user authentication success');
          this.route.navigate(['/quiz']);

          // if (val.role === 'admin') {
          //   console.log('admin authentication success');
          // }
        },
        error: (val: any) => {
          console.log('authentication denied');
        },
      });
    } else {
      console.log('must be a valid input');
    }
  }
  ngOnInit(): void {}
}
