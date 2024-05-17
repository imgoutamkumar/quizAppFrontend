import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService } from '../../services/quiz.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-un-published-quiz',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './un-published-quiz.component.html',
  styleUrl: './un-published-quiz.component.scss',
})
export class UnPublishedQuizComponent implements OnInit {
  constructor(private quizService: QuizService, private route: Router) {}
  ngOnInit(): void {
    this.getAllUnPublishedQuizesByCreatorId();
  }

  quizes: any;

  getAllUnPublishedQuizesByCreatorId() {
    return this.quizService.getAllunPublishedQuizes().subscribe({
      next: (value: any) => {
        console.log(value);
        this.quizes = value;
      },
      error: (value: any) => {
        console.log(value);
      },
    });
  }

  isAdmin = true;
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

  updateQuiz(quizId: number) {
    // console.log('exam id :', id);
    // console.log(localStorage.getItem('role'));

    if (localStorage.getItem('role') === 'admin') {
      this.route.navigate(['/updateQuiz/', quizId]);
    } else {
      console.log('Something went wrong');
    }
  }
}
