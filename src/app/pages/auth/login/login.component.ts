import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { AuthPayload } from '../../../core/interfaces/auth-payload';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form = new FormGroup({
    email: new FormControl<string>('',Validators.required),
    password: new FormControl<string>('',Validators.required)
  })

  authFacade = inject(AuthFacade);

  sub$ = new Subject();


  errorMessage: string | null = null;
  successMessage: string | null = null;
  router = inject(Router);

  login() {
    this.form.markAllAsTouched();

    if (this.form.invalid){
      if (this.form.get('email')?.errors?.['required']) {
        this.errorMessage = 'Email is required';
      } else if (this.form.get('password')?.errors?.['required']) {
        this.errorMessage = 'Password is required';
      } 
      return;
    }

    if (this.form.invalid){
      return
    }

    this.errorMessage = null;
    this.successMessage = null;

    const {email, password} = this.form.value as {email: string, password: string};



    const payload: AuthPayload = {
      email,
      password
    };



    this.authFacade.login(payload)
      .pipe(
        takeUntil(this.sub$),

        catchError((err) => {
          this.errorMessage = err.error?.message ?? 'An unknown error occurred';
          return throwError(() => this.errorMessage);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.successMessage = 'You have successfully Signed Up';
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 2000)
        }
     })
  }
  
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete(); 
  }
}
