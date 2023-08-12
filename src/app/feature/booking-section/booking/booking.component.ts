import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Location {
  label: string;
  value: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  locations: Location[] = [
    {
      label: `Mombasa`,
      value: `mombasa`,
    },
    {
      label: `Mariakani`,
      value: `mariakani`,
    },
  ];

  travelForm:FormGroup = this.fb.group({
    fromLocation:[``, Validators.required],
    toLocation:[``, Validators.required],
    travelDate:[new Date(), Validators.required]
  })
  constructor(private fb: FormBuilder) { }
  searchMatatus(){
    console.log(`form values`, this.travelForm.value);
    
  }
}
