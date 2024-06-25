import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { ULT_SEGMENTED } from '../types';
import { SegmentedComponent } from '../segmented/segmented.component';
import { MatRipple } from '@angular/material/core';
import { SegmentedIconDirective } from '../public-api';

@Component({
  selector: 'fac-segmented-button,[fac-segmented-button]',
  exportAs: 'facSegmentedButton',
  templateUrl: './segmented-button.component.html',
  styleUrl: './segmented-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [MatRipple],
  host: {
    class: 'fac-segmented-button',
    '[class.is-selected]': '_isSelected',
    '[class.is-disabled]': 'disabled',
  },
  standalone: true,
  imports: [SegmentedIconDirective],
})
export class SegmentedButtonComponent {
  protected _segmented = inject<SegmentedComponent>(ULT_SEGMENTED, {
    skipSelf: true,
  });

  @Input({ required: true })
  value: string;

  @Input({ transform: booleanAttribute })
  disabled = false;

  get _isSelected(): boolean {
    return this._segmented.api.isSelected(this.value);
  }

  get api() {
    return {
      isSelected: () => this._isSelected,
    };
  }

  @HostListener('click')
  private _handleClick() {
    this._segmented.api.select(this.value);
  }
}
