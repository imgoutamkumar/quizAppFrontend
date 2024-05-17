import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService } from '../../services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  filterForm: FormGroup;
  constructor(
    private quizService: QuizService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      is_published: true,
    });
  }

  isQuizPublished = [true, false];

  FilterPublishedQuiz() {
    console.log('this.filterForm.value', this.filterForm.value);
    this.quizService.filterAllPublishedQuiz(this.filterForm.value).subscribe({
      next: (result) => {
        console.log('result :', result);
        this.quizes = result;
      },
      error: (error) => {
        console.log('error : ', error);
      },
    });
    console.log('filter button worked');
  }

  quizes: any;

  /*  getQuizes() {
    this.quizService.getAllPublishedQuizes().subscribe({
      next: (value: any) => {
        this.quizes = value;
        console.log('quizzes found :', this.quizes.length);
      },
      error: (value: any) => {
        console.log(value);
      },
    });
  } */

  ngOnInit(): void {
    console.log(this.filterForm.value);
    //this.getQuizes();
    this.FilterPublishedQuiz();
  }
  sideNavBar() {
    alert('Side NavBar functionalities not implemented right now');
  }

  isLoggedIn: boolean = true;

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    /* localStorage.removeItem('email');
    localStorage.removeItem('id'); */
    this.route.navigate(['signin']);
    console.log('logout working');
  }

  myProfile() {
    alert('profile detail functionalities not implemented right now');
  }

  isAdmin = localStorage.getItem('role')?.toUpperCase();
  createQuizForm() {
    if (localStorage.getItem('role') === 'admin') {
      this.route.navigate(['/createQuiz']);
    }
  }
  getUnPublishedQuiz() {
    if (localStorage.getItem('role') === 'admin') {
      this.route.navigate(['/unPublished']);
    }
  }

  startTest(quizId: number) {
    // console.log('exam id :', id);
    // console.log(localStorage.getItem('role'));

    if (localStorage.getItem('role') === 'user') {
      this.route.navigate(['/exam/', quizId]);
    }
    if (localStorage.getItem('role') === 'admin') {
      this.route.navigate(['/updateQuiz/', quizId]);
    }
  }
}
