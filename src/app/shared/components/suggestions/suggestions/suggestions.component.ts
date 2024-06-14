import { Component } from '@angular/core';

@Component({
  selector: 'fac-suggestions',
  exportAs: 'facSuggestions',
  standalone: true,
  imports: [],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss',
  host: {
    class: 'fac-suggestions',
  },
})
export class SuggestionsComponent {}
