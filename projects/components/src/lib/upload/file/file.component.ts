import { Component, Input } from '@angular/core';
import { UploadFileState } from '../properties';

@Component({
  selector: 'fac-file',
  exportAs: 'facFile',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  host: {
    'class': 'fac-file'
  }
})
export class FileComponent {
  @Input()
  name!: string | number;

  @Input()
  size!: string | unknown;

  @Input()
  progress!: number | unknown;

  @Input()
  progressingMessage!: string | unknown;

  @Input()
  errorMessage!: string | unknown;

  @Input()
  remainingTime!: string | unknown;

  @Input()
  state: UploadFileState = 'uploading';
}
