import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../model/bill';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  public selectedBill = signal<Bill | null>(null);

  public isABillSelected = computed(() => {
    return this.selectedBill() !== null;
  });

  public getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/bill`);
  }

  public applyBillsFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return filterValue.trim().toLowerCase();
  }

  public setSelectedBill(bill: Bill | null) {
    this.selectedBill.set(bill);
  }
}
