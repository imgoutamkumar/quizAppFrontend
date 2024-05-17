import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  public getAllPublishedQuizes(): Observable<any> {
    /* const token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    console.log('token from local storage', localStorage.getItem('token')); */

    return this.http.get<any>(`http://localhost:4000/quiz/allQuiz`);
  }

  filterAllPublishedQuiz(filteredData: any) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );
    let params = new HttpParams();

    /* for (let key of Object.keys(filteredData)) {
      console.log(
        'key:',
        key,
        'value:',
        filteredData[key],
        'value type',
        typeof filteredData[key]
      );
      params.set(key, filteredData[key]);
    } */
    for (let key in filteredData) {
      console.log(
        'key:',
        key,
        'value:',
        filteredData[key],
        'value type',
        typeof filteredData[key]
      );
      params = params.set(key, filteredData[key]);
    }
    console.log('params :', params);

    return this.http.get<any>(`http://localhost:4000/quiz/filter`, {
      headers,
      params,
    });
  }

  public getAllunPublishedQuizes(): Observable<any> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );
    return this.http.get<any>(`http://localhost:4000/quiz/unPublishedQuiz`, {
      headers,
    });
  }

  public createQuiz(quizData: any): Observable<any> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );
    console.log('quizData received', quizData);
    console.log('header', headers);
    return this.http.post<any>(`http://localhost:4000/quiz/`, quizData, {
      headers,
    });
  }

  public updateQuestionBYQuizIdAndIndexNo(
    quizId: string,
    index: number,
    updatedQuestion: Object
  ): Observable<any> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );

    let params = new HttpParams().set('quizId', quizId).set('index', index);
    return this.http.put<any>(
      `http://localhost:4000/quiz/update/${quizId}/${index}`,
      updatedQuestion,
      { headers, params }
    );
  }

  public deleteQuizByQuizId(quizId: string): Observable<any> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );
    let params = new HttpParams().set('quizId', quizId);
    return this.http.delete<any>(`http://localhost:4000/quiz/delete/${quizId}`);
  }

  public getQuizByQuizId(quizId: string) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );

    //let params = new HttpParams().set('quizId', quizId);

    return this.http.get<any>(`http://localhost:4000/quiz/quizId/${quizId}`, {
      headers,
    });
  }

  public getQuestionBYQuizIdAndIndexNo(
    quizId: string,
    index: number
  ): Observable<any> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );

    let params = new HttpParams()
      .set('quizId', quizId)
      .set('index', Number(index));
    return this.http.get<any>(
      `http://localhost:4000/quiz/get/${quizId}/${index}`,
      { headers }
    );
  }
}
