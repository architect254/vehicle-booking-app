import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/title.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  constructor(private titleService: TitleService) {}
  ngOnInit(): void {
    this.titleService.title = `Companies`;
  }
}
