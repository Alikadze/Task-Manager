import { Component, OnDestroy, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthFacade } from '../../../core/facades/auth.facade';
import { Router } from '@angular/router';
import { AuthPayload } from '../../../core/interfaces/auth-payload';
import { Subject, catchError, from, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  form = new FormGroup({
    firstName: new FormControl<string>('',Validators.required),
    lastName: new FormControl<string>('',Validators.required),
    email: new FormControl<string>('',[Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8) ,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
  });

  authFacade = inject(AuthFacade);
  router = inject(Router);

  
  sub$ = new Subject();

  errorMessage: string | null = null;
  successMessage: string | null = null;

  

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid){
      if (this.form.get('firstName')?.errors?.['required']) {
        this.errorMessage = 'First Name is required';
      } else if (this.form.get('lastName')?.errors?.['required']) {
        this.errorMessage = 'Last Name is required';
      } else if (this.form.get('email')?.errors?.['required']) {
        this.errorMessage = 'Email is required';
      } else if (this.form.get('email')?.errors?.['pattern']) {
        this.errorMessage = 'Invalid email format';
      } else if (this.form.get('password')?.errors?.['required']) {
        this.errorMessage = 'Password is required';
      } else if (this.form.get('password')?.errors?.['minlength']) {
        this.errorMessage = "Your password must have at least 8 characters";
      } else if (this.form.get('password')?.errors?.['pattern']) {
        this.errorMessage = 'Your password must contain at least one number, one symbol and have a mixture of uppercase and lowercase letters'
      }
      return;
    }
    

    if (this.form.invalid){
      return
    }

    this.errorMessage = null;
    this.successMessage = null;

    const {firstName, lastName ,email, password, } = this.form.value as {firstName: string, lastName: string, email: string, password: string};

    firstName.trim();
    lastName.trim();
    email.trim();
    password.trim();

    const payLoad: AuthPayload = {
      firstName,
      lastName,
      email,
      password,
    }

    this.authFacade.register(payLoad)
        .pipe(
            takeUntil(this.sub$),
            catchError((err) => {
              this.errorMessage = err.error?.message ?? 'An unknown error occurred';
              return throwError(() => this.errorMessage);
          })
        )
        .subscribe((res) => {
            if (res) {
                this.successMessage = 'Create Your First Project';
                  setTimeout(() => {
                    this.router.navigate(['/workspace/add'])
                    window.scrollTo(0, 0);
                  }, 2000)
              }
        })

    }

    ngOnDestroy(): void {
      this.sub$.next(null);
      this.sub$.complete(); 
    }
}




