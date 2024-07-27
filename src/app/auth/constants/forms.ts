import { inject } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

export function createSignupForm() {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/),
      ],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
  });
}
export type SignupForm = ReturnType<typeof createSignupForm>;

export type Signup = ReturnType<SignupForm['getRawValue']>;

export function createSigninForm() {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    usernameOrEmail: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
  });
}
export type SigninForm = ReturnType<typeof createSigninForm>;

export type Signin = ReturnType<SignupForm['getRawValue']>;
