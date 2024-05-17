import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Result } from '../../models/result.model';
import { window } from 'rxjs';
@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss',
})
export class ExamComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private route: Router
  ) {}

  questions: any;
  isloading: boolean = false;
  timer: any;
  startExamByQuizId() {
    this.activatedRoute.paramMap.subscribe({
      next: (value: any) => {
        console.log('quiz id from url: ', value.get('quizId'));
        this.examService.startExam(value.get('quizId')).subscribe({
          next: (val: any) => {
            this.isloading = false;
            this.questions = val;
            this.timer = this.questions.questions_list.length * 2 * 60;
            console.log('timer', this.timer, 'sec');
            console.log(this.questions.name);
            console.log(val);
            this.startTimer();
          },
          error: (val: any) => {
            console.log(val);
          },
        });
      },
    });
  }

  startTimer() {
    let t: any = setInterval(() => {
      if (this.timer <= 0) {
        this.SubmitExamByQuizId();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  submitted_answers: number[] = [];

  result: Result = {
    quizId: '',
    submitted_answers: [],
  };

  SubmitExamByQuizId() {
    this.result.submitted_answers = this.submitted_answers;
    //console.log('this.result.submitted_answers', this.result.submitted_answers);
    //console.log(this.submitted_answers);
    this.activatedRoute.paramMap.subscribe({
      next: (val: any) => {
        this.result.quizId = val.get('quizId');
        //console.log('quizId :', this.result.quizId);
        //console.log(val.get('id'));
        this.examService.submitExam(this.result).subscribe({
          next: (data: any) => {
            console.log(data);
            this.route.navigate(['/result/', data._id]);
          },
          error: (data: any) => {
            console.log(data);
          },
        });
      },
      error: (val: any) => {
        console.log(val);
      },
    });
  }

  ngOnInit(): void {
    this.startExamByQuizId();
  }
}
