import { MenuItem } from '../types';

export const checkMenuItemsAdminRoutes = (
  menuItems: MenuItem[],
  isUserAdmin: boolean
): MenuItem[] => {
  return menuItems?.map(menuItem => {
    const updatedMenuItem = {
      ...menuItem,
      show: menuItem.requireAdmin ? isUserAdmin : true,
      children: menuItem?.children
        ? checkMenuItemsAdminRoutes(menuItem.children, isUserAdmin)
        : undefined,
    };

    return updatedMenuItem;
  });
};
