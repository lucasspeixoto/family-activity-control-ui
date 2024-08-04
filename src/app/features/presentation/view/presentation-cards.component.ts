import { Component } from '@angular/core';
import { FeatureCardComponent } from '../components/feature-card/feature-card.component';
import { featureItems } from '../constants/features-items';

@Component({
  selector: 'app-presentation-cards',
  standalone: true,
  imports: [FeatureCardComponent],
  templateUrl: './presentation-cards.component.html',
  styles: ``,
})
export class PresentationCardsComponent {
  public featureItems = featureItems;
}
