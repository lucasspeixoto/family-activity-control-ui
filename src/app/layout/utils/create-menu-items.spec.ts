import { MenuItem } from '../types';
import { checkMenuItemsAdminRoutes } from '../utils/create-menu-items';

const createMenuItems = (menuItems: MenuItem[], isUserAdmin: boolean) => {
  return checkMenuItemsAdminRoutes(menuItems, isUserAdmin);
};

describe('checkMenuItemsAdminRoutes', () => {
  it('should return an empty array when no menuitems are provided', () => {
    const menuItems: MenuItem[] = [];
    const isUserAdmin: boolean = false;
    const expectedResult: MenuItem[] = [];

    const result = checkMenuItemsAdminRoutes(menuItems, isUserAdmin);

    expect(result).toEqual(expectedResult);
  });

  it('should correctly show/hide menuitems based on isuseradmin', () => {
    // Given
    const menuItems: MenuItem[] = [
      { id: 1, name: 'Home', show: true, requireAdmin: false, children: [] },
      { id: 2, name: 'Admin', show: true, requireAdmin: true, children: [] },
      {
        id: 3,
        name: 'Profile',
        show: true,
        requireAdmin: false,
        children: [],
      },
    ];
    const isUserAdmin = false;

    // When
    const result = createMenuItems(menuItems, isUserAdmin);

    // Then
    expect(result[1].show).toBe(false);
    expect(result[2].show).toBe(true);
  });

  it('should correctly handle nested menuitems with children', () => {
    // Given
    const menuItems: MenuItem[] = [
      { id: 1, name: 'Home', show: true, requireAdmin: false, children: [] },
      {
        id: 2,
        name: 'Admin',
        show: true,
        requireAdmin: true,
        children: [
          {
            id: 3,
            name: 'Profile',
            show: true,
            requireAdmin: false,
            children: [],
          },
          {
            id: 4,
            name: 'Settings',
            show: true,
            requireAdmin: true,
            children: [],
          },
        ],
      },
    ];
    const isUserAdmin = false;

    // When
    const result = checkMenuItemsAdminRoutes(menuItems, isUserAdmin);

    // Then
    expect(result[1]?.show).toBe(false);
  });

  it('should correctly handle nested menuitems with empty children array', () => {
    // Given
    const menuItems: MenuItem[] = [
      { id: 1, name: 'Home', show: true, requireAdmin: false, children: [] },
      { id: 2, name: 'Admin', show: true, requireAdmin: true, children: [] },
      { id: 3, name: 'Profile', show: true, requireAdmin: false, children: [] },
      { id: 4, name: 'Settings', show: true, requireAdmin: true, children: [] },
    ];
    const isUserAdmin = false;

    // When
    const result = checkMenuItemsAdminRoutes(menuItems, isUserAdmin);

    // Then
    expect(result[1]?.show).toBe(false);
  });

  it('should correctly handle nested menuitems with undefined children array', () => {
    // Given
    const menuItems: MenuItem[] = [
      {
        id: 1,
        name: 'Home',
        show: true,
        requireAdmin: false,
      },
      {
        id: 2,
        name: 'Admin',
        show: true,
        requireAdmin: true,
      },
      {
        id: 3,
        name: 'Profile',
        show: true,
        requireAdmin: false,
      },
      {
        id: 4,
        name: 'Settings',
        show: true,
        requireAdmin: true,
      },
    ];
    const isUserAdmin = false;

    // When
    const result = checkMenuItemsAdminRoutes(menuItems, isUserAdmin);

    // Then
    expect(result[1]?.show).toBe(false);
    expect(result[3]?.show).toBe(false);
  });

  it('should correctly handle nested menuitems with undefined children property', () => {
    // Given
    const menuItems: MenuItem[] = [
      {
        id: 1,
        name: 'Home',
        show: true,
        requireAdmin: false,
      },
      {
        id: 2,
        name: 'Admin',
        show: true,
        requireAdmin: true,
      },
      {
        id: 3,
        name: 'Profile',
        show: true,
        requireAdmin: false,
      },
      {
        id: 4,
        name: 'Settings',
        show: true,
        requireAdmin: true,
      },
    ];
    const isUserAdmin = false;

    // When
    const result = checkMenuItemsAdminRoutes(menuItems, isUserAdmin);

    // Then
    expect(result[1]?.show).toBe(false);
    expect(result[3]?.show).toBe(false);
  });

  it('should correctly handle nested menuitems with undefined requireAdmin property', () => {
    // Given
    const menuItems: MenuItem[] = [
      { id: 1, name: 'Home', show: true, requireAdmin: false, children: [] },
      {
        id: 2,
        name: 'Admin',
        show: true,
        requireAdmin: false,
        children: [],
      },
      { id: 3, name: 'Profile', show: true, requireAdmin: false, children: [] },
      { id: 4, name: 'Settings', show: true, requireAdmin: true, children: [] },
    ];
    const isUserAdmin = false;

    // When
    const result = checkMenuItemsAdminRoutes(menuItems, isUserAdmin);

    // Then
    expect(result[1].show).toBe(true);
  });

  it('should correctly handle nested menuitems with empty parent menuitem', () => {
    // Given
    const menuItems: MenuItem[] = [
      { id: 1, name: 'Home', show: true, requireAdmin: false, children: [] },
      { id: 2, name: 'Admin', show: true, requireAdmin: true, children: [] },
      { id: 3, name: 'Profile', show: true, requireAdmin: false, children: [] },
      { id: 4, name: 'Settings', show: true, requireAdmin: true, children: [] },
    ];
    const isUserAdmin = false;

    // When
    const result = checkMenuItemsAdminRoutes(menuItems, isUserAdmin);

    // Then
    expect(result[1].show).toBe(false);
    expect(result[3].show).toBe(false);
  });
});
