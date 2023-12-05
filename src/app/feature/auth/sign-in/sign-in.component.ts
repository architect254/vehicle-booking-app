import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, catchError, throwError, pipe } from 'rxjs';

import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup = this.fb.group({
    phone_number: [``, Validators.required],
    password: [``, Validators.required],
  });
  isSubmitting = false;

  $subscriptions!: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  get phoneNo() {
    return this.signInForm.get(`phone_number`);
  }
  get password() {
    return this.signInForm.get(`password`);
  }
  ngOnInit(){
    this.$subscriptions = this.authService.isAuthenticated().subscribe(isAuthenticated =>{
      if (isAuthenticated) {
        this.router.navigateByUrl(`/`)
      }
    })
  }

  submitForm() {
    this.isSubmitting = true;
    this.signInForm.disable();
    this.$subscriptions.add(
      this.authService
        .signIn(this.signInForm.getRawValue())
        .pipe(
          catchError((error: Error) => {
            if (error instanceof HttpErrorResponse) {
              return throwError(new Error(`${error.statusText}. ${error.error.message}`));
            } else {
              return throwError(
                new Error(`Something Went Wrong. Please try again later..`)
              );
            }
          })
        )
        .subscribe(
          () => {
            this.isSubmitting = false;
            this.router.navigateByUrl(`/`);
          },
          (error) => {
            this.isSubmitting = false;
            this.signInForm.enable();

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
