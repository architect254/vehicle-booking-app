import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  _title = new BehaviorSubject<string>(``);

  constructor() {}

  set title(title: string) {
    this._title.next(title);
  }
}
