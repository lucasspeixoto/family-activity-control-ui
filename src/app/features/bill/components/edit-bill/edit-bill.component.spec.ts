import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { BillService } from '@bill/services/bill.service';

import { provideHttpClient } from '@angular/common/http';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { provideNativeDateAdapter } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  click,
  dispatchFakeEvent,
  findEl,
} from '@app/spec-helpers/element.spec-helper';
import { DebugElement } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BILL_FORM_MOCK, BILL_MOCK } from '@app/__mocks__/bill';
import { of } from 'rxjs';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';
import { EditBillComponent } from './edit-bill.component';
import { billTypeOptions } from '../../constants/options';

describe('EditBillComponent', () => {
  let component: EditBillComponent;
  let fixture: ComponentFixture<EditBillComponent>;
  let billService: BillService;
  let snackBarService: SnackbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBillComponent, MatDialogModule, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNativeDateAdapter(),
        provideAnimationsAsync(),
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: '44b99384-5c1b-4109-b68d-bf19837489a2',
            title: 'Energia',
            owner: 'Lucas',
            amount: 100.2,
            categoryId: 'e71b6cd0-a12e-4005-afa8-c2c220b65459',
            description: 'Pagar energia',
            finishAt: new Date(),
            type: 'FIXED',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBillComponent);
    billService = TestBed.inject(BillService);
    snackBarService = TestBed.inject(SnackbarService);

    component = fixture.componentInstance;
    component.billTypeOptions = billTypeOptions;

    fixture.detectChanges();
  });

  const markFieldAsTouched = (element: DebugElement) => {
    dispatchFakeEvent(element.nativeElement, 'blur');
  };

  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  describe('visibility', () => {
    it('render initial form state', () => {
      const addForm = component.editBillForm;

      expect(addForm.controls.id.value).toEqual(
        '44b99384-5c1b-4109-b68d-bf19837489a2'
      );
      expect(addForm.controls.title.value).toEqual('Energia');
      expect(addForm.controls.owner.value).toEqual('Lucas');
      expect(addForm.controls.amount.value).toEqual(100.2);
      expect(addForm.controls.categoryId.value).toEqual(
        'e71b6cd0-a12e-4005-afa8-c2c220b65459'
      );
      expect(addForm.controls.description.value).toEqual('Pagar energia');
      expect(addForm.controls.type.value).toEqual('FIXED');
    });

    it('render Update button as not disabled', () => {
      const updateButtonElem = findEl(fixture, 'update-button');

      expect(updateButtonElem.nativeElement.disabled).toBeFalsy();
    });
  });

  describe(`Form Fields Validations`, () => {
    describe('Title Field', () => {
      it('should set the title in the form, when we set it in the model', () => {
        const input = findEl(fixture, 'title-field').nativeElement;

        input.value = 'Energia';
        input.dispatchEvent(new Event('input'));

        const titleControl = component.editBillForm.get('title')!;

        expect(input.value).toEqual('Energia');
        expect(titleControl.value).toEqual('Energia');
      });

      it('should have a required validation', () => {
        const titleControl = component.editBillForm.get('title')!;

        expect(titleControl.valid).toBeTruthy();

        titleControl.setValue('');
        fixture.detectChanges();

        expect(titleControl.valid).toBeFalsy();
      });

      it('should have a minLength validation', () => {
        const titleControl = component.editBillForm.get('title')!;

        titleControl.setValue('En');
        expect(titleControl.valid).toBeFalsy();
      });

      it('should render correct required error message', () => {
        const titleControl = component.editBillForm.get('title')!;
        titleControl.setValue('');

        const input = findEl(fixture, 'title-field');

        markFieldAsTouched(input);

        fixture.detectChanges();

        const requiredErrorField = findEl(fixture, 'title-required-error');

        expect(requiredErrorField).not.toBeNull();
        expect(requiredErrorField.nativeElement.textContent).toEqual(
          'Title is required'
        );
      });

      it('should render correct minLength error message', () => {
        const input = findEl(fixture, 'title-field');

        input.nativeElement.value = 'as';
        input.nativeElement.dispatchEvent(new Event('input'));

        markFieldAsTouched(input);

        fixture.detectChanges();

        const minlengthErrorField = findEl(fixture, 'title-minlength-error');

        expect(minlengthErrorField).not.toBeNull();
        expect(minlengthErrorField.nativeElement.textContent).toEqual(
          'Title field must contain 3 characteres'
        );
      });
    });

    describe('Owner Field', () => {
      it('should set the owner in the form, when we set it in the model', () => {
        const input = findEl(fixture, 'owner-field').nativeElement;

        input.value = 'Lucas';
        input.dispatchEvent(new Event('input'));

        const titleControl = component.editBillForm.get('owner')!;

        expect(input.value).toEqual('Lucas');
        expect(titleControl.value).toEqual('Lucas');
      });

      it('should have a required validation', () => {
        const titleControl = component.editBillForm.get('owner')!;

        expect(titleControl.valid).toBeTruthy();

        titleControl.setValue('');
        expect(titleControl.valid).toBeFalsy();
      });

      it('should have a minLength validation', () => {
        const titleControl = component.editBillForm.get('owner')!;

        titleControl.setValue('En');
        expect(titleControl.valid).toBeFalsy();
      });

      it('should render correct required error message', () => {
        const ownerControl = component.editBillForm.get('owner')!;
        ownerControl.setValue('');

        const input = findEl(fixture, 'owner-field');

        markFieldAsTouched(input);

        fixture.detectChanges();

        const requiredErrorField = findEl(fixture, 'owner-required-error');

        expect(requiredErrorField).not.toBeNull();
        expect(requiredErrorField.nativeElement.textContent).toEqual(
          'Owner is required'
        );
      });

      it('should render correct minLength error message', () => {
        const input = findEl(fixture, 'owner-field');

        input.nativeElement.value = 'as';
        input.nativeElement.dispatchEvent(new Event('input'));

        markFieldAsTouched(input);

        fixture.detectChanges();

        const minlengthErrorField = findEl(fixture, 'owner-minlength-error');

        expect(minlengthErrorField).not.toBeNull();
        expect(minlengthErrorField.nativeElement.textContent).toEqual(
          'Owner field must contain 3 characteres'
        );
      });
    });

    describe('Amount Field', () => {
      it('should set the amount in the form, when we set it in the model', () => {
        const input = findEl(fixture, 'amount-field').nativeElement;

        input.value = 100;
        input.dispatchEvent(new Event('input'));

        const amountControl = component.editBillForm.get('amount')!;

        expect(input.value).toEqual('100');
        expect(amountControl.value).toEqual(100);
      });

      it('should have a required validation', () => {
        const amountControl = component.editBillForm.get('amount')!;
        amountControl.setValue(null);

        expect(amountControl.valid).toBeFalsy();

        amountControl.setValue(100);
        expect(amountControl.valid).toBeTruthy();
      });

      it('should have a min validation', () => {
        const amountControl = component.editBillForm.get('amount')!;

        amountControl.setValue(0);
        expect(amountControl.valid).toBeFalsy();
      });

      it('should render correct min error message', () => {
        const input = findEl(fixture, 'amount-field');

        input.nativeElement.value = 0;
        input.nativeElement.dispatchEvent(new Event('input'));

        markFieldAsTouched(input);

        fixture.detectChanges();

        const minlengthErrorField = findEl(fixture, 'amount-min-error');

        expect(minlengthErrorField).not.toBeNull();
        expect(minlengthErrorField.nativeElement.textContent).toEqual(
          'Insert a amount value greater than 0'
        );
      });
    });

    describe('Description Field', () => {
      it('should set the description in the form, when we set it in the model', () => {
        const input = findEl(fixture, 'description-field').nativeElement;

        input.value = 'Pagar conta de energia';
        input.dispatchEvent(new Event('input'));

        const titleControl = component.editBillForm.get('description')!;

        expect(input.value).toEqual('Pagar conta de energia');
        expect(titleControl.value).toEqual('Pagar conta de energia');
      });

      it('should have a required validation', () => {
        const descriptionControl = component.editBillForm.get('description')!;

        expect(descriptionControl.valid).toBeTruthy();

        descriptionControl.setValue('');
        expect(descriptionControl.valid).toBeFalsy();
      });

      it('should have a minLength validation', () => {
        const descriptionControl = component.editBillForm.get('description')!;
        descriptionControl.setValue('En');

        expect(descriptionControl.valid).toBeFalsy();
      });

      it('should render correct required error message', () => {
        const descriptionControl = component.editBillForm.get('description')!;
        descriptionControl.setValue('');

        const input = findEl(fixture, 'description-field');

        markFieldAsTouched(input);

        fixture.detectChanges();

        const requiredErrorField = findEl(
          fixture,
          'description-required-error'
        );

        expect(requiredErrorField).not.toBeNull();
        expect(requiredErrorField.nativeElement.textContent).toEqual(
          'Description is required'
        );
      });

      it('should render correct minLength error message', () => {
        const input = findEl(fixture, 'description-field');

        input.nativeElement.value = 'as';
        input.nativeElement.dispatchEvent(new Event('input'));

        markFieldAsTouched(input);

        fixture.detectChanges();

        const minlengthErrorField = findEl(
          fixture,
          'description-minlength-error'
        );

        expect(minlengthErrorField).not.toBeNull();
        expect(minlengthErrorField.nativeElement.textContent).toEqual(
          'Description field must contain 3 characteres'
        );
      });
    });
  });

  describe('Insert form actions', () => {
    it('should call createBill from BillService and open snackbar when click in insert button', () => {
      const addForm = component.editBillForm;
      const bill = BILL_MOCK;

      jest.spyOn(snackBarService, 'showRightTopMessage').mockImplementation();
      jest.spyOn(billService, 'updateBill').mockReturnValue(of(bill));

      addForm.patchValue(BILL_FORM_MOCK);

      fixture.detectChanges();

      click(fixture, 'update-button');

      expect(billService.updateBill).toHaveBeenCalledTimes(1);
      expect(snackBarService.showRightTopMessage).toHaveBeenCalledWith(
        'Bill sucessfully updated'
      );
    });
  });
});
