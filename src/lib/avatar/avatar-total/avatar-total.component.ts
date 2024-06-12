import { Component } from '@angular/core';

@Component({
  selector: 'fac-avatar-total,[fac-avatar-total]',
  exportAs: 'facAvatarTotal',
  templateUrl: './avatar-total.component.html',
  styleUrl: './avatar-total.component.scss',
  host: {
    'class': 'fac-avatar-total'
  }
})
export class AvatarTotalComponent {
}
