import { Component } from '@angular/core';
import { EmrTimelineModule } from '@elementar/components';
import { EmrAvatarModule } from '@elementar/components';

@Component({
  selector: 'app-basic-timeline-example',
  standalone: true,
  imports: [
    EmrTimelineModule,
    EmrAvatarModule
  ],
  templateUrl: './basic-timeline-example.component.html',
  styleUrl: './basic-timeline-example.component.scss'
})
export class BasicTimelineExampleComponent {

}
