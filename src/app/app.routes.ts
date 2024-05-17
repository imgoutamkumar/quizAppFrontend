import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { ExamComponent } from './pages/exam/exam.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ResultComponent } from './pages/result/result.component';
import { UpdateQuizComponent } from './pages/update-quiz/update-quiz.component';
import { UpdateQuizFormComponent } from './pages/update-quiz-form/update-quiz-form.component';
import { CreateQuizFormComponent } from './pages/create-quiz-form/create-quiz-form.component';
import { TestingComponentComponent } from './pages/testing-component/testing-component.component';
import { TestingComponent2Component } from './pages/testing-component2/testing-component2.component';
import { UnPublishedQuizComponent } from './pages/un-published-quiz/un-published-quiz.component';

export const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'exam/:quizId',
    component: ExamComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'result/:resultId',
    component: ResultComponent,
  },
  {
    path: 'updateQuiz/:quizId',
    component: UpdateQuizComponent,
  },
  {
    path: 'updateQuiz/:quizId/:index',
    component: UpdateQuizFormComponent,
  },
  {
    path: 'createQuiz',
    component: CreateQuizFormComponent,
  },
  {
    path: 'unPublished',
    component: UnPublishedQuizComponent,
  },
  {
    path: 'test',
    component: TestingComponentComponent,
  },
  {
    path: 'test2',
    component: TestingComponent2Component,
  },
];
