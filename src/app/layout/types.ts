import { InjectionToken } from '@angular/core';

export const LAYOUT = new InjectionToken('LAYOUT');

export interface LayoutSidebarVisibilityChange {
  layoutId: string;
  hidden: boolean;
}

export interface MenuItem {
  name: string;
  icon?: string;
  id?: string | number;
  link?: string;
  requireAdmin: boolean;
  show: boolean;
  children?: MenuItem[];
}
