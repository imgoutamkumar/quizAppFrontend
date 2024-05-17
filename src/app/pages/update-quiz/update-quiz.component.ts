import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuizService } from '../../services/quiz.service';
@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.scss',
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private quizService: QuizService,
    private route: Router
  ) {}

  questions: any;

  /* getQuizListByQuizId() {
    this.activatedRoute.paramMap.subscribe({
      next: (value: any) => {
        //console.log('quiz id from url: ', value.get('id'));
        this.examService.startExam(value.get('quizId')).subscribe({
          next: (val: any) => {
            this.questions = val;
            console.log(val);
            console.log(val.name);
          },
          error: (val: any) => {
            console.log(val);
          },
        });
      },
    });
  }
 */

  isQuizPublished: boolean = true;

  getQuizListByQuizId() {
    this.activatedRoute.paramMap.subscribe({
      next: (value: any) => {
        //console.log('quiz id from url: ', value.get('id'));
        this.quizService.getQuizByQuizId(value.get('quizId')).subscribe({
          next: (val: any) => {
            if (val.is_published === false) {
              this.isQuizPublished = false;
            }
            this.questions = val;
            console.log(val);
            console.log('quiz name', val.name);
          },
          error: (val: any) => {
            console.log(val);
          },
        });
      },
    });
  }

  openUpdateQuestionForm(index: number) {
    this.activatedRoute.paramMap.subscribe({
      next: (value: any) => {
        let quizId = value.get('quizId');
        console.log('quiz id from url: ', value.get('quizId'));
        console.log('updateQuestion working');

        this.route.navigate(['/updateQuiz', quizId, index]);
        console.log('route working');
      },
      error: (value: any) => {
        console.log(value);
      },
    });
    //console.log('update button working');
  }

  deleteQuestion(index: number) {
    alert('delete functionalities not assigned');
    console.log('delete button works');
  }

  ngOnInit(): void {
    this.getQuizListByQuizId();
  }
}
