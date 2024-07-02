import { Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-suggestion,[app-suggestion]',
  exportAs: 'appSuggestion',
  standalone: true,
  imports: [],
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.scss',
  hostDirectives: [MatRipple],
})
export class SuggestionComponent {}
