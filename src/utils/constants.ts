export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? '/api' : 'https://google.com';
export const APIAdmin = development ? '/apiAdmin' : 'https://google.com';
export const APIVendor = development ? '/apiVendor' : 'https://google.com';
export const BASE_API = 'https://api.gearfocus.div4.pgtest.co';
export const ACCESS_TOKEN_KEY = 'token';
