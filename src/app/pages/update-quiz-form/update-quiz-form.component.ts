import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Console, error } from 'node:console';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-update-quiz-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './update-quiz-form.component.html',
  styleUrl: './update-quiz-form.component.scss',
})
export class UpdateQuizFormComponent implements OnInit {
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute
  ) {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([
        /* this.fb.group({
          option: ['', Validators.required],
        }), */
      ]),
      answer: ['', Validators.required],
    });
  }

  /* addOptions() {
    let options = this.questionForm.get('options') as FormArray;
    options.push(
      this.fb.group({
        option: ['', Validators.required],
      })
    );
  } */
  addOptions() {
    console.log('add options calling');
    /* this.options.push(
       this.fb.group({
         option: [''],
       })
     ); */
    this.options.push(new FormControl(''));
  }

  removeOptions(index: number) {
    this.options.removeAt(index);
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  updateQuestion() {
    console.log('update button clicked');
    this.activatedRoute.paramMap.subscribe({
      next: (value: any) => {
        const quizId = value.get('quizId');
        const index = value.get('index');
        console.log('quizId :', quizId, 'index :', index);
        console.log(this.questionForm.value);
        /*  this.quizService
          .updateQuestionBYQuizIdAndIndexNo(
            quizId,
            index,
            this.questionForm.value
          )
          .subscribe({
            next: (val: any) => {
              console.log(val);
            },
            error: (val: any) => {
              console.log(this.questionForm.value);
              console.log(val);
            },
          }); */
      },
      error: (value: any) => {
        console.log(value);
      },
    });
  }
  question: any;
  getQuestionData() {
    console.log('getQuestionData function callled');
    this.activatedRoute.paramMap.subscribe({
      next: (value: any) => {
        const quizId = value.get('quizId');
        const index = value.get('index');
        this.quizService
          .getQuestionBYQuizIdAndIndexNo(quizId, index)
          .subscribe({
            next: (result: any) => {
              this.question = result;
              console.log('question data', result);
            },
            error: (result: any) => {
              console.log(result);
            },
          });
      },
      error: (value: any) => {
        console.log(value);
      },
    });
  }

  ngOnInit(): void {
    this.getQuestionData();
    this.questionForm.patchValue(this.question);
  }
}
