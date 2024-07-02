import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  exportAs: 'appSuggestions',
  standalone: true,
  imports: [],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss',
  host: {
    class: 'app-suggestions',
  },
})
export class SuggestionsComponent {}
