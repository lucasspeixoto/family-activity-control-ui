import { Validators } from '@angular/forms';

export const billForm = {
  id: [''],
  title: ['', [Validators.required, Validators.minLength(3)]],
  owner: ['', [Validators.required, Validators.minLength(3)]],
  amount: [0, [Validators.required, Validators.min(1)]],
  category: ['', [Validators.required, Validators.minLength(3)]],
  description: ['', [Validators.required, Validators.minLength(3)]],
  finishAt: [new Date(), [Validators.required]],
  type: ['', [Validators.required]],
};

export const addTaskForm = {
  title: ['', [Validators.required, Validators.minLength(3)]],
  date: [new Date(), [Validators.required]],
};

export const billInitialFormValues = {
  title: '',
  owner: '',
  amount: 0,
  category: '',
  description: '',
  finishAt: '',
  type: '',
};
