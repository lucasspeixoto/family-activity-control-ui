import { Component, Input } from '@angular/core';

@Component({
  selector: 'fac-pass-toggle-visibility',
  exportAs: 'facPassToggleVisibility',
  templateUrl: './pass-toggle-visibility.component.html',
  styleUrls: ['./pass-toggle-visibility.component.scss']
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
