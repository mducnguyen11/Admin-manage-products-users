export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? '/api' : '/api';
export const APIAdmin = development ? '/apiAdmin' : '/apiAdmin';
export const APIVendor = development ? '/apiVendor' : '/apiVendor';
export const BASE_API = 'https://api.gearfocus.div4.pgtest.co';
export const ACCESS_TOKEN_KEY = 'token';
