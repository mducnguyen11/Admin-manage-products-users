import { IProductDataPayload, IProductDetailData, IProductDetailDataField } from 'models/product';
import { formatTimeStampToISOSString } from 'utils/formatTime';

export const formatProductDataToPayload = (a: IProductDetailData): IProductDataPayload => {
  const xx: any = {
    memberships: a.memberships.map((a) => Number(a.membership_id)),
    categories: a.categories.map((a) => Number(a.category_id)),
    arrival_date: formatTimeStampToISOSString(a.arrival_date),
    shipping_to_zones: a.shipping.map((v) => {
      return {
        id: Number(v.id),
        price: v.price,
      };
    }),
    vendor_id: a.vendor_id,
    name: a.name,
  };
  xx.condition_id = a.condition_id;
  xx.brand_id = a.brand_id;
  xx.enabled = a.enabled;
  xx.description = a.description;
  xx.tax_exempt = Number(a.tax_exempt);
  xx.price = a.price;
  xx.sale_price_type = a.sale_price_type;
  xx.inventory_tracking = Number(a.inventory_tracking);
  xx.quantity = a.quantity;
  xx.sku = a.sku;
  xx.participate_sale = Number(a.participate_sale);
  xx.sale_price = a.sale_price;
  xx.og_tags = a.og_tags;
  xx.og_tags_type = a.og_tags_type;
  xx.meta_desc_type = a.meta_desc_type;
  xx.meta_description = a.meta_description;
  xx.meta_keywords = a.meta_keywords;
  xx.product_page_title = a.product_page_title;
  xx.facebook_marketing_enabled = Number(a.facebook_marketing_enabled);
  xx.google_feed_enabled = Number(a.google_feed_enabled);
  xx.imagesOrder =
    a.imagesOrder?.map((a) => {
      if (a.file) {
        return a.file.name;
      } else {
        return a.image;
      }
    }) || [];
  xx.id = a.id;
  xx.deleted_images = a.deleted_images || [];
  return xx;
};

export const validateProductData = (a: IProductDetailDataField, listFieldRequired: string[]) => {
  const error: { [key: string]: string } = {};
  const ll: any[] = [];
  [...Object.keys(a)].forEach((b) => {
    if (listFieldRequired.findIndex((x) => x == b) > -1) {
      return ll.push(b);
    }
  });

  ll.forEach((key) => {
    if (!a[key as keyof typeof a] || a[key as keyof typeof a] == '') {
      error[key as keyof typeof error] = 'requiredField';
    }
    if (key == 'shipping' && a.shipping) {
      if (a.shipping.length > 0) {
        a.shipping.forEach((b) => {
          if (b.price == '' || b.price == '0.0000' || b.price == '0.00') {
            error['shipping'] = 'requiredField';
          }
        });
      } else {
        error['shipping'] = 'requiredField';
      }
    }
    if (key == 'images') {
      if (a.images && a.images.length == 0) {
        if (a.imagesOrder && a.imagesOrder.length > 0) {
          delete error.images;
        } else {
          error.images = 'requiredField';
        }
      } else {
        delete error.images;
      }
    }
  });
  return {
    validate: Object.keys(error).length == 0,
    errors: error,
  };
};

export const validateProductDataToUpdate = (a: IProductDetailDataField) => {
  const listFieldRequired = ['name', 'images', 'quantity', 'brand', 'categories', 'price'];
  return validateProductData(a, listFieldRequired);
};

export const validateProductDataToCreate = (a: IProductDetailDataField) => {
  const listFieldRequired = ['vendor_id', 'name', 'brand_id', 'condition', 'categories', 'price', 'quantity', 'images'];
  return validateProductData(a, listFieldRequired);
};
