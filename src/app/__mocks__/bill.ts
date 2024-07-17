import { DialogConfig } from '@app/shared/models/dialog-config.model';
import { Bill } from '@bill/model/bill';

export const DIALOG_CONFIG_MOCK: DialogConfig = {
  title: 'Delete Bill',
  subtitle: 'Do you realy want to delete this bill?',
  cancelButtonTitle: 'Cancel',
  confirmationButtonTitle: 'Confirm',
  id: '44b99384-5c1b-4109-b68d-bf19837489a2',
};

export const BILL_MOCK_ID: string = '44b99384-5c1b-4109-b68d-bf19837489a2';

export const BILL_MOCK: Bill = {
  id: '44b99384-5c1b-4109-b68d-bf19837489a2',
  title: 'Energia 1',
  owner: 'Lucas 1',
  amount: 100.2,
  categoryId: 'e71b6cd0-a12e-4005-afa8-c2c220b65459',
  description: 'Pagar energia',
  finishAt: new Date(),
  type: 'FIXED',
};

export const BILL_FORM_MOCK = {
  title: 'Energia',
  owner: 'Lucas',
  amount: 100.2,
  categoryId: 'e71b6cd0-a12e-4005-afa8-c2c220b65459',
  description: 'Pagar energia',
  finishAt: new Date(),
  type: 'FIXED',
};

export const BILL_LIST_MOCK: Bill[] = [
  {
    id: '44b99384-5c1b-4109-b68d-bf19837489a2',
    title: 'Energia 1',
    owner: 'Lucas 1',
    amount: 100.2,
    categoryId: 'e71b6cd0-a12e-4005-afa8-c2c220b65459',
    description: 'Pagar energia',
    finishAt: new Date(),
    type: 'FIXED',
  },
  {
    id: '2d387db6-317a-422a-b9e5-6dfe0593511e',
    title: 'Energia 2',
    owner: 'Lucas 2',
    amount: 101.2,
    categoryId: 'e71b6cd0-a12e-4005-afa8-c2c220b65459',
    description: 'Pagar energia',
    finishAt: new Date(),
    type: 'FIXED',
  },
  {
    id: '7f6f9fa9-85d5-4e73-a768-3ee36a0f84de',
    title: 'Energia 3',
    owner: 'Lucas 3',
    amount: 102.2,
    categoryId: 'e71b6cd0-a12e-4005-afa8-c2c220b65459',
    description: 'Pagar energia',
    finishAt: new Date(),
    type: 'FIXED',
  },
];
