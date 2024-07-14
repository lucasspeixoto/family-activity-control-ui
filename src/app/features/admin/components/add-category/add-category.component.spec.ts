import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { provideHttpClient } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';

import { provideNativeDateAdapter } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  click,
  dispatchFakeEvent,
  findEl,
} from '@app/spec-helpers/element.spec-helper';
import { DebugElement } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BILL_FORM_MOCK } from '@app/__mocks__/bill';
import { CATEGORY_MOCK } from '@app/__mocks__/category';
import { of } from 'rxjs';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';

import { AddCategoryComponent } from './add-category.component';

import { CategoryService } from '@adminS/category/category.service';

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;
  let categoryService: CategoryService;
  let snackBarService: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddCategoryComponent, MatDialogModule, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNativeDateAdapter(),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryComponent);
    categoryService = TestBed.inject(CategoryService);
    snackBarService = TestBed.inject(SnackbarService);

    component = fixture.componentInstance;

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
      const addForm = component.addCategoryForm;

      expect(addForm.controls.id.value).toEqual('');
      expect(addForm.controls.title.value).toEqual('');
      expect(addForm.controls.description.value).toEqual('');
    });

    it('render Insert button as disabled', () => {
      const insertButtonElem = findEl(fixture, 'insert-button');

      expect(insertButtonElem.nativeElement.disabled).toBeTruthy();
    });
  });

  describe(`Form Fields Validations`, () => {
    describe('Title Field', () => {
      it('should set the title in the form, when we set it in the model', () => {
        const input = findEl(fixture, 'title-field').nativeElement;

        input.value = 'Gás';
        input.dispatchEvent(new Event('input'));

        const titleControl = component.addCategoryForm.get('title')!;

        expect(input.value).toEqual('Gás');
        expect(titleControl.value).toEqual('Gás');
      });

      it('should have a required validation', () => {
        const titleControl = component.addCategoryForm.get('title')!;

        expect(titleControl.valid).toBeFalsy();

        titleControl.setValue('Gás');
        expect(titleControl.valid).toBeTruthy();
      });

      it('should have a minLength validation', () => {
        const titleControl = component.addCategoryForm.get('title')!;

        titleControl.setValue('En');
        expect(titleControl.valid).toBeFalsy();
      });

      it('should render correct required error message', () => {
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

    describe('Description Field', () => {
      it('should set the description in the form, when we set it in the model', () => {
        const input = findEl(fixture, 'description-field').nativeElement;

        input.value = 'Pagar conta de energia';
        input.dispatchEvent(new Event('input'));

        const titleControl = component.addCategoryForm.get('description')!;

        expect(input.value).toEqual('Pagar conta de energia');
        expect(titleControl.value).toEqual('Pagar conta de energia');
      });

      it('should have a required validation', () => {
        const titleControl = component.addCategoryForm.get('description')!;

        expect(titleControl.valid).toBeFalsy();

        titleControl.setValue('Pagar Conta de Energia');
        expect(titleControl.valid).toBeTruthy();
      });

      it('should have a minLength validation', () => {
        const titleControl = component.addCategoryForm.get('description')!;

        titleControl.setValue('En');
        expect(titleControl.valid).toBeFalsy();
      });

      it('should render correct required error message', () => {
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
    it('should call createBill from CategoryService and open snackbar when click in insert button', () => {
      const addForm = component.addCategoryForm;
      const category = CATEGORY_MOCK;

      jest.spyOn(snackBarService, 'showRightTopMessage').mockImplementation();
      jest
        .spyOn(categoryService, 'createCategory')
        .mockReturnValue(of(category));

      addForm.patchValue(BILL_FORM_MOCK);

      fixture.detectChanges();

      click(fixture, 'insert-button');

      expect(categoryService.createCategory).toHaveBeenCalledTimes(1);
      expect(snackBarService.showRightTopMessage).toHaveBeenCalledWith(
        'Category sucessfully created'
      );
    });
  });
});
