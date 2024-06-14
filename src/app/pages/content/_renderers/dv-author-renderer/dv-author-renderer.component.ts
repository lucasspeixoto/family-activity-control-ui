import { Component, Input } from '@angular/core';
import { AvatarComponent } from '@shared/components/avatar';
import { InitialsPipe } from '@shared/pipes/initials.pipe';

@Component({
  selector: 'app-dv-author-renderer',
  standalone: true,
  imports: [InitialsPipe, AvatarComponent],
  templateUrl: './dv-author-renderer.component.html',
  styleUrl: './dv-author-renderer.component.scss',
})
export class DvAuthorRendererComponent {
  @Input()
  element: any;

  @Input()
  columnDef: any;

  @Input()
  fieldData: any;
}
