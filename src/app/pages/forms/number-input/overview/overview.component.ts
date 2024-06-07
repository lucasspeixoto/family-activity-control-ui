import { Component } from '@angular/core';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import {
  BasicNumberInputExampleComponent
} from '../_examples/basic-number-input-example/basic-number-input-example.component';
import {
  NumberInputCustomControlsExampleComponent
} from '../_examples/number-input-custom-controls-example/number-input-custom-controls-example.component';
import {
  NumberInputMinMaxExampleComponent
} from '../_examples/number-input-min-max-example/number-input-min-max-example.component';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    PlaygroundComponent,
    BasicNumberInputExampleComponent,
    NumberInputCustomControlsExampleComponent,
    NumberInputMinMaxExampleComponent,
    PageComponent,
    PageContentDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
