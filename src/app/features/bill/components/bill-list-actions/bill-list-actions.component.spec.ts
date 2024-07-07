import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { BillService } from '../../services/bill.service';
import { BillListActionsComponent } from './bill-list-actions.component';
import { provideHttpClient } from '@angular/common/http';
import {
  BILL_MOCK,
  BILL_MOCK_ID,
  DIALOG_CONFIG_MOCK,
} from '@app/__mocks__/bill';
import { first } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddBillComponent } from '../add-bill/add-bill.component';
import { EditBillComponent } from '../edit-bill/edit-bill.component';
import { DialogService } from '@sharedS/dialog/dialog.service';
import { ConfirmationComponent } from '@sharedC/confirmation/confirmation.component';
import { of } from 'rxjs';
import { ConfirmDialogResult } from '../../model/confirm-dialog-result';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('BillListActionsComponent', () => {
  let component: BillListActionsComponent;
  let fixture: ComponentFixture<BillListActionsComponent>;
  let billService: BillService;
  let dialogService: DialogService;
  let dialog: MatDialog;

  let searchInput: HTMLInputElement;
  let billSearchTermEventSpy: jest.SpyInstance;

  let dialogRef: MatDialogRef<ConfirmationComponent, ConfirmDialogResult>;

  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BillListActionsComponent, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BillListActionsComponent);
    billService = TestBed.inject(BillService);
    dialogService = TestBed.inject(DialogService);
    dialog = TestBed.inject(MatDialog);
    dialogRef = TestBed.inject(MatDialogRef);
    snackBar = TestBed.inject(MatSnackBar);

    component = fixture.componentInstance;

    searchInput = fixture.debugElement.query(
      By.css('[data-testid="input-filter"]')
    ).nativeElement;
    billSearchTermEventSpy = jest.spyOn(component.billSearchTermEvent, 'emit');

    fixture.detectChanges();
  });

  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  describe('Update and Delete buttons visibility', () => {
    it('should start with update and delete button disabled', () => {
      expect(
        fixture.debugElement.query(By.css('[data-testid="update-button"]'))
          .nativeElement.disabled
      ).toBeTruthy();

      expect(
        fixture.debugElement.query(By.css('[data-testid="delete-button"]'))
          .nativeElement.disabled
      ).toBeTruthy();
    });

    it('should enable update and delete buttons when a bill is selected', () => {
      billService.setSelectedBill(BILL_MOCK);
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('[data-testid="update-button"]'))
          .nativeElement.disabled
      ).toBeFalsy();

      expect(
        fixture.debugElement.query(By.css('[data-testid="delete-button"]'))
          .nativeElement.disabled
      ).toBeFalsy();
    });
  });

  describe('billSearchTermEvent', () => {
    it('should not emit billSearchTermEvent when input event is not a KeyboardEvent', () => {
      const mockEvent = {
        target: { value: 'energia' },
      } as unknown as KeyboardEvent;

      component.applyBillsFilter(mockEvent);
      expect(billSearchTermEventSpy).not.toHaveBeenCalled();
    });

    it('should emit billSearchTermEvent after 400ms delay when input value change', fakeAsync(() => {
      let searchTerm!: string | null | undefined;
      const searchInputValue = 'energia';

      component.billSearchTermEvent.pipe(first()).subscribe(text => {
        searchTerm = text;
      });

      const keyBoardEvent = new KeyboardEvent('keyup', {
        key: searchInputValue!,
      });

      searchInput.dispatchEvent(keyBoardEvent);
      searchInput.value = searchInputValue;

      tick(400);

      expect(searchTerm).toEqual(searchInputValue);
      expect(billSearchTermEventSpy).toHaveBeenCalledWith(searchInputValue);
    }));
  });

  describe('addNewBillHandler', () => {
    it('should open dialog with AddBillComponent', () => {
      jest.spyOn(dialog, 'open').mockImplementation();

      component.addNewBillHandler();

      expect(dialog.open).toHaveBeenCalledWith(AddBillComponent, {
        minWidth: '45%',
      });
    });
  });

  describe('updateBillHandler', () => {
    it('should open dialog with EditBillComponent', () => {
      jest.spyOn(dialog, 'open').mockImplementation();

      const bill = BILL_MOCK;
      billService.setSelectedBill(bill);

      component.updateBillHandler();
      expect(dialog.open).toHaveBeenCalledWith(EditBillComponent, {
        minWidth: '45%',
        data: bill,
      });
    });
  });

  describe('deleteBillHandler', () => {
    it('should open dialog with ConfirmationComponent when confirm is emitted', () => {
      const bill = BILL_MOCK;

      jest.spyOn(dialog, 'open').mockReturnValue({
        afterClosed: () => of('confirm'),
      } as MatDialogRef<ConfirmationComponent, ConfirmDialogResult>);
      jest.spyOn(snackBar, 'open').mockImplementation();
      jest.spyOn(billService, 'deleteBill').mockReturnValue(of(bill));

      billService.setSelectedBill(bill);

      component.deleteBillHandler();

      expect(dialog.open).toHaveBeenCalledWith(ConfirmationComponent, {
        width: '350px',
        data: DIALOG_CONFIG_MOCK,
      });

      expect(billService.deleteBill).toHaveBeenCalledWith(bill.id);
      expect(snackBar.open).toHaveBeenCalledWith(
        'Bill successfully deleted',
        'Close',
        {
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      );
    });

    it('should open dialog with ConfirmationComponent when cancel is emitted', () => {
      const bill = BILL_MOCK;

      jest.spyOn(dialog, 'open').mockReturnValue({
        afterClosed: () => of('cancel'),
      } as MatDialogRef<ConfirmationComponent, ConfirmDialogResult>);

      jest.spyOn(snackBar, 'open').mockImplementation();

      jest.spyOn(billService, 'deleteBill').mockReturnValue(of(bill));

      billService.setSelectedBill(bill);

      component.deleteBillHandler();

      expect(dialog.open).toHaveBeenCalledWith(ConfirmationComponent, {
        width: '350px',
        data: DIALOG_CONFIG_MOCK,
      });

      expect(billService.deleteBill).not.toHaveBeenCalled();
      expect(snackBar.open).not.toHaveBeenCalled();
    });
  });

  it('should call getDeleteDialogData with correct parameters', () => {
    jest.spyOn(dialogService, 'getDeleteDialogData').mockImplementation();

    const billId = BILL_MOCK_ID;

    component.getDeleteBillDialogData(billId);

    expect(dialogService.getDeleteDialogData).toHaveBeenCalledWith(
      billId,
      'Delete Bill',
      'Do you realy want to delete this bill?'
    );
  });
});
