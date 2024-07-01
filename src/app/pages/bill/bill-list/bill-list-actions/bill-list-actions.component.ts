import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { VDividerComponent } from '@shared/components/divider';

@Component({
  selector: 'app-bill-list-actions',
  standalone: true,
  imports: [MatButton, MatIcon, VDividerComponent, MatIconButton],
  template: `
    <div class="px-10 h-16">
      <div
        class="border-b dark:border-b-inverse h-full flex items-center justify-between">
        <div class="flex items-center gap-7">
          <div class="text-lg font-bold">Bills</div>
          <app-v-divider class="my-3 h-8"></app-v-divider>
          <div class="flex items-center gap-4">
            <button mat-stroked-button>
              <mat-icon class="font-icon">download</mat-icon>Download
            </button>
          </div>
        </div>
        <div class="my-4 pl-10 w-full mx-4 flex items-center justify-end">
          <mat-icon
            class="text-neutral-500 dart:text-neutral-300 font-icon search-icon relative left-8"
            >search</mat-icon
          >
          <input
            type="text"
            class="pl-10 outline-none placeholder-neutral-500 dark:placeholder-neutral-300 border-none text-md bg-neutral-200 dark:bg-neutral-700 py-3 rounded-lg"
            (keyup)="applyBillsFilter($event)"
            placeholder="Filter bills..."
            #input />
        </div>
        <div>
          <button mat-flat-button>
            <mat-icon class="font-icon">add</mat-icon> New
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillListActionsComponent {
  @Output() applyBillsFilterHandler = new EventEmitter();

  public applyBillsFilter(event: Event) {
    this.applyBillsFilterHandler.emit(event);
  }
}
