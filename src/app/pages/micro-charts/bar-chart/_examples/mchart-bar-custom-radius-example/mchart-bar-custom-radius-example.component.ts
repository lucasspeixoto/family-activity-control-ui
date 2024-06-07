import { Component } from '@angular/core';
import { MchartBarComponent } from '@elementar/components';
import { ShuffleArrayPipe } from '@meta/shuffle-array.pipe';

@Component({
  selector: 'app-mchart-bar-custom-radius-example',
  standalone: true,
  imports: [
    MchartBarComponent,
    ShuffleArrayPipe
  ],
  templateUrl: './mchart-bar-custom-radius-example.component.html',
  styleUrl: './mchart-bar-custom-radius-example.component.scss'
})
export class MchartBarCustomRadiusExampleComponent {

}
