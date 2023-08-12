import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from 'src/app/core/title.service';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.scss'],
})
export class ManageVehicleComponent implements OnInit {
  action!: string | undefined;
  vehicleId!: string;
  vehicleForm: FormGroup = this.fb.group({
    plate: [``, Validators.required],
    capacity: [``, Validators.required],
    origin: this.fb.group({
      origin: [``, Validators.required],
      arrivalTime: [``, Validators.required],
      departureTime: [``, Validators.required],
    }),
    destinations: this.fb.array([]),
  });
  destinationForm: FormGroup = this.fb.group({
    destination: [``, Validators.required],
    arrivalTime: [``, Validators.required],
    departureTime: [``, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private titleService: TitleService
  ) {}
  get destinations() {
    return this.vehicleForm.get(`destinations`) as FormArray;
  }
  ngOnInit(): void {
    this.action = this.router.url.split(`/`).pop();
    this.route.data.subscribe(
      (data) => (this.titleService.title = data[`heading`])
    );
  }

  addDestination() {
    this.destinations.push(this.destinationForm);
  }

  scrollToSubmit(el: HTMLElement) {
    console.log(`scrolling`, el);

    el.scrollIntoView();
  }
  addVehicle() {}

  navigateToVehicleList() {
    this.router.navigate([`../../`], {
      relativeTo: this.route,
    });
  }
}
