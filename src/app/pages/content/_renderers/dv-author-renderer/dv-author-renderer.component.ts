import { Component, Input } from '@angular/core';
import { InitialsPipe } from '@shared/pipes/initials.pipe';
import { EmrAvatarModule } from '@shared/components/avatar';

@Component({
  selector: 'app-dv-author-renderer',
  standalone: true,
  imports: [
    EmrAvatarModule,
    InitialsPipe
  ],
  templateUrl: './dv-author-renderer.component.html',
  styleUrl: './dv-author-renderer.component.scss'
})
export class DvAuthorRendererComponent {
  @Input()
  element: any;

  @Input()
  columnDef: any;

  @Input()
  fieldData: any;
}
