import { Injectable } from '@angular/core';
import { NgHttpClientService } from './ng-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends NgHttpClientService<User> {
  private loggedUserSource = new BehaviorSubject(null);
  loggedUser = this.loggedUserSource.asObservable();

  constructor(
    http: HttpClient
  ) {
    super(http);
   }

   getEndPoint(): string {
    return 'user';
  }

  public login(body: {email: string, password: string}): Observable<User> {
    return this.http.post<User>(this.getEndPointUri() + 'login', body, { headers: this.getHeaders() });
  }

  public setLoggedUser(user: User): void {
    localStorage.setItem('api_token', user.api_token);
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);

    this.loggedUserSource.next(user);
  }

  public getLoggedUser(): User {
    return localStorage.getItem('api_token') ? {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      api_token: localStorage.getItem('api_token'),
      id: null
    } : null;
  }

  public logout(): void {
    this.loggedUserSource.next(null);
  }
}
