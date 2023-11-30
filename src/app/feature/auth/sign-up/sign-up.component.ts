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
    lastname: [``, Validators.required],
    phone_number: [``, Validators.required],
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
  get lastname() {
    return this.signUpForm.get(`lastname`);
  }
  get phoneNo() {
    return this.signUpForm.get(`phone_number`);
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
          concatMap(() => {
            this.isSubmitting = false;
            this.isSigningIn = true;
            const signInPayload = {...this.signUpForm.getRawValue(), password: this.signUpForm.getRawValue().confirmPassword};
            delete signInPayload.confirmPassword;
            delete signInPayload.role;
            return this.authService.signIn(signInPayload);
          }),
          catchError((error: HttpErrorResponse) => {
            this.isSubmitting = false;
            this.isSigningIn = true;
            this.signUpForm.enable();

            if (error instanceof HttpErrorResponse) {
              return throwError(new Error(`${error.statusText}. ${error.error.message}`));
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
            this.router.navigateByUrl(`/`);
          },
          (error) => {
            this.isSubmitting = false;
            this.isSigningIn = false;
            this.signUpForm.enable();

            const snackBarRef = this._snackBar.open(error.message, `Retry`, {
              panelClass: `alert-dialog`,
            })
            
            
            snackBarRef.onAction().subscribe(() => {
             this.submitForm()
            });
            
            snackBarRef.dismiss();
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.$subscriptions.unsubscribe();
  }
}
