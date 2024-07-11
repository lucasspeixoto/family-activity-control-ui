import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { BillService } from './bill.service';
import { Bill } from '../model/bill';
import { environment } from '@env/environment';
import { BILL_LIST_MOCK, BILL_MOCK } from '@app/__mocks__/bill';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';

describe('BillService', () => {
  let service: BillService;
  let httpTestingController: HttpTestingController;
  const apiUrl = `${environment.apiUrl}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BillService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates service', () => {
    expect(service).toBeTruthy();
  });

  it('sets initial data', () => {
    expect(service.apiUrl).toEqual(apiUrl);
    expect(service.selectedBill()).toEqual(null);
    expect(service.isLoadingBill()).toEqual(false);
  });

  describe('applyBillsFilter', () => {
    it('should return trimmed and lowercased value from the input event', () => {
      const event = { target: { value: '  TEST  ' } } as unknown as Event;
      const result = service.applyBillsFilter(event);
      expect(result).toBe('test');
    });

    it('should return an empty string if the input event value is just spaces', () => {
      const event = { target: { value: '     ' } } as unknown as Event;
      const result = service.applyBillsFilter(event);
      expect(result).toBe('');
    });

    it('should return the lowercased value if there are no spaces to trim', () => {
      const event = { target: { value: 'TEST' } } as unknown as Event;
      const result = service.applyBillsFilter(event);
      expect(result).toBe('test');
    });

    it('should handle mixed case and spaces correctly', () => {
      const event = { target: { value: '  TeSt  ' } } as unknown as Event;
      const result = service.applyBillsFilter(event);
      expect(result).toBe('test');
    });
  });

  describe('getBills', () => {
    it('should return a list of bills', () => {
      let bills: Bill[] | undefined;
      service.getBills().subscribe(response => {
        bills = response;
      });
      const req = httpTestingController.expectOne(`${apiUrl}/bill`);
      req.flush([...BILL_LIST_MOCK]);
      expect(bills).toEqual([...BILL_LIST_MOCK]);
      expect(service.resources()).toEqual([...BILL_LIST_MOCK]);
    });

    it('should return a list of bills using waitForAsync', waitForAsync(() => {
      service.getBills().subscribe(response => {
        expect(response).toEqual([...BILL_LIST_MOCK]);
        expect(service.resources()).toEqual([...BILL_LIST_MOCK]);
      });
      const req = httpTestingController.expectOne(`${apiUrl}/bill`);
      req.flush([...BILL_LIST_MOCK]);
    }));
  });

  describe('createBill', () => {
    it('should create a new bill', waitForAsync(() => {
      const bill = BILL_MOCK;

      service.createBill(bill).subscribe(response => {
        expect(response).toEqual(bill);
        expect(service.resources().length).toEqual(1);
      });
      const req = httpTestingController.expectOne(`${apiUrl}/bill/create`);
      req.flush(bill);
    }));

    it('should pass the correct body', waitForAsync(() => {
      const bill = BILL_MOCK;
      service.createBill(bill).subscribe();
      const req = httpTestingController.expectOne(`${apiUrl}/bill/create`);
      req.flush(bill);

      expect(req.request.body).toEqual(bill);
      expect(req.request.method).toEqual('POST');
    }));

    it('throws an error if request fails', () => {
      const bill = BILL_MOCK;
      let actualError: HttpErrorResponse | undefined;
      service.createBill(bill).subscribe({
        next: () => {
          fail('Success should not be called');
        },
        error: _error => (actualError = _error),
      });
      const req = httpTestingController.expectOne(`${apiUrl}/bill/create`);
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessible entity',
      });

      if (!actualError) {
        throw new Error('Error needs to be defined');
      }

      expect(actualError.status).toEqual(422);
      expect(actualError.statusText).toEqual('Unprocessible entity');
    });
  });

  describe('updateBill', () => {
    it('should update a bill', waitForAsync(() => {
      const bill = BILL_MOCK;
      service.updateBill(bill).subscribe(response => {
        expect(response).toEqual(bill);
        expect(service.resources().length).toEqual(1);
      });
      const req = httpTestingController.expectOne(
        `${apiUrl}/bill/update/${bill.id}`
      );
      req.flush(bill);
    }));

    it('should pass the correct body', waitForAsync(() => {
      const bill = BILL_MOCK;
      service.updateBill(bill).subscribe();
      const req = httpTestingController.expectOne(
        `${apiUrl}/bill/update/${bill.id}`
      );
      req.flush(bill);

      expect(req.request.body).toEqual(bill);
      expect(req.request.method).toEqual('PUT');
    }));

    it('throws an error if request fails', () => {
      const bill = BILL_MOCK;
      let actualError: HttpErrorResponse | undefined;
      service.updateBill(bill).subscribe({
        next: () => {
          fail('Success should not be called');
        },
        error: _error => (actualError = _error),
      });
      const req = httpTestingController.expectOne(
        `${apiUrl}/bill/update/${bill.id}`
      );
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessible entity',
      });

      if (!actualError) {
        throw new Error('Error needs to be defined');
      }

      expect(actualError.status).toEqual(422);
      expect(actualError.statusText).toEqual('Unprocessible entity');
    });
  });

  describe('deleteBill', () => {
    it('should delete a bill', waitForAsync(() => {
      const bill = BILL_MOCK;
      service.deleteBill(bill.id!).subscribe(response => {
        expect(response).toEqual(bill);
        expect(service.resources().length).toEqual(0);
      });
      const req = httpTestingController.expectOne(
        `${apiUrl}/bill/delete/${bill.id}`
      );
      req.flush(bill);
    }));

    it('should pass the correct body', waitForAsync(() => {
      const bill = BILL_MOCK;
      service.deleteBill(bill.id!).subscribe();
      const req = httpTestingController.expectOne(
        `${apiUrl}/bill/delete/${bill.id}`
      );
      req.flush(bill);

      expect(req.request.body).toEqual(null);
      expect(req.request.method).toEqual('DELETE');
    }));

    it('throws an error if request fails', () => {
      const bill = BILL_MOCK;
      let actualError: HttpErrorResponse | undefined;
      service.deleteBill(bill.id!).subscribe({
        next: () => {
          fail('Success should not be called');
        },
        error: _error => (actualError = _error),
      });
      const req = httpTestingController.expectOne(
        `${apiUrl}/bill/delete/${bill.id}`
      );
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessible entity',
      });

      if (!actualError) {
        throw new Error('Error needs to be defined');
      }

      expect(actualError.status).toEqual(422);
      expect(actualError.statusText).toEqual('Unprocessible entity');
    });
  });

  describe('loading', () => {
    it('should set isLoading to true', () => {
      service.startLoadingBill();
      expect(service.isLoadingBill()).toBe(true);
    });

    it('should set isLoading to false', () => {
      service.stopLoadingBill();
      expect(service.isLoadingBill()).toBe(false);
    });
  });

  describe('selectedBill', () => {
    it('should set selected bill', () => {
      const bill = BILL_MOCK;
      service.setSelectedBill(bill);
      expect(service.selectedBill()).toBe(bill);
    });
  });
});
