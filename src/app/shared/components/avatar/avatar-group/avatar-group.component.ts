import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar-group',
  exportAs: 'appAvatarGroup',
  styleUrls: ['./avatar-group.component.scss'],
  templateUrl: './avatar-group.component.html',
  host: {
    class: 'app-avatar-group',
  },
  standalone: true,
})
export class AvatarGroupComponent {}
