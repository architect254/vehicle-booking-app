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
    plateNumber: [``, Validators.required],
    type: [``, Validators.required],
    capacity: [``, Validators.required],
    routes: this.fb.array([]),
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private titleService: TitleService
  ) {}
  get routes() {
    return this.vehicleForm.get(`routes`) as FormArray;
  }
  ngOnInit(): void {
    this.action = this.router.url.split(`/`).pop();
    this.route.data.subscribe(
      (data) => (this.titleService.title = data[`title`])
    );
  }

  addRoute() {
    const routeForm: FormGroup = this.fb.group({
      route: [``, Validators.required],
      arrivalTime: [``, Validators.required],
      departureTime: [``, Validators.required],
    });
    this.routes.push(routeForm);
  }

  addVehicle() {
    console.log(`vehicle`, this.vehicleForm.value);
  }

  navigateToVehicleList() {
    this.router.navigate([`../../`], {
      relativeTo: this.route,
    });
  }
}
