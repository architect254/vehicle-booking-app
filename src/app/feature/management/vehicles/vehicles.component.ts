import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/title.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  constructor(private titleService: TitleService) {}
  ngOnInit(): void {
    this.titleService.title = `Vehicles`;
  }
}
