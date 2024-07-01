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
  template: `
    <div
      class="h-full flex flex-col w-[300px] rounded-e-xl dark:bg-neutral-900 bg-neutral-100 overflow-y-auto overflow-x-hidden">
      <div class="flex-none flex items-center h-16">
        <a routerLink="/" class="font-bold text-sm md:text-lg px-5 logo"
          >Family Control</a
        >
      </div>
      <div class="grow relative overflow-y-auto overflow-x-hidden px-3">
        <fac-navigation
          #navigation
          [activeKey]="activeLinkId"
          class="navigation">
          @for (navItem of navItems; track navItem) {
            @switch (navItem.type) {
              @case ('heading') {
                <fac-navigation-heading>{{
                  navItem.name
                }}</fac-navigation-heading>
              }
              @case ('group') {
                <fac-navigation-group>
                  <fac-navigation-group-toggle [for]="navItem.id">
                    @if (navItem.icon) {
                      <mat-icon facNavigationItemIcon class="font-icon">{{
                        navItem.icon
                      }}</mat-icon>
                    }
                    {{ navItem.name }}
                    <mat-icon facNavigationGroupToggleIcon class="font-icon"
                      >arrow_drop_down</mat-icon
                    >
                  </fac-navigation-group-toggle>
                  <fac-navigation-group-menu [key]="navItem.id">
                    @for (
                      childItem of navItem.children | orderBy: 'name';
                      track childItem
                    ) {
                      <a
                        fac-navigation-item
                        [routerLink]="childItem.link"
                        [key]="childItem.link">
                        {{ childItem.name }}
                      </a>
                    }
                  </fac-navigation-group-menu>
                </fac-navigation-group>
              }
              @default {
                <a
                  fac-navigation-item
                  [routerLink]="navItem.link"
                  [key]="navItem.link">
                  @if (navItem.icon) {
                    <mat-icon facNavigationItemIcon class="font-icon">{{
                      navItem.icon
                    }}</mat-icon>
                  }
                  {{ navItem.name }}
                </a>
              }
            }
          }
        </fac-navigation>
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

  public ngOnInit() {
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
