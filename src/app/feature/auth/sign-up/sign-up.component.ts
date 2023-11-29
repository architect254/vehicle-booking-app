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
import { Subscription, catchError, concatMap, of, throwError } from 'rxjs';

import { AuthService } from 'src/app/core/auth.service';
import { UserRole } from 'src/app/misc/models/user-role.enum';
import { User } from 'src/app/misc/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup = this.fb.group({
    firstname: [``, Validators.required],
    surname: [``, Validators.required],
    phoneNo: [``, Validators.required],
    password: [``, Validators.required],
    confirmPassword: [``, Validators.required],
  });

  isSubmitting = false;

  isSigningIn = false;

  passwordMismatch: boolean = false;

  $subscriptions: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signUpForm.setValidators(this.passwordMisMatch);
    this.signUpForm.updateValueAndValidity();
  }

  get firstname() {
    return this.signUpForm.get(`firstname`);
  }
  get surname() {
    return this.signUpForm.get(`surname`);
  }
  get phoneNo() {
    return this.signUpForm.get(`phoneNo`);
  }
  get password() {
    return this.signUpForm.get(`password`);
  }
  get confirmPassword() {
    return this.signUpForm.get(`confirmPassword`);
  }

  ngOnInit(): void {}

  passwordMisMatch() {
    return (form: FormGroup) => {
      const password = form.get(`password`);
      const confirmPassword = form.get(`confirmPassword`);

      if (
        confirmPassword?.errors &&
        !confirmPassword.errors[`passwordMismatch`]
      ) {
        return;
      }

      if (password?.value !== confirmPassword?.value) {
        form.setErrors({ pinMatch: true });
      } else {
        form?.setErrors(null);
      }
    };
  }

  submitForm() {
    this.isSubmitting = true;
    this.signUpForm.disable();

    const signUpPayload = {...this.signUpForm.getRawValue(),  role: UserRole.ADMIN };
    delete signUpPayload.confirmPassword;

    this.$subscriptions.add(
      this.authService
        .signUp(signUpPayload)
        .pipe(
          concatMap((value: HttpResponse<any>) => {
            this.isSubmitting = false;
            this.isSigningIn = true;
            const signInPayload = {...this.signUpForm.getRawValue(), password: this.signUpForm.getRawValue().confirmPassword};
            delete signInPayload.confirmPassword;
            delete signInPayload.role;
            return this.authService.signIn(signInPayload);
          }),
          catchError((error: Error) => {
            this.isSubmitting = false;
            this.isSigningIn = true;
            this.signUpForm.enable();
            if (error instanceof HttpErrorResponse) {
              return throwError(new Error(`Invalid Input. Check then try again..`));
            } else {
              return throwError(new Error(`Something Went Wrong. Please try again later..`));
            }
          })
        )
        .subscribe(
          (user: User) => {
            this.isSubmitting = false;
            this.isSigningIn = false;
            this.authService.user = user;

          },
          (err) => {
            this.isSubmitting = false;
            this.isSigningIn = false;
            this.signUpForm.enable();

            this._snackBar.open(err.message, undefined, {
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
