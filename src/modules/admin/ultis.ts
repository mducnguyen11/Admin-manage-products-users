import { IProductDataPayload, IProductDetailData, IProductDetailDataField } from 'models/admin/product';
import { IUserDataField, IUserDataPayloadCreate } from 'models/admin/user';
import { IUserDetailData, IUserDataPayloadUpdate } from 'models/admin/user';
export const formatProductDataToPayload = (a: IProductDetailData): IProductDataPayload => {
  const xx: any = {
    memberships: a.memberships.map((a) => Number(a.membership_id)),
    categories: a.categories.map((a) => Number(a.category_id)),
    arrival_date: FormatTimeStampToDateString(a.arrival_date),
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
  xx.imagesOrder = a.imagesOrder || [];
  xx.id = a.id;
  xx.deleted_images = a.deleted_images || [];
  return xx;
};

export const formatTimeStampToDate = (a: string | number) => {
  if (a == '0') {
    return '- - -';
  } else {
    const dt = new Date(Number(a) * 1000);
    return dt.toDateString();
  }
};

export const validateProductDataField = (a: IProductDetailDataField, listFieldRequired: string[]) => {
  const error: { [key: string]: string } = {};
  console.log('a :', [...Object.keys(a)]);
  const ll: any[] = [];
  [...Object.keys(a)].forEach((b) => {
    console.log('b :', b);
    if (listFieldRequired.findIndex((x) => x == b) > -1) {
      return ll.push(b);
    }
  });
  console.log('ll', ll);
  ll.forEach((key) => {
    if (!a[key as keyof typeof a]) {
      error[key as keyof typeof error] = 'requiredField';
    }
    if (key == 'shipping' && a.shipping) {
      if (a.shipping.length > 0) {
        if (a['shipping'][0].price == '') {
          error['shipping'] = 'requiredField';
        }
      }
    }
    console.log('cureent error : ', error);
    if (key == 'images') {
      console.log('images :', a);
      if (a.images && a.images.length == 0) {
        if (a.imagesOrder && a.imagesOrder.length > 0) {
          console.log('deltete');
          delete error.images;
        } else {
          console.log('no 1 deltete');
          error.images = 'requiredField';
        }
      } else {
        console.log('no 2 deltete');
        delete error.images;
      }
    }
  });

  return {
    validate: Object.keys(error).length == 0,
    error: error,
  };
};

export const FormatTimeStampToDateString = (g: string): string => {
  if (g == '0') {
    return '--';
  } else {
    const a = new Date(Number(g) * 1000);
    const tt = a?.toLocaleDateString().split('/');
    let y = '';
    tt?.reverse().forEach((a, i) => {
      if (a.length == 1) {
        if (i == 0) {
          y += '0' + a;
        } else {
          y += '-0' + a;
        }
      } else {
        if (i == 0) {
          y += +a;
        } else {
          y += '-' + a;
        }
      }
    });
    return y;
  }
};
export const FormateDateToTimeStamp = (a: Date): string => {
  return (a.getTime() / 1000).toString();
};
export const formatToUserPayloadCreate = (a: IUserDetailData): IUserDataPayloadCreate => {
  const xx = {
    access_level: a.access_level,
    confirm_password: a.confirm_password || '',
    email: a.email,
    firstName: a.firstName,
    forceChangePassword: Number(a.forceChangePassword),
    lastName: a.lastName,
    membership_id: a.membership_id || '',
    password: a.password || '',
    paymentRailsType: a.paymentRailsType,
    taxExempt: Number(a.taxExempt),
  };

  return xx;
};
export const FormatDateToDateString = (a: Date): string => {
  const tt = a?.toLocaleDateString().split('/');
  console.log(tt);
  let y = '';
  tt?.reverse().forEach((a, i) => {
    if (a.length == 1) {
      if (i == 0) {
        y += '0' + a;
      } else {
        y += '-0' + a;
      }
    } else {
      if (i == 0) {
        y += +a;
      } else {
        y += '-' + a;
      }
    }
  });
  return y;
};

export const formartUserToPayload = (a: IUserDetailData): IUserDataPayloadUpdate => {
  const setPassword = (password: string | undefined): string => {
    if (password) {
      return password;
    } else {
      return '';
    }
  };
  const xx = {
    ...a,
    forceChangePassword: Number(a.forceChangePassword),
    roles: [
      ...a.roles.map((b) => {
        return Number(b);
      }),
    ],
    taxExempt: Number(a.taxExempt),
    id: a.profile_id,
    confirm_password: setPassword(a.confirm_password),
    password: setPassword(a.password),
    membership_id: a.membership_id || '',
  };
  return xx;
};

export const validateUserData = (x: IUserDetailData, a: IUserDataField, listFieldRequired: string[]) => {
  const tt: { [key: string]: string } = {};
  [...Object.keys(a)].forEach((b) => {
    if (listFieldRequired.findIndex((t) => t == b) >= 0) {
      if (b == 'confirm_password') {
        if (a[b as keyof typeof a] !== x.password) {
          tt[b] = 'confirmPasswordNotMatch';
        }
      }
      if (!a[b as keyof typeof a]) {
        tt[b] = 'requiredField';
      }
    }
  });
  return {
    validate: Object.keys(tt).length == 0,
    errors: tt,
  };
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
