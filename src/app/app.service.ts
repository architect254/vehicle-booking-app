import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AppService {
  API_URL = environment.apiUrl;
  constructor(private _http: HttpClient){

  }

  pingAPI(): Observable<string>{
    return this._http.get(this.API_URL,{responseType:`text` as const})
  }
}