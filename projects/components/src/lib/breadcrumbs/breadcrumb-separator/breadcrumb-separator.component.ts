import { Component } from '@angular/core';

@Component({
  selector: 'fac-breadcrumb-separator',
  exportAs: 'facBreadcrumbSeparator',
  templateUrl: './breadcrumb-separator.component.html',
  styleUrls: ['./breadcrumb-separator.component.scss'],
  host: {
    class: 'fac-breadcrumb-separator'
  }
})
export class BreadcrumbSeparatorComponent {
}
