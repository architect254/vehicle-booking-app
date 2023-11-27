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

    this.$subscriptions.add(
      this.authService
        .signUp({ ...this.signUpForm.getRawValue(), role: UserRole.ADMIN })
        .pipe(
          concatMap((value: HttpResponse<any>) => {
            this.isSubmitting = false;
            this.isSigningIn = true;
            return this.authService.signIn({
              ...this.signUpForm.getRawValue(),
            });
          }),
          catchError((error: Error) => {
            this.isSubmitting = false;
            this.isSigningIn = true;
            this.signUpForm.enable();
            if (error instanceof HttpErrorResponse) {
              console.log(`dksjkdnjks`, error)
              return of(new Error((error as any).title));
            } else {
              return of(
                new Error(`Something Went Wrong. Please try again later..`)
              );
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
