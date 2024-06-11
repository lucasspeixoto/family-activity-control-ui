import { booleanAttribute, Component, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { AnnouncementType } from '../types';

@Component({
  selector: 'fac-announcement',
  exportAs: 'facAnnouncement',
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss',
  host: {
    'class': 'fac-announcement'
  }
})
export class AnnouncementComponent {
  private _elementRef = inject(ElementRef);
  private _renderer = inject(Renderer2);

  @Input()
  set type(type: AnnouncementType) {
    this._renderer.setAttribute(this._elementRef.nativeElement, 'data-type', type || 'neutral');
  }

  @Input()
  iconName = '';

  @Input({ transform: booleanAttribute })
  closable = true;
}
