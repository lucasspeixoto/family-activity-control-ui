import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: 'bill',
    icon: 'paid',
    name: 'Bill',
    requireAdmin: false,
    show: false,
    children: [
      {
        name: 'Bill List',
        link: '/home/bill/list',
        requireAdmin: false,
        show: false,
      },
    ],
  },
  {
    id: 'admin',
    icon: 'admin_panel_settings',
    name: 'Admin Panel',
    requireAdmin: true,
    show: false,
    children: [
      {
        name: 'Resources',
        link: '/home/admin/resources',
        requireAdmin: true,
        show: false,
      },
      {
        name: 'Dashboards',
        link: '/home/admin/dashboard',
        requireAdmin: true,
        show: false,
      },
      {
        name: 'Notifications',
        link: '/home/admin/notification-management',
        requireAdmin: true,
        show: false,
      },
    ],
  },
  {
    id: 'user-profile',
    icon: 'group',
    name: 'User Profile',
    requireAdmin: false,
    show: false,
    children: [
      {
        name: 'Personal Data',
        link: '/home/user-profile/personal-data',
        requireAdmin: false,
        show: false,
      },
    ],
  },
];
