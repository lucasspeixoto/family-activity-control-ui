import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { Bill } from '../model/bill';
import { environment } from '@env/environment';
import { ResourceService } from '@sharedS/resource/resource.service';
import { FeatureLoaderService } from '@app/shared/services/feature-loader.service';

@Injectable({
  providedIn: 'root',
})
export class BillService extends ResourceService<Bill> {
  public apiUrl = environment.apiUrl;

  public selectedBill = signal<Bill | null>(null);

  public isLoadingBill = signal(false);

  public hasFetchBillError = signal(false);

  public isABillSelected = computed(() => {
    return this.selectedBill() !== null;
  });

  private _featureLoader = inject(FeatureLoaderService);

  public getBills(): Observable<Bill[]> {
    this.hasFetchBillError.set(false);

    this._featureLoader.show();

    return this.http.get<Bill[]>(`${this.apiUrl}/bill`).pipe(
      finalize(() => this._featureLoader.hide()),
      tap(this.setResources),
      catchError(error => {
        this.hasFetchBillError.set(true);

        return throwError(() => error);
      })
    );
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
