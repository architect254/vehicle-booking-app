import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnDestroy {
  signInForm: FormGroup = this.fb.group({
    username: [``, Validators.required],
    pin: [``, Validators.required],
  });
  isSubmitting = false;

  $subscriptions: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  get username() {
    return this.signInForm.get(`username`);
  }
  get pin() {
    return this.signInForm.get(`pin`);
  }

  submitForm() {
    this.isSubmitting = true;
    this.signInForm.disable();
    this.$subscriptions.add(
      this.authService.signIn(this.signInForm.getRawValue()).subscribe(
        () => {
          this.isSubmitting = false;
          this.router.navigate([`/`]);
        },
        ({ error }: HttpErrorResponse) => {
          this.isSubmitting = false;
          this.signInForm.enable();
          this._snackBar.open(`${error.message}`, undefined, {
            panelClass: `warn`,
          });
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.$subscriptions.unsubscribe();
  }
}
