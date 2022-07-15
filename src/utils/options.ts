export const AVAILABILITY_STATUS = [
  {
    id: 'all',
    name: 'Any Availability',
  },
  {
    id: '1',
    name: 'Only Enabled',
  },
  {
    id: '0',
    name: 'Only disabled',
  },
];

export const STOCK_STATUS = [
  {
    id: 'all',
    name: 'Any stock status',
  },
  {
    id: 'in',
    name: 'In stock',
  },
  {
    id: 'low',
    name: 'Low stock',
  },
  {
    id: 'out',
    name: 'SOLD',
  },
];

export const MEMBERSHIPS_OPTIONS = [
  {
    name: 'Memberships',
    options: [
      {
        id: 'M_4',
        name: 'General',
      },
    ],
  },
  {
    name: 'Spending Memberships',
    options: [
      {
        id: 'P_4',
        name: 'General',
      },
    ],
  },
];

export const USER_STATUS_OPTIONS = [
  {
    name: 'Any status',
    id: 'All',
  },
  {
    name: 'Enable',
    id: 'E',
  },
  {
    name: 'Disable',
    id: 'D',
  },
  {
    name: 'Unapproved vendor',
    id: 'U',
  },
];

export const USER_TYPES = [
  {
    id: 'individual',
    name: 'Individual',
  },
  {
    id: 'business',
    name: 'Business',
  },
];

export const ACCESS_LEVEL_OPTIONS = [
  { id: '10', name: 'Vendor' },
  {
    id: '100',
    name: 'Administrator',
  },
];
export const USER_MEMBERSHIPS_OPTIONS = [
  { id: '4', name: 'General' },
  { id: '', name: 'Ignore Membersghip' },
];

export const USER_ACCOUNT_STATUS_OPTIONS = [
  { id: 'E', name: 'Enabled' },
  { id: 'D', name: 'Disabled' },
  { id: 'U', name: 'Unappoveed Vendor' },
];
