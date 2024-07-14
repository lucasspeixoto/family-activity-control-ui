import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

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
import { of } from 'rxjs';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';
import { EditCategoryComponent } from './edit-category.component';
import { CATEGORY_FORM_MOCK, CATEGORY_MOCK } from '@app/__mocks__/category';
import { CategoryService } from '../../services/category/category.service';

describe('EditCategoryComponent', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;
  let categoryService: CategoryService;
  let snackBarService: SnackbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoryComponent, MatDialogModule, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNativeDateAdapter(),
        provideAnimationsAsync(),
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: '71616db6-7443-47fe-bc51-a94391dcb160',
            title: 'Gás',
            description: 'Gás',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCategoryComponent);
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
      const addForm = component.editCategoryForm;

      expect(addForm.controls.id.value).toEqual(
        '71616db6-7443-47fe-bc51-a94391dcb160'
      );
      expect(addForm.controls.title.value).toEqual('Gás');
      expect(addForm.controls.description.value).toEqual('Gás');
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

        const titleControl = component.editCategoryForm.get('title')!;

        expect(input.value).toEqual('Energia');
        expect(titleControl.value).toEqual('Energia');
      });

      it('should have a required validation', () => {
        const titleControl = component.editCategoryForm.get('title')!;

        expect(titleControl.valid).toBeTruthy();

        titleControl.setValue('');
        fixture.detectChanges();

        expect(titleControl.valid).toBeFalsy();
      });

      it('should have a minLength validation', () => {
        const titleControl = component.editCategoryForm.get('title')!;

        titleControl.setValue('En');
        expect(titleControl.valid).toBeFalsy();
      });

      it('should render correct required error message', () => {
        const titleControl = component.editCategoryForm.get('title')!;
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

    describe('Description Field', () => {
      it('should set the description in the form, when we set it in the model', () => {
        const input = findEl(fixture, 'description-field').nativeElement;

        input.value = 'Pagar conta de energia';
        input.dispatchEvent(new Event('input'));

        const titleControl = component.editCategoryForm.get('description')!;

        expect(input.value).toEqual('Pagar conta de energia');
        expect(titleControl.value).toEqual('Pagar conta de energia');
      });

      it('should have a required validation', () => {
        const descriptionControl =
          component.editCategoryForm.get('description')!;

        expect(descriptionControl.valid).toBeTruthy();

        descriptionControl.setValue('');
        expect(descriptionControl.valid).toBeFalsy();
      });

      it('should have a minLength validation', () => {
        const descriptionControl =
          component.editCategoryForm.get('description')!;
        descriptionControl.setValue('En');

        expect(descriptionControl.valid).toBeFalsy();
      });

      it('should render correct required error message', () => {
        const descriptionControl =
          component.editCategoryForm.get('description')!;
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
      const addForm = component.editCategoryForm;
      const category = CATEGORY_MOCK;

      jest.spyOn(snackBarService, 'showRightTopMessage').mockImplementation();
      jest
        .spyOn(categoryService, 'updateCategory')
        .mockReturnValue(of(category));

      addForm.patchValue(CATEGORY_FORM_MOCK);

      fixture.detectChanges();

      click(fixture, 'update-button');

      expect(categoryService.updateCategory).toHaveBeenCalledTimes(1);
      expect(snackBarService.showRightTopMessage).toHaveBeenCalledWith(
        'Category sucessfully updated'
      );
    });
  });
});
