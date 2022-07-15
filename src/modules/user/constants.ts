export const USER_STATUS_OPTIONS = [
  {
    name: 'Any status',
    value: 'All',
  },
  {
    name: 'Enable',
    value: 'E',
  },
  {
    name: 'Disable',
    value: 'D',
  },
  {
    name: 'Unapproved vendor',
    value: 'U',
  },
];

export const USER_TYPES = [
  {
    value: 'indivvalueual',
    name: 'Indivvalueual',
  },
  {
    value: 'business',
    name: 'Business',
  },
];

export const USER_ACCESS_LEVEL_OPTIONS = [
  { value: '10', name: 'Vendor' },
  {
    value: '100',
    name: 'Administrator',
  },
];
export const USER_MEMBERSHIPS_CREATE_OPTIONS = [
  { value: '4', name: 'General' },
  { value: '', name: 'Ignore Membersghip' },
];

export const USER_FILTER_MEMBERSHIPS_OPTIONS = [
  {
    name: 'Memberships',
    options: [
      {
        value: 'M_4',
        name: 'General',
      },
    ],
  },
  {
    name: 'Spending Memberships',
    options: [
      {
        value: 'P_4',
        name: 'General',
      },
    ],
  },
];

export const USER_ACCOUNT_STATUS_OPTIONS = [
  { value: 'E', name: 'Enabled' },
  { value: 'D', name: 'Disabled' },
  { value: 'U', name: 'Unappoveed Vendor' },
];
