import './product-info.scss';
import { IProductDetailData, IProductDetailDataField } from 'models/admin/product';
import React, { useEffect, useState } from 'react';
import { formatTimeStampToDate, validateProductDataField } from 'modules/admin/ultis';
import BrandForm from './components/BrandForm/BrandForm';
import ConditionForm from './components/ConditionForm/ConditionForm';
import ImagesProductForm from './components/ImagesProductForm/ImagesProductForm';
import CategoryForm from './components/CategoryForm/CategoryForm';
import DescriptionForm from './components/DescriptionForm/DescriptionForm';
import Memberships from './components/Memberships/Memberships';
import TaxClass from './components/TaxClass/TaxClass';
import PriceForm from './components/Price/PriceForm';
import ArrivalDate from './components/ArrivalDate/ArrivalDate';
import Continental from './components/Continental/Continental';
import MetaTag from './components/MetaTag/MetaTag';
import MetaDescType from './components/MetaDescType/MetaDescType';
import InputSwitch from './components/inputSwitch/InputSwitch';
import Button from 'modules/admin/components/Button/Button';
import InputKey from './components/NormalInputRow/NormalInputRow';
import VendorForm from './components/VendorForm/VendorForm';

interface Props {
  product: IProductDetailData;
  actionName: string;
  onSave: (
    a: IProductDetailData,
    b: {
      image: string;
      file: any;
    }[],
  ) => void;
  listFieldRequired: string[];
}
interface ErrorData {
  vendor_id?: string;
  name?: string;
  brand_id?: string;
  condition?: string;
  images?: string;
  categories?: string;
  description?: string;
  price?: string;
  quantity?: string;
  shipping?: string;
}
const ProductDetailForm = (props: Props) => {
  const [productdetail, setProductdetail] = useState<IProductDetailData>(props.product);
  const [listImgUpload, setListImgUpload] = useState<
    {
      image: string;
      file: any;
    }[]
  >([]);

  const [errors, setErrors] = useState<ErrorData>({});
  const handleValidate = (a: IProductDetailDataField, listFieldRequired: string[]) => {
    const tt = validateProductDataField({ ...a }, listFieldRequired);
    if (!tt.validate) {
      setErrors({
        ...errors,
        ...tt.error,
      });
    } else {
      Object.keys(a).forEach((c) => {
        if (Object.keys(errors).findIndex((b) => b == c) > -1) {
          const xx = { ...errors };
          delete xx[c as keyof typeof xx];
          setErrors(xx);
        }
      });
    }
  };

  const handleChangeProduct = (a: IProductDetailDataField) => {
    console.log('change : ', a);
    handleValidate(a, props.listFieldRequired);
    setProductdetail({
      ...productdetail,
      ...a,
    });
  };
  const handleSaveProduct = async () => {
    const tt = validateProductDataField(productdetail, props.listFieldRequired);
    if (tt.validate) {
      await props.onSave(productdetail, [...listImgUpload]);
      setListImgUpload([]);
    } else {
      setErrors(tt.error);
    }
  };

  useEffect(() => {
    setProductdetail(props.product);
  }, [props.product]);

  const handleChangeImagesUpload = (
    a: {
      image: string;
      file: {
        name: string;
        [key: string]: any;
      };
    }[],
  ) => {
    handleValidate(
      { images: productdetail.images, imagesOrder: [...a.map((b): string => b.file.name)] },
      props.listFieldRequired,
    );
    setListImgUpload([...a]);
    setProductdetail({
      ...productdetail,
      imagesOrder: [...a.map((b): string => b.file.name)],
    });
  };
  return (
    <div className="product-detail">
      <div className="product-basic-detail">
        <VendorForm errorMessage={errors.vendor_id} value={productdetail.vendor_id} onChange={handleChangeProduct} />
        <InputKey
          errorMessage={errors.name}
          value={productdetail?.name}
          key_name="name"
          onChange={handleChangeProduct}
          text="Product Title"
        />
        <BrandForm errorMessage={errors.brand_id} value={productdetail?.brand_id} onChange={handleChangeProduct} />
        <ConditionForm value={productdetail?.inventory_tracking} onChange={handleChangeProduct} />
        <InputKey text="SKU" value={productdetail?.sku} onChange={handleChangeProduct} key_name="sku" />
        <ImagesProductForm
          deleted_images={productdetail?.deleted_images !== undefined ? productdetail.deleted_images : []}
          onChange={handleChangeProduct}
          errorMessage={errors.images}
          listImagesCurrent={productdetail?.images || []}
          listImgUpload={listImgUpload}
          changeImagesUpload={handleChangeImagesUpload}
        />
        <CategoryForm
          errorMessage={errors.categories}
          value={[
            ...(productdetail?.categories.map((a) => {
              return {
                id: a.category_id,
                name: a.name,
              };
            }) || []),
          ]}
          onChange={handleChangeProduct}
        />
        <DescriptionForm
          errorMessage={errors.description}
          onChange={handleChangeProduct}
          value={productdetail?.description}
        />
        <InputSwitch
          key_name="enabled"
          onChange={handleChangeProduct}
          text="Available for sale"
          value={productdetail?.enabled}
          helperIcon={true}
        />
      </div>
      <div className="product-price-inventory">
        <h2 className="section-title">Price and Inventory</h2>
        <Memberships value={productdetail?.memberships} onChange={handleChangeProduct} />
        <TaxClass onChange={handleChangeProduct} value={productdetail?.tax_exempt} />
        <PriceForm
          errorMessage={errors.price}
          price={productdetail?.price}
          onChange={handleChangeProduct}
          sale_price={productdetail?.sale_price}
          sale_price_type={productdetail?.sale_price_type}
        />
        <ArrivalDate value={formatTimeStampToDate(productdetail?.arrival_date)} onChange={handleChangeProduct} />
        <InputKey
          key_name="quantity"
          text="Quantity in stock"
          errorMessage={errors.quantity}
          onChange={handleChangeProduct}
          value={productdetail?.quantity}
        />
      </div>
      <div className="product-shipping">
        <h2 className="section-title">Shipping</h2>
        <Continental
          errorMessage={errors.shipping}
          continentalList={
            productdetail?.shipping.length > 0
              ? productdetail?.shipping
              : [{ id: '1', zone_name: 'Continental U.S.', price: '0.0000' }] || []
          }
          onChange={handleChangeProduct}
        />
      </div>
      <div className="product-maketing">
        <h2 className="section-title">Maketing</h2>
        <MetaTag og_tags={productdetail.og_tags} value={productdetail?.og_tags_type} onChange={handleChangeProduct} />
        <MetaDescType
          meta_description={productdetail.meta_description}
          value={productdetail?.meta_desc_type}
          onChange={handleChangeProduct}
        />
        <InputKey
          key_name="meta_keywords"
          text="Meta keywords"
          value={productdetail?.meta_keywords}
          onChange={handleChangeProduct}
        />
        <InputKey
          key_name="product_page_title"
          text="Product page title  "
          value={productdetail?.product_page_title}
          onChange={handleChangeProduct}
        />
      </div>
      <InputSwitch
        key_name="facebook_marketing_enabled"
        onChange={handleChangeProduct}
        text="Add to Facebook product feed"
        value={productdetail?.facebook_marketing_enabled}
      />
      <InputSwitch
        key_name="google_feed_enabled"
        onChange={handleChangeProduct}
        text="Add to Google product feed"
        value={productdetail?.google_feed_enabled}
      />
      <div className="product-detail-btn">
        <Button disabled={Object.keys(errors).length > 0} color="yellow" onClick={handleSaveProduct}>
          {props.actionName}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailForm;
