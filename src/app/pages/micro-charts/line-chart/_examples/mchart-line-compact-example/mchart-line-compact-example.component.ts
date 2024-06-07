import { Component } from '@angular/core';
import { MchartLineComponent } from '@elementar/components';
import { ShuffleArrayPipe } from '@meta/shuffle-array.pipe';

@Component({
  selector: 'app-mchart-line-compact-example',
  standalone: true,
  imports: [
    MchartLineComponent,
    ShuffleArrayPipe
  ],
  templateUrl: './mchart-line-compact-example.component.html',
  styleUrl: './mchart-line-compact-example.component.scss'
})
export class MchartLineCompactExampleComponent {

}
