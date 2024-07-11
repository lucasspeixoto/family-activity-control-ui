import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AdminService } from './admin.service';

import { environment } from '@env/environment';
import { provideHttpClient } from '@angular/common/http';

describe('AdminService', () => {
  let service: AdminService;
  let httpTestingController: HttpTestingController;
  const apiUrl = `${environment.apiUrl}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AdminService);
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
  });

  /* describe('getBills', () => {
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
  }); */
});
