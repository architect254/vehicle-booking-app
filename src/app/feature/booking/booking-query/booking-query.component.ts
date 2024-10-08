import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-booking-query',
  templateUrl: './booking-query.component.html',
  styleUrls: ['./booking-query.component.scss'],
})
export class BookingQueryComponent {
  private breakpointObserver = inject(BreakpointObserver);
  panelOpenState = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  folders: Section[] = [
    {
      name: 'Cab',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Matatu',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Bus',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Night',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Day',
      updated: new Date('1/18/16'),
    },
  ];

  myControl = new FormControl('');
  options: string[] = ['Mombasa', 'Nairobi', 'Kisumu'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}

interface Section {
  name: string;
  updated: Date;
}
