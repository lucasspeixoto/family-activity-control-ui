import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

import { MatRipple } from '@angular/material/core';

import { ToolbarComponent } from '@layoutC/sidebar/_toolbar/toolbar.component';

import { OrderByPipe } from '@shared/pipes/order-by.pipe';
import {
  NavigationComponent,
  NavigationDividerComponent,
  NavigationGroupComponent,
  NavigationGroupMenuComponent,
  NavigationGroupToggleComponent,
  NavigationGroupToggleIconDirective,
  NavigationHeadingComponent,
  NavigationItemComponent,
  NavigationItemIconDirective,
} from '@shared/components/navigation';

export interface NavItem {
  type: string;
  name: string;
  icon?: string;
  id?: string | number;
  link?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    MatRipple,
    ToolbarComponent,
    OrderByPipe,
    NavigationComponent,
    NavigationGroupMenuComponent,
    NavigationGroupComponent,
    NavigationGroupToggleComponent,
    NavigationHeadingComponent,
    NavigationItemComponent,
    NavigationDividerComponent,
    NavigationItemIconDirective,
    NavigationGroupToggleIconDirective,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  host: {
    class: 'sidebar',
  },
})
export class SidebarComponent implements OnInit {
  public router = inject(Router);
  public location = inject(Location);
  public height: string | null = '200px';

  @ViewChild('navigation', { static: true })
  public navigation!: string;

  public navItems: NavItem[] = [
    {
      id: 'bill',
      type: 'group',
      icon: 'paid',
      name: 'Bill',
      children: [
        {
          type: 'link',
          name: 'Bill List',
          link: '/pages/bill/bills/list',
        },
      ],
    },
  ];
  navItemLinks: NavItem[] = [];
  activeLinkId: string | null = '/';

  ngOnInit() {
    this.navItems.forEach(navItem => {
      this.navItemLinks.push(navItem);

      if (navItem.children) {
        this.navItemLinks = this.navItemLinks.concat(
          navItem.children as NavItem[]
        );
      }
    });
    this._activateLink();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this._activateLink();
      });
  }

  private _activateLink() {
    const activeLink = this.navItemLinks.find(
      navItem => navItem.link === this.location.path()
    );

    if (activeLink) {
      this.activeLinkId = activeLink.link!;
    } else {
      this.activeLinkId = null;
    }
  }
}
