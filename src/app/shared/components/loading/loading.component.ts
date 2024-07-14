import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  template: `
    <div class="overlay">
      <div class="center">
        <mat-progress-spinner
          diameter="50"
          mode="indeterminate"
          color="primary">
        </mat-progress-spinner>
      </div>
    </div>
  `,
  styles: `
    .center {
      position: absolute;
      top: 50%;
      left: 50%;
      -moz-transform: translateX(-50%) translateY(-50%);
      -webkit-transform: translateX(-50%) translateY(-50%);
      transform: translateX(-50%) translateY(-50%);
    }

    .overlay {
      height: 100vh;
      width: 100%;
      background-color: var(--app-incidents-list-bg);
      z-index: 9999;
      top: 0;
      left: 0;
      position: fixed;
    }
  `,
  imports: [MatProgressSpinnerModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
