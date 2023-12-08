import { Directive, OnInit } from '@angular/core';
import { APIService } from './api.service';

@Directive({
  selector: '[appBaseView]'
})
export class BaseViewDirective implements OnInit{

  id: string = ``;
  data: any = null;

  constructor(private apiService: APIService) { }
  ngOnInit(): void {
  }

}

