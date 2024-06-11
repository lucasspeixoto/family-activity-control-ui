import { Component } from '@angular/core';

@Component({
  selector: 'fac-breadcrumb-item,[fac-breadcrumb-item]',
  exportAs: 'facBreadcrumbItem',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: ['./breadcrumb-item.component.scss'],
  host: {
    class: 'fac-breadcrumb-item'
  }
})
export class BreadcrumbItemComponent {
}
