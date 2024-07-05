import { computed, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Bill } from '../model/bill';
import { environment } from 'src/environments/environment';
import { ResourceService } from '@shared/services/resource.service';

@Injectable({
  providedIn: 'root',
})
export class BillService extends ResourceService<Bill> {
  private apiUrl = environment.apiUrl;

  public selectedBill = signal<Bill | null>(null);

  public isABillSelected = computed(() => {
    return this.selectedBill() !== null;
  });

  public isLoadingBill = signal(false);

  public bills = signal<Bill[]>([]);

  public getBills(): Observable<Bill[]> {
    return this.http
      .get<Bill[]>(`${this.apiUrl}/bill`)
      .pipe(tap(this.setResources));
  }

  public createBill(bill: Bill): Observable<Bill> {
    return this.http
      .post<Bill>(`${this.apiUrl}/bill/create`, bill)
      .pipe(tap(this.upsertResource));
  }

  public updateBill(bill: Bill): Observable<Bill> {
    return this.http
      .put<Bill>(`${this.apiUrl}/bill/update/${bill.id}`, bill)
      .pipe(tap(this.upsertResource));
  }

  public deleteBill(id: string): Observable<Bill> {
    return this.http
      .delete<Bill>(`${this.apiUrl}/bill/delete/${id}`)
      .pipe(tap(() => this.removeResource(id)));
  }

  public applyBillsFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return filterValue.trim().toLowerCase();
  }

  public setSelectedBill(bill: Bill | null) {
    this.selectedBill.set(bill);
  }

  public startLoadingBill() {
    this.isLoadingBill.set(true);
  }

  public stopLoadingBill() {
    this.isLoadingBill.set(false);
  }
}
