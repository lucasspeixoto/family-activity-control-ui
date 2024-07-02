import { Select } from '@shared/models/select';

export const billCategoryOptions: Select[] = [
  { value: 1, viewValue: 'Contas (Ex: Energia, água, etc...' },
  { value: 2, viewValue: 'Cartão de Crédito' },
  { value: 3, viewValue: 'Faculdade' },
  { value: 4, viewValue: 'Cartão Supermercado' },
];

export const billTypeOptions: Select[] = [
  { value: 'FIXED', viewValue: 'Gasto Fixo' },
  { value: 'VARIABLE', viewValue: 'Gasto Variável' },
];
