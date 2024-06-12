import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutApiService {
  public readonly sidebarVisibility = new EventEmitter<{ layoutId: string, hidden: boolean }>();

  public hideSidebar(layoutId: string): void {
    this.sidebarVisibility.emit({
      layoutId,
      hidden: true
    });
  }

  public showSidebar(layoutId: string): void {
    this.sidebarVisibility.emit({
      layoutId,
      hidden: false
    });
  }
}
