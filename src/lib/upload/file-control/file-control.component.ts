import { Component } from '@angular/core';

@Component({
  selector: 'fac-file-control,[fac-file-control]',
  exportAs: 'facFileControl',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.scss'],
  host: {
    'class': 'fac-file-control'
  }
})
export class FileControlComponent {
}
