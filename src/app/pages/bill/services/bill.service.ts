import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../model/bill';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  public getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/bill`);
  }
}
