import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BillService } from './bill.service';
import { Bill } from '../model/bill';

describe('BillService', () => {
  let service: BillService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BillService],
    });
    service = TestBed.inject(BillService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get an array of Bills with different lengths', fakeAsync(() => {
    // Arrange
    const mockBills = [
      { id: 1, name: 'Bill 1' },
      { id: 2, name: 'Bill 2' },
      { id: 3, name: 'Bill 3' },
    ];

    // Act
    service.getBills().subscribe(bills => {
      // Assert
      expect(bills.length).toBeGreaterThan(0);
      expect(bills.length).toBeLessThanOrEqual(mockBills.length);
      expect(bills).toEqual(expect.arrayContaining(mockBills));
    });

    // Assert HTTP request
    const req = httpMock.expectOne(`${service.apiUrl}/bill`);
    expect(req.request.method).toBe('GET');

    // Send response
    req.flush(mockBills);
  }));

  it('should handle empty array of Bills', fakeAsync(() => {
    // Arrange
    const mockEmptyBills: Bill[] = [];

    // Act
    service.getBills().subscribe(bills => {
      // Assert
      expect(bills.length).toBe(0);
      expect(bills).toEqual(expect.arrayContaining(mockEmptyBills));
    });

    // Assert HTTP request
    const req = httpMock.expectOne(`${service.apiUrl}/bill`);
    expect(req.request.method).toBe('GET');

    // Send response
    req.flush(mockEmptyBills);
  }));

  it('should handle error when getting Bills', fakeAsync(() => {
    // Arrange
    const error = new ErrorEvent('Network error');
    httpMock.expectOne(`${service.apiUrl}/bill`).error(error);

    // Act
    service.getBills().subscribe(
      () => fail('Expected an error'),
      err => {
        // Assert
        expect(err).toBe(error);
      }
    );
  }));
});
