import { Component } from '@angular/core';

@Component({
  selector: 'fac-avatar-group',
  exportAs: 'facAvatarGroup',
  styleUrls: ['./avatar-group.component.scss'],
  templateUrl: './avatar-group.component.html',
  host: {
    class: 'fac-avatar-group',
  },
  standalone: true,
})
export class AvatarGroupComponent {}
