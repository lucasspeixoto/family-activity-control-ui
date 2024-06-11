import {
  Component
} from '@angular/core';
import { INCIDENTS } from '../properties';

@Component({
  selector: 'fac-incidents',
  exportAs: 'facIncidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss'],
  providers: [
    {
      provide: INCIDENTS,
      useExisting: IncidentsComponent
    }
  ],
  host: {
    'class': 'fac-incidents',
    '[class.is-visible]': 'isVisible',
  }
})
export class IncidentsComponent {
  isVisible = false;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}
