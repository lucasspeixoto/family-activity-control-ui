import { Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'fac-suggestion,[fac-suggestion]',
  exportAs: 'facSuggestion',
  standalone: true,
  imports: [],
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.scss',
  hostDirectives: [MatRipple],
})
export class SuggestionComponent {}
