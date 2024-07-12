import { Component } from '@angular/core';
import { CategoryListComponent } from '../../components/category-list/category-list.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CategoryListComponent],
  templateUrl: './resources.component.html',
  styles: ``,
})
export class ResourcesComponent {}
