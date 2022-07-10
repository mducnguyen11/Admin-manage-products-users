export const defaultFilterProductValue = {
  page: 1,
  count: 25,
  search: '',
  category: '0',
  stock_status: 'all',
  availability: 'all',
  vendor: '',
  sort: 'name',
  order_by: 'ASC',
  search_type: '',
};
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
