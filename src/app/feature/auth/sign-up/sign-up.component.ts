import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, concatMap, throwError } from 'rxjs';

import { AuthService } from 'src/app/core/auth.service';
import { UserRole } from 'src/app/misc/models/user-role.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup = this.fb.group(
    {
      username: [``, Validators.required],
      pin: [``, Validators.required],
      confirmPin: [``, Validators.required],
    },
  );

  isSubmitting = false;

  isSigningIn = false;

  pinMismatch: boolean = false;

  $subscriptions: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signUpForm.setValidators(this.pinMatch)
    this.signUpForm.updateValueAndValidity();
  }

  get username() {
    return this.signUpForm.get(`username`);
  }
  get pin() {
    return this.signUpForm.get(`pin`);
  }
  get confirmPin() {
    return this.signUpForm.get(`confirmPin`);
  }

  ngOnInit(): void {}

  pinMatch() {
    return (form: FormGroup) => {
      debugger
      const pin = form.get(`pin`);
      const confirmPin = form.get(`confirmPin`);

      if (confirmPin?.errors && !confirmPin.errors[`pinMatch`]) {
        return;
      }

      if (pin?.value !== confirmPin?.value) {
        form.setErrors({ pinMatch: true });
      } else {
        form?.setErrors(null);
      }
    };
  }

  submitForm() {
    this.isSubmitting = true;
    this.signUpForm.disable();

    this.$subscriptions.add(
      this.authService
        .signUp({ ...this.signUpForm.getRawValue(), role: UserRole.LENDER })
        .pipe(
          concatMap(({ status }: HttpResponse<unknown>, i: number) => {
            this.isSubmitting = false;
            if (status == 201) {
              this.isSigningIn = true;
              return this.authService.signIn(this.signUpForm.getRawValue());
            }
            return throwError(
              () => new Error(`Something went wrong! Please try again later`)
            );
          })
        )
        .subscribe(
          () => {
            this.router.navigate([`/`]);
          },
          ({ error }: HttpErrorResponse) => {
            this.isSigningIn = false;
            this.signUpForm.enable();
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
