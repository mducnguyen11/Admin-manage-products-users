export interface ICategoryItem {
  id: string;
  name: string;
  parentId: string;
  path: string;
  pos: string;
}

export interface IFilterProduct {
  page: number;
  count: number;
  search: string;
  category: string;
  stock_status: string;
  availability: string;
  vendor: string;
  sort: string;
  order_by: string;
  search_type: string;
}

export interface IProductTableItem {
  amount: string;
  arrivalDate: string;
  category: string;
  condition: string;
  created: string;
  description: string;
  enabled: string;
  id: string;
  name: string;
  participateSale: string;
  price: string;
  sku: string;
  vendor: string;
  vendorID: string;
  weight: string;
}

export interface IProductDetailData {
  arrival_date: string;
  brand_id: string;
  categories: { category_id: string; name: string }[];
  cleanURL: string;
  code: string;
  condition_id: string;
  description: string;
  enabled: string;
  facebook_marketing_enabled: string;
  google_feed_enabled: string;
  id: string;
  images: { id: string; file: string; thumbs: string[] }[];
  inventory_tracking: string;
  memberships: { membership_id: string }[];
  meta_desc_type: string;
  meta_description: string;
  meta_keywords: string;
  name: string;
  og_tags: string;
  og_tags_type: string;
  participate_sale: string;
  price: string;
  product_page_title: string;
  quantity: string;
  sale_price: string;
  sale_price_type: string;
  shipping: { id: string; price: string; zone_name: string }[];
  sku: string;
  sort_description: string;
  tax_exempt: string;
  vendor_id: string;
  weight: string;
  deleted_images?: number[];
  imagesOrder?: string[];
  [key: string]: any;
}

export interface IProductDetailDataField {
  arrival_date?: string;
  brand_id?: string;
  categories?: { category_id: string; name: string }[];
  cleanURL?: string;
  code?: string;
  condition_id?: string;
  description?: string;
  enabled?: string;
  facebook_marketing_enabled?: string;
  google_feed_enabled?: string;
  id?: string;
  images?: { id: string; file: string; thumbs: string[] }[];
  inventory_tracking?: string;
  memberships?: { membership_id: string }[];
  meta_desc_type?: string;
  meta_description?: string;
  meta_keywords?: string;
  name?: string;
  og_tags?: string;
  og_tags_type?: string;
  participate_sale?: string;
  price?: string;
  product_page_title?: string;
  quantity?: string;
  sale_price?: string;
  sale_price_type?: string;
  shipping?: { id: string; price: string; zone_name: string }[];
  sku?: string;
  sort_description?: string;
  tax_exempt?: string;
  vendor_id?: string;
  weight?: string;
  deleted_images?: number[];
  imagesOrder?: string[];
}

export interface IProductDataPayload {
  vendor_id: string | number;
  name: string;
  condition_id: string;
  brand_id: string;
  memberships: number[];
  enabled: string;
  description: string;
  categories: number[];
  shipping_to_zones: { id: number; price: string }[];
  tax_exempt: number;
  price: string;
  sale_price_type: string;
  arrival_date: string;
  inventory_tracking: number;
  quantity: string;
  sku: string;
  participate_sale: number;
  sale_price: string;
  og_tags_type: string;
  og_tags: string;
  enableOffers?: string;
  minimum_offer_price?: string;
  meta_desc_type: string;
  meta_description: string;
  meta_keywords: string;
  product_page_title: string;
  facebook_marketing_enabled: number;
  google_feed_enabled: number;
  id: string;
  deleted_images: number[];
  imagesOrder?: string[];
}

export const defaultProductValue = {
  arrival_date: '',
  brand_id: '',
  categories: [],
  cleanURL: '',
  code: '',
  condition_id: '',
  description: '',
  enabled: '',
  facebook_marketing_enabled: '',
  google_feed_enabled: '',
  id: '',
  images: [],
  inventory_tracking: '',
  memberships: [],
  meta_desc_type: 'A',
  meta_description: '',
  meta_keywords: '',
  name: '',
  og_tags: '',
  og_tags_type: '0',
  participate_sale: '',
  price: '',
  product_page_title: '',
  quantity: '',
  sale_price: '',
  sale_price_type: '',
  shipping: [],
  sku: '',
  sort_description: '',
  tax_exempt: '',
  vendor_id: '',
  weight: '',
};
