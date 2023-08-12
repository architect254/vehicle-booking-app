import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  endpoint: string = `users`;
  url: string = environment.apiUrl + `/${this.endpoint}`;
  constructor(private http: HttpClient) {}

  addUser(user: User) {
    return this.http.post(this.url, user, { responseType: `text` });
  }

  getUser(id: string) {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  updateUser(id: string, user: User) {
    return this.http.put(`${this.url}/${id}`, user, { responseType: `text` });
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.url}/${id}`, { responseType: `text` });
  }
}
