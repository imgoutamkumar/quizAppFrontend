import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}

  public startExam(quizId: number): Observable<any> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );

    let params = new HttpParams().set('quizId', quizId);

    return this.http.get<any>(`http://localhost:4000/exam/${quizId}`, {
      headers,
    });
  }

  public submitExam(result: Result): Observable<any> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );
    return this.http.post<any>(`http://localhost:4000/exam/`, result, {
      headers,
    });
  }
}
