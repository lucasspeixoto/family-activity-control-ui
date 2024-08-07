import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

import { MatRipple } from '@angular/material/core';

import { ToolbarComponent } from '@layoutC/sidebar/_toolbar/toolbar.component';

import {
  NavigationComponent,
  NavigationDividerComponent,
  NavigationGroupComponent,
  NavigationGroupMenuComponent,
  NavigationGroupToggleComponent,
  NavigationGroupToggleIconDirective,
  NavigationItemComponent,
  NavigationItemIconDirective,
} from '@shared/components/navigation';
import { MenuItem } from '@app/layout/types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    MatRipple,
    ToolbarComponent,
    NavigationComponent,
    NavigationGroupMenuComponent,
    NavigationGroupComponent,
    NavigationGroupToggleComponent,
    NavigationItemComponent,
    NavigationDividerComponent,
    NavigationItemIconDirective,
    NavigationGroupToggleIconDirective,
  ],
  template: `
    <div
      class="h-full flex flex-col w-[300px] rounded-e-xl dark:bg-neutral-900 bg-neutral-100 overflow-y-auto overflow-x-hidden">
      <div class="flex-none flex items-center h-16">
        <a routerLink="/" class="font-bold text-sm md:text-lg px-5 logo"
          >Family Control</a
        >
        <img
          alt="Main logo"
          src="assets/main_logo.png"
          width="40"
          height="40" />
      </div>
      <div class="grow relative overflow-y-auto overflow-x-hidden px-3">
        <app-navigation
          #navigation
          [activeKey]="activeLinkId"
          class="navigation">
          @for (menuItem of menuItems; track menuItem) {
            <app-navigation-group>
              <app-navigation-group-toggle [for]="menuItem.id!">
                @if (menuItem.icon) {
                  <mat-icon facNavigationItemIcon class="font-icon">{{
                    menuItem.icon
                  }}</mat-icon>
                }
                {{ menuItem.name }}
                <mat-icon facNavigationGroupToggleIcon class="font-icon"
                  >arrow_drop_down</mat-icon
                >
              </app-navigation-group-toggle>
              <app-navigation-group-menu [key]="menuItem.id!">
                @for (childItem of menuItem.children; track childItem) {
                  <a
                    app-navigation-item
                    [routerLink]="childItem.link"
                    [key]="childItem.link">
                    {{ childItem.name }}
                  </a>
                }
              </app-navigation-group-menu>
            </app-navigation-group>
          }
        </app-navigation>
      </div>
      <div class="flex-none p-7">
        <app-sidebar-toolbar></app-sidebar-toolbar>
      </div>
    </div>
  `,
  styles: ``,
})
export class SidebarComponent implements OnInit {
  public router = inject(Router);
  public location = inject(Location);
  public height: string | null = '200px';

  @ViewChild('navigation', { static: true })
  public navigation!: string;

  public menuItems: MenuItem[] = [
    {
      id: 'bill',
      icon: 'paid',
      name: 'Bill',
      children: [
        {
          name: 'Bill List',
          link: '/home/bill/list',
        },
      ],
    },
    {
      id: 'admin',
      icon: 'admin_panel_settings',
      name: 'Admin Panel',
      children: [
        {
          name: 'Resources',
          link: '/home/admin/resources',
        },
        {
          name: 'Dashboards',
          link: '/home/admin/dashboard',
        },
        {
          name: 'Notifications',
          link: '/home/admin/notification-management',
        },
      ],
    },
    {
      id: 'travel-planner',
      icon: 'flight',
      name: 'Travel Planner',
      children: [
        {
          name: 'Planners',
          link: '/home/travel-planner/travels',
        },
      ],
    },
  ];

  navItemLinks: MenuItem[] = [];

  activeLinkId: string | null = '/';

  public ngOnInit() {
    this.menuItems.forEach(menuItem => {
      this.navItemLinks.push(menuItem);

      if (menuItem.children) {
        this.navItemLinks = this.navItemLinks.concat(
          menuItem.children as MenuItem[]
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
      menuItem => menuItem.link === this.location.path()
    );

    if (activeLink) {
      this.activeLinkId = activeLink.link!;
    } else {
      this.activeLinkId = null;
    }
  }
}
