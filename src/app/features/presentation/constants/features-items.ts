import { FeatureCard } from '../models/feature-item';

export const featureItems: FeatureCard[] = [
  {
    title: 'Personal data',
    content:
      'To receive our emails and communications, make sure you keep your registration up to date.',
    icon: 'group',
    borderColor: 'border-l-[#80dfff]',
    disabled: false,
    route: '/home/user-profile/personal-data',
  },
  {
    title: 'Bills Control',
    content:
      'Centralize and organize family bills and ensure that no payment is forgotten.',
    icon: 'paid',
    borderColor: 'border-l-[#b3ffb3]',
    disabled: false,
    route: '/home/bill/list',
  },
  {
    title: 'Todo Control',
    content:
      'Centralize and organize your daily tasks, keeping everything organized.',
    icon: 'task',
    borderColor: 'border-l-[#ff9999]',
    disabled: true,
    route: '',
  },
];
