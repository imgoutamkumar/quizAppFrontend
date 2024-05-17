import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
@Component({
  selector: 'app-testing-component2',
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
  templateUrl: './testing-component2.component.html',
  styleUrl: './testing-component2.component.scss',
})
export class TestingComponent2Component implements OnInit, OnChanges {
  quizForm: FormGroup;

  constructor(
    private fb: FormBuilder //private quizService: QuizService,
  ) {
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

  //option section

  getoptions(questionIndex: number): FormArray {
    return this.questions_list.at(questionIndex).get('options') as FormArray;
  }

  addOptions(questionIndex: number) {
    this.getoptions(questionIndex).push(new FormControl());
  }

  //create quiz
  createQuiz() {
    console.log(this.quizForm.value);
    console.log('quiz created button works');
  }

  ngOnInit(): void {
    this.questionForm();
    this.addQuestion();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
