import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public loginUser(user: User): Observable<any> {
    return this.http.post<any>(`http://localhost:4000/user/login`, user);
  }
}
