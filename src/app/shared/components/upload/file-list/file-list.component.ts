import { Component } from '@angular/core';

@Component({
  selector: 'fac-file-list',
  exportAs: 'facFileList',
  templateUrl: './file-list.component.html',
  styleUrls: ['file-list.component.scss'],
  host: {
    'class': 'fac-file-list'
  }
})
export class FileListComponent {
}
