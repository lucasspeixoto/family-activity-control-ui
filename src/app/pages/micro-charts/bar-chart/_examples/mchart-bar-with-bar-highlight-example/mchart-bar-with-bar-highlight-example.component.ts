import { Component } from '@angular/core';
import { MchartBarComponent } from '@elementar/components';
import { ShuffleArrayPipe } from '@meta/shuffle-array.pipe';

@Component({
  selector: 'app-mchart-bar-with-bar-highlight-example',
  standalone: true,
  imports: [
    MchartBarComponent,
    ShuffleArrayPipe
  ],
  templateUrl: './mchart-bar-with-bar-highlight-example.component.html',
  styleUrl: './mchart-bar-with-bar-highlight-example.component.scss'
})
export class MchartBarWithBarHighlightExampleComponent {

}
