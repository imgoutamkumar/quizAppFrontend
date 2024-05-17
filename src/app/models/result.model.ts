export class Result {
  quizId: String;

  submitted_answers: Number[];

  constructor(quizId: String, submitted_answers: Number[]) {
    this.quizId = quizId;
    this.submitted_answers = submitted_answers;
  }
}
