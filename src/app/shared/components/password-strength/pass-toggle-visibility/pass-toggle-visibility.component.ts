import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'fac-pass-toggle-visibility',
    exportAs: 'facPassToggleVisibility',
    templateUrl: './pass-toggle-visibility.component.html',
    styleUrls: ['./pass-toggle-visibility.component.scss'],
    standalone: true,
    imports: [MatIconButton, MatRipple, MatIcon]
})
export class PassToggleVisibilityComponent {
  @Input()
  isVisible: boolean;

  @Input()
  tabindex?: string;

  get type() {
    return this.isVisible ? 'text' : 'password';
  }
}
