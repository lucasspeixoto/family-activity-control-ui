import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar-total,[app-avatar-total]',
  exportAs: 'appAvatarTotal',
  templateUrl: './avatar-total.component.html',
  styleUrl: './avatar-total.component.scss',
  host: {
    class: 'app-avatar-total',
  },
  standalone: true,
})
export class AvatarTotalComponent {}
