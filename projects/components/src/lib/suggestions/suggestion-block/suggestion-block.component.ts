import { booleanAttribute, Component, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'fac-suggestion-block',
  exportAs: 'facSuggestionBlock',
  standalone: true,
  imports: [
    MatDivider
  ],
  templateUrl: './suggestion-block.component.html',
  styleUrl: './suggestion-block.component.scss'
})
export class SuggestionBlockComponent {
  @Input()
  heading: string;

  @Input({ transform: booleanAttribute })
  showDivider = false;

  @Input({ transform: booleanAttribute })
  inline = false;
}
