import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/misc/models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly API_URL = `${environment.apiUrl}/users`
  constructor(private _http: HttpClient){
    
  }

  fetchUsers(paginate:any){
    return this._http.get<User[]>(this.API_URL,{params: paginate});
  }
}