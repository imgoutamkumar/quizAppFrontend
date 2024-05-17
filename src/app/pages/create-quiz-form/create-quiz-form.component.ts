import { Component, OnInit, SimpleChanges } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-create-quiz-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
  ],
  templateUrl: './create-quiz-form.component.html',
  styleUrl: './create-quiz-form.component.scss',
})
export class CreateQuizFormComponent implements OnInit {
  quizForm: FormGroup;

  constructor(private fb: FormBuilder, private quizService: QuizService) {
    this.quizForm = this.fb.group({
      name: [''],
      questions_list: this.fb.array([]),
    });
  }

  //question section

  questionForm(): FormGroup {
    return this.fb.group({
      question: [''],
      options: this.fb.array([new FormControl()]),
      answer: [''],
    });
  }

  get questions_list(): FormArray {
    return this.quizForm.get('questions_list') as FormArray;
  }

  addQuestion() {
    this.questions_list.push(this.questionForm());
  }
  removeQuestion(questionIndex: number) {
    this.questions_list.removeAt(questionIndex);
  }

  //option section

  getoptions(questionIndex: number): FormArray {
    return this.questions_list.at(questionIndex).get('options') as FormArray;
  }

  addOptions(questionIndex: number) {
    this.getoptions(questionIndex).push(new FormControl());
  }
  removeOptions(questionIndex: number, optionIndex: number) {
    this.getoptions(questionIndex).removeAt(optionIndex);
  }

  //create quiz
  createQuiz() {
    this.quizService.createQuiz(this.quizForm.value).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (result: any) => {
        console.log('errorr', result);
      },
    });
  }

  ngOnInit(): void {
    this.questionForm();
    this.addQuestion();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
