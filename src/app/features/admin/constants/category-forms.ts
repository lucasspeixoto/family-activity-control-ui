import { Validators } from '@angular/forms';

export const categoryForm = {
  id: [''],
  title: ['', [Validators.required, Validators.minLength(3)]],
  description: ['', [Validators.required, Validators.minLength(3)]],
};

export const categoryInitialFormValues = {
  title: '',
  description: '',
};
