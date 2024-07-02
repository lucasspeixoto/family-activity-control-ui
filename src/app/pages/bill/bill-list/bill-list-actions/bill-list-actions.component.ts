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
    <div class="px-10 h-16 border-2 border-cyan-700">
      <div
        class="border-b dark:border-b-inverse h-full w-full flex items-center justify-between">
        <div class="flex items-center gap-1 md:gap-7">
          <div class="text-lg font-bold hidden md:block">Bills</div>
          <div class="hidden md:block">
            <app-v-divider class="my-3 h-8"></app-v-divider>
          </div>
          <div class="hidden sm:block items-center sm:gap-4">
            <button mat-stroked-button>
              <mat-icon class="font-icon">download</mat-icon>
              Download
            </button>
          </div>
          <div class="block sm:hidden items-center gap-1">
            <button mat-mini-fab>
              <mat-icon class="font-icon text-cyan-500">download</mat-icon>
            </button>
          </div>
        </div>
        <div class="my-4 w-full mx-4 flex items-center justify-end">
          <mat-icon
            class="text-neutral-500 dart:text-neutral-300 font-icon search-icon relative left-8"
            >search</mat-icon
          >
          <input
            type="text"
            class="pl-10 outline-none placeholder-neutral-500 dark:placeholder-neutral-300 border-none text-xs sm:text-md bg-neutral-200 dark:bg-neutral-700 py-3 rounded-lg"
            (keyup)="applyBillsFilter($event)"
            placeholder="Filter bills..."
            #input />
        </div>
        <div class="hidden sm:block">
          <button mat-flat-button>
            <mat-icon class="font-icon">add</mat-icon> New
          </button>
        </div>
        <div class="block sm:hidden">
          <button mat-mini-fab>
            <mat-icon class="font-icon">add</mat-icon>
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
